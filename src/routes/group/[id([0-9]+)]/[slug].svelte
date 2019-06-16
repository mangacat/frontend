<svelte:head>
    <title>{group.name} - MangaCat</title>
</svelte:head>

{group.name}

<script context="module">
    import * as api from 'api.js'

    export async function preload({ params }, { user }) {
    	const res = await api.get(`groups_scanlation/${params.id}`, user && user.token)
        
    	if (res.status === 500) this.error(404)
        
    	return { group: res }
    }
</script>

<script>
    export let group
</script>