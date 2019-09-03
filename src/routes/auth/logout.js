export function post(req, res, next) {
	req.session.destroy(err => {
		if (err) {
			console.log(err)
			return next(err)
		}
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify({ ok: true }))
	})
}