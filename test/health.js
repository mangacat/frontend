const axios = require('axios')
const { test, listen } = require('./utils')
const { app } = require('../__sapper__/build/server/server.js')

test('site::health', async t => {
	t.plan(2)
	
	const uri = listen(app)
	const r = await axios.get(uri + '/health')
	t.is(r.status, 200, 'received 200 status')
	t.is(r.data, 'OK', `received "OK" response`)

	app.server.close()
	t.end()
})