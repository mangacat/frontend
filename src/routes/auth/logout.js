export function post(request, response, next) {
	request.session.destroy(error => {
		if (error) {
			console.log(error)
			return next(error)
		}
		response.setHeader('Content-Type', 'application/json')
		response.end(JSON.stringify({ ok: true }))
	})
}