{#if !$page.path.startsWith('/read/')}
	<Nav />
{/if}

<slot></slot>
{#if !$page.path.startsWith('/read/')}
	<Footer />
{/if}

<script>
	import GAnalytics from 'ganalytics'
	import { stores } from '@sapper/app'
	import { onMount, tick } from 'svelte'
	import { userSession } from 'stores.js'
	import Nav from 'components/Nav.svelte'
	import Footer from 'components/Footer.svelte'
	
	const { page, session } = stores()

	userSession.set(session)

	let ga

	$: log($page.path)

	const log = async () => {
		await tick()
		if (typeof window === 'object' && ga) ga.send('pageview')
	}

	onMount(() => {
		if (process.env.NODE_ENV !== 'development' && process.env.GOOGLE_ANALYTICS_ID) ga = new GAnalytics(process.env.GOOGLE_ANALYTICS_ID, { aid: 1 })
	})
</script>