import * as api from 'api.js'

export async function get(req, res) {
	const response = await api.get('auth/me', req.session.user && req.session.user.token)
    
	if (response.user) req.session.user = response.user

	res.setHeader('Content-Type', 'application/json')

	res.end(JSON.stringify(response))
}