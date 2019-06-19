import * as sapper from '@sapper/app'
import * as Sentry from '@sentry/browser'
import './css/tailwind.pcss'

const dev = process.env.NODE_ENV === 'development'
if (!dev && process.env.SENTRY_DSN) Sentry.init({ dsn: process.env.SENTRY_DSN })

sapper.start({
	target: document.querySelector('#app')
})