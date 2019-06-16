export function post(req, res) {
	delete req.session.user
	
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({ ok: true }))
}