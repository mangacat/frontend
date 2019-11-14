import { timestamp, files, shell } from '@sapper/service-worker'

const ASSETS = `cache${timestamp}`

// `shell` is an array of all the files generated by the bundler,
// `files` is an array of everything in the `static` directory
const to_cache = shell.concat(files).map(relative_url => new URL(relative_url, self.location).toString())
const cached = new Set(to_cache)

self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(ASSETS)
			.then(cache => cache.addAll(to_cache))
			.then(() => {
				self.skipWaiting()
			})
	)
})

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(async keys => {
			// delete old caches
			for (const key of keys) {
				if (key !== ASSETS) await caches.delete(key)
			}

			self.clients.claim()
		})
	)
})

self.addEventListener('fetch', event => {
	if (event.request.method !== 'GET' || event.request.headers.has('range')) return

	const url = new URL(event.request.url)

	// don't try to handle e.g. data: URIs
	if (!url.protocol.startsWith('http')) return

	// don't try to handle api calls
	if (url.hostname.startsWith('api')) return

	// ignore dev server requests
	if (url.hostname === self.location.hostname && url.port !== self.location.port) return

	// always serve static files and bundler-generated assets from cache
	if (cached.has(event.request.url)) {
		event.respondWith(caches.match(event.request))
		return
	}

	if (event.request.cache === 'only-if-cached') return

	// for everything else, try the network first, falling back to
	// cache if the user is offline. (If the pages never change, you
	// might prefer a cache-first approach to a network-first one.)

	const cachePromise = caches
		.open(`offline${timestamp}`)
		.then(async cache => {
			try {
				const response = await fetch(event.request)
				cache.put(event.request, response.clone())
				return response
			} catch (error) {
				const response = await cache.match(event.request)
				if (response) return response

				throw error
			}
		})

	event.respondWith(cachePromise)
})