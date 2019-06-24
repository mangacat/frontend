const { createHash } = require('crypto')
const { readFileSync, writeFileSync, unlinkSync } = require('fs')

const css = readFileSync('./static/css/app.css', { encoding: 'utf8' })
const destFile = `app.${createHash('md5').update(css).digest('hex').substring(0, 8)}.css`

const replaceInFile = (file, str1, str2) => {
	const orig = readFileSync(file, { encoding: 'utf8' })
	writeFileSync(file, orig.replace(str1, str2))
}

writeFileSync(`./static/css/${destFile}`, css)

replaceInFile('./__sapper__/build/template.html', 'app.css', destFile)
replaceInFile('./__sapper__/build/service-worker.js', 'app.css', destFile)

unlinkSync('./static/css/app.css')