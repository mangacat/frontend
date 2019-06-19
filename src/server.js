import sirv from 'sirv'
import polka from 'polka'
import * as Sentry from '@sentry/node'
import * as sapper from '@sapper/server'
import shrinkRayCurrent from 'shrink-ray-current'
import session from 'express-session'
import bodyParser from 'body-parser'

let store = undefined

const { PORT, NODE_ENV, SENTRY_DSN, REDIS_HOST, REDIS_PORT, REDIS_PASS } = process.env
const dev = NODE_ENV === 'development'

if (!dev && SENTRY_DSN) Sentry.init({ dsn: SENTRY_DSN })
if (!dev && REDIS_HOST) {
	const RedisStore = require('connect-redis')(session)
	store = new RedisStore({
		host: REDIS_HOST,
		port: REDIS_PORT,
		pass: REDIS_PASS
	})
}

polka()
	.use(bodyParser.json())
	.use(session({
		store,
		secret: 'urwaifuisntreal',
		cookie: {
			maxAge: 31536000
		},
		resave: false,
		saveUninitialized: true
	}))
	.use(
		shrinkRayCurrent(),
		sirv('static', { dev, etag: true, maxAge: 31536000, immutable: true }),
		sapper.middleware({
			session: req => ({
				user: req.session && req.session.user && Math.round(new Date().getTime() / 1000) - req.session.user.expiry < 0 && req.session.user
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err) // eslint-disable-line no-console
	})