import * as api from 'api.js'

export function get(req, res) {
	const { token } = req.query

	api.get(`auth/verify?token=${token}`).then(() => {
		res.writeHead(301, { Location: '/' })
		res.end()
	})
}