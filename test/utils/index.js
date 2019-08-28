const tape = require('tape')
const fetch = require('node-fetch')

exports.test = tape
exports.fetch = fetch

exports.listen = function (app, host) {
	const { port } = app.server.address()
	return `http://${host || 'localhost'}:${port}`
}