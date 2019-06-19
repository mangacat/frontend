export function get(req, res) {
	if (Math.round(new Date().getTime() / 1000) - req.session.user.expiry < 0) {
		delete req.session.user
	}

	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({ user: req.session.user || null }))
}