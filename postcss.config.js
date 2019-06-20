const dev = process.env.NODE_ENV === "development"

module.exports = {
	plugins: [
		require('tailwindcss')('./tailwind.config.js'),
		require('postcss-nested'),
		require('css-prefers-color-scheme/postcss'),
		require('postcss-preset-env')({ stage: 1 }),
		!dev && require('@fullhuman/postcss-purgecss')({
			content: ['./**/*.svelte', './**/*.html'],
			defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
		}),
		!dev && require('cssnano')({
			preset: ['default', {
				discardComments: {
					removeAll: true,
				}
			}]
		})
	].filter(Boolean)
}