import './css/tailwind.pcss'
import * as sapper from '@sapper/app'
import * as Sentry from '@sentry/browser'
import { locale, dictionary, getClientLocale } from 'svelte-i18n/dist/i18n.mjs'

const dev = process.env.NODE_ENV === 'development'
if (!dev && process.env.SENTRY_DSN) Sentry.init({ dsn: process.env.SENTRY_DSN })

const langs = ['en-US']

let lang = getClientLocale({
	fallback: 'en-US',
	navigator: true
})
if (!langs.includes(lang)) lang = langs.includes(lang.split('-')[0]) ? lang.split('-')[0] : 'en-US'

fetch(`/i18n/${lang}.json`)
	.then(res => res.json())
	.then(res => {
		const dict = {}
		dict[lang] = res
		dictionary.set(dict)
		locale.set(lang)
		sapper.start({
			target: document.querySelector('#app')
		})
	})