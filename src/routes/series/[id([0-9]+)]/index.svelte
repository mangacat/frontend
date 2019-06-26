<script context="module">
	import { slugify } from 'utils.js'
	import * as api from 'api.js'

	export async function preload({ params }, { user }) {
		const res = await api.get(`series/${params.id}`, user && user.token)
		
		if (res.status === 500) this.error(404)
		else this.redirect(301, `/series/${params.id}/${slugify(res.name)}`)
}
</script>