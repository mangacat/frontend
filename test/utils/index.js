const tape = require('tape')

exports.test = tape

exports.listen = function (app, host) {
	const { port } = app.server.address()
	return `http://${host || 'localhost'}:${port}`
}