<script context="module">
	import { slugify } from 'filters.js'
	import * as api from 'api.js'

	export async function preload({ params }, { user }) {
		const res = await api.get(`groups_scanlation/${params.id}`, user && user.token)
		
		if (res.status === 500) this.error(404)
		else this.redirect(301, `/group/${params.id}/${slugify(res.name)}`)
}
</script>