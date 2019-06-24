const { createHash } = require('crypto')
const { readFile, writeFile, unlink } = require('fs')

let digest = ''
const hash = createHash('sha256')
const catchErr = err => { if (err) throw err }

readFile('./static/css/app.css', (_, data) => {
	hash.update(data)
	digest = hash.digest('hex').substring(0, 8)
	writeFile(`./static/css/app.${digest}.css`, data, catchErr)

	readFile('./__sapper__/build/template.html', 'utf8', (_, data) => {
		writeFile(`./__sapper__/build/template.html`, data.replace('app.css', `app.${digest}.css`), catchErr)
	})

	readFile('./__sapper__/build/service-worker.js', 'utf8', (_, data) => {
		writeFile(`./__sapper__/build/service-worker.js`, data.replace('app.css', `app.${digest}.css`), catchErr)
	})

	unlink('./static/css/app.css', catchErr)
})