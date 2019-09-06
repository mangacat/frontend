import sirv from 'sirv'
import redis from 'redis'
import polka from 'polka'
import helmet from 'helmet'
import cluster from 'cluster'
import bodyParser from 'body-parser'
import session from 'express-session'
import * as Sentry from '@sentry/node'
import * as sapper from '@sapper/server'

const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
	for (let i = 0; i < numCPUs; i++) cluster.fork()

	cluster.on('exit', () => {
		for (const id in cluster.workers) cluster.workers[id].kill()

		process.exit(0)
	})
} else {
	const { PORT, NODE_ENV, SENTRY_DSN, REDIS_HOST, REDIS_PORT, REDIS_PASS, SESSION_SECRET } = process.env
	const dev = NODE_ENV === 'development'
	const app = polka()
	
	if (SENTRY_DSN) Sentry.init({ dsn: SENTRY_DSN })
	
	app.use(helmet())
	
	if (!dev) app.use(bodyParser.json())
	
	if (REDIS_HOST) {
		const RedisStore = require('connect-redis')(session)
		const client = redis.createClient({
			host: REDIS_HOST,
			port: REDIS_PORT,
			password: REDIS_PASS
		})
	
		app.use(session({
			store: new RedisStore({ client }),
			secret: SESSION_SECRET,
			cookie: {
				maxAge: 86400000
			},
			resave: false,
			saveUninitialized: false
		}))
	}
	
	app.use(sirv('static', { dev, etag: true, maxAge: 31536000, immutable: true }))
	app.use(sapper.middleware({
		session: req => ({
			user: req.session && req.session.user
		})
	}))
	
	app.listen(PORT, err => err && !dev && console.log('error', err))
}