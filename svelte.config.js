const preprocess = require('svelte-preprocess')
const { plugins } = require('./postcss.config.js')

module.exports = {
	preprocess: preprocess({
		transformers: {
			postcss: { plugins }
		}
	})
}