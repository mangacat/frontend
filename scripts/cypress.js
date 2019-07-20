import execa from 'execa'

async function install() {
	await execa(
		'npm', 
		['install', 'cypress@3.4.0', '--save-dev'],
		{
			stdout: process.stdout,
			stderr: process.stderr
		}
	)
}

console.time('Installed Cypress in')

Promise.resolve(install()).then(() => console.timeEnd('Installed Cypress in'))