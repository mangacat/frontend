export function post(req, res, next) {
	delete req.session.destroy(err => {
		if (err) {
			console.log(err) // eslint-disable-line no-console
			return next(err)
		}
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify({ ok: true }))
	})
}