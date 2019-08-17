const axios = require('axios')
const { test, uri } = require('./utils')

test('site::health', async t => {
	t.plan(2)
    
	const r = await axios.get(uri + '/health')
	t.is(r.status, 200, 'received 200 status')
	t.is(r.data, 'OK', `received "OK" response`)
    
	t.end()
})