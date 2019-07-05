const postcss = require('postcss')
const { createHash } = require('crypto')
const { plugins } = require('../postcss.config')
const { readFile, writeFile, mkdir } = require('fs')

console.time('Built CSS in')

readFile('./src/css/tailwind.pcss', { encoding: 'utf8' }, (err, css) => {
	postcss(plugins)
		.process(css, { from: './src/css/tailwind.pcss', to: './static/css/app.css', map: false })
		.then(result => {
			mkdir('./static/css/', () => true)
			const hash = createHash('md5').update(result.css).digest('hex').substring(0, 8)
			writeFile(`./static/css/app.${hash}.css`, result.css, () => true)

			readFile('./src/template.html', { encoding: 'utf8' }, (err, file) => {
				writeFile('./src/template.html', file.replace(new RegExp('/css/app.+?css'), `/css/app.${hash}.css`), () => {
					console.timeEnd('Built CSS in')
				})
			})
		})
})