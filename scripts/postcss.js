import postcss from 'postcss'
import { createHash } from 'crypto'
import * as config from '../postcss.config'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'

const { plugins } = config

async function process() {
	const css = readFileSync('./src/css/tailwind.pcss', { encoding: 'utf8' })
	const result = await postcss(plugins).process(css, { 
		from: './src/css/tailwind.pcss', 
		to: './static/css/app.css', 
		map: false 
	})
	
	if (!existsSync('./static/css/')) mkdirSync('./static/css/')
	
	const hash = createHash('md5').update(result.css).digest('hex').substring(0, 8)
	writeFileSync(`./static/css/app.${hash}.css`, result.css)
	
	const file = readFileSync('./src/template.html', { encoding: 'utf8' })
	writeFileSync('./src/template.html', file.replace(new RegExp('/css/app.+?css'), `/css/app.${hash}.css`))
}

console.time('Built CSS in')

Promise.resolve(process()).then(() => console.timeEnd('Built CSS in'))