describe('Health Check', () => {
	it('endpoint exists', () => {
		cy.request('/health').then(response => {
			expect(response.status).to.equal(200)
		})
	})
    
	it('returns OK', () => {
		cy.request('/health').then(response => {
			expect(response.body).to.equal('OK')
		})
	})
})