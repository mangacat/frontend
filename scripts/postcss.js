const postcss = require('postcss')
const { createHash } =  require('crypto')
const { plugins } = require('../postcss.config.js')
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs')

function process() {
	const css = readFileSync('./src/css/tailwind.pcss', { encoding: 'utf8' })

	return postcss(plugins)
		.process(css, {
			from: './src/css/tailwind.pcss',
			to: './static/css/app.css',
			map: false
		})
		.then(({ css }) => {
			existsSync('./static/css/') || mkdirSync('./static/css/')
	
			const hash = createHash('md5').update(css).digest('hex').substring(0, 8)
			writeFileSync(`./static/css/app.${hash}.css`, css)
	
			const file = readFileSync('./src/template.html', { encoding: 'utf8' })
			writeFileSync('./src/template.html', file.replace(new RegExp('/css/app.+?css'), `/css/app.${hash}.css`))
		})
}

console.time('Built CSS in')

Promise
	.resolve(process())
	.then(() => console.timeEnd('Built CSS in'))