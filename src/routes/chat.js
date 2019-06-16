export function get(_, res) {
	res.writeHead(302, { Location: 'https://discord.gg/g5K6Uvs' })
	res.end()
}