const postcss = require('postcss')
const { createHash } =  require('crypto')
const { plugins } = require('../postcss.config.js')
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs')

exports.css = function () {
	const css = readFileSync('./src/css/tailwind.pcss', { encoding: 'utf8' })

	return postcss(plugins)
		.process(css, {
			from: './src/css/tailwind.pcss',
			to: './static/css/app.css',
			map: false
		})
		.then(({ css }) => {
			!existsSync('./static/css/') && mkdirSync('./static/css/')
	
			const hash = createHash('md5').update(css).digest('hex').substring(0, 8)
			writeFileSync(`./static/css/app.${hash}.css`, css)
	
			const file = readFileSync('./src/template.html', { encoding: 'utf8' })
			writeFileSync('./src/template.html', file.replace(new RegExp('/css/app.+?css'), `/css/app.${hash}.css`))

			if (existsSync('./__sapper__/build/template.html')) {
				const file2 = readFileSync('./__sapper__/build/template.html', { encoding: 'utf8' })
				writeFileSync('./__sapper__/build/template.html', file2.replace(new RegExp('/css/app.+?css'), `/css/app.${hash}.css`))
			}
		})
}