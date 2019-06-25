<svelte:head>
    <title>{webpub['metadata']['title']} ({webpub['metadata']['belongsTo']['series'][0]['name']}) - MangaCat</title>

    <meta property="og:image" content="{webpub['metadata']['image']}">
    <meta property="og:description" content="{webpub['metadata']['description']}">

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" crossorigin="anonymous">
	<link rel="stylesheet" href="https://unpkg.com/xbreader@0.29.1/dist/xbstyles.css" crossorigin="anonymous">
</svelte:head>

<div bind:this={xbreader}>
    <noscript class="br__notifier">
        To use this reader, please enable JavaScript!
    </noscript>
    <div class="br-loader__container">
        <div id="br-loader__spinner" class="spinner" />
        <span id="br-loader__message">
            Loading assets...
        </span>
    </div>
</div>

<script context="module">
	import * as api from 'api.js'

	export async function preload({ params }, { user }) {
		const res = await api.get(`series_chapters/${parseInt(params.id.toString().split('-')[0], '36')}`, user && user.token)
		
		if (typeof res === 'string') this.error(404)
		
		return { webpub: res }
	}
</script>

<script>
	import { onMount } from 'svelte'

	export let webpub
	let xbreader

	onMount(() => {
		const html = document.documentElement.className
		document.documentElement.className = ''

		const e = document.createElement('script')
		e.src = 'https://unpkg.com/xbreader@0.29.1/dist/xbreader-en.js'
		document.head.appendChild(e)

		let destructor

		const xbconfig = {
			cdn: 'photon',
			prefix: '/read',
			brand: {
				name: 'MangaCat',
				logo: '/img/icon.svg'
			},
			mount: xbreader,
			loader: async () => {
				webpub.readingOrder.push({
					href: window.location.origin + '/comments.html',
					type: 'text/html',
					properties: {
						orientation: 'landscape',
						page: 'center',
						spread: 'both',
						layout: 'fixed'
					},
					title: 'Last page',
					xbr: {
						final: true
					}
				})

				return webpub
			},
			onMount: reader => {
				destructor = () => reader.destroy()
			},
			onBeforeReady: reader => {
				const query = window.location.hash.split('/')
				if (query.length < 2 || query[0] !== '#') return
				if (query[1] == 'comments') reader.slider.goTo(99999)
				else reader.slider.goTo(parseInt(query[1]) - 1)
			},
			onPageChange: num => {
				const path = window.location.pathname.split('/')
				if (path[path.length - 1] == '') path.pop()
				window.history.replaceState(null, '', `${path.join('/')}/#/${num}`)
			}
		}

		e.onload = () => { window.xbreader(xbconfig) }

		return () => {
			if (destructor) destructor()
			document.documentElement.className = html
			document.head.removeChild(e)
		}
	})
</script>