import * as api from 'api.js'

export async function post(req, res) {
	const user = req.body

	const response = await api.post('auth/login', user)

	if (response.user) req.session.user = response.user

	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify(response))
}