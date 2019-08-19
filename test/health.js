const { test, listen, fetch } = require('./utils')
const { app } = require('../__sapper__/build/server/server.js')

test('site::health', async t => {
	t.plan(2)
	
	const uri = listen(app)
	const r = await fetch(uri + '/health')
	t.is(r.status, 200, 'received 200 status')
	t.is(await r.text(), 'OK', `received "OK" response`)

	app.server.close()
	t.end()
})