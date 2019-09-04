import * as api from 'api.js'

export async function post(request, response) {
	const user = request.body

	const apiResponse = await api.post('auth/login', user)

	if (apiResponse.user) request.session.user = apiResponse.user

	response.setHeader('Content-Type', 'application/json')
	response.end(JSON.stringify(apiResponse))
}