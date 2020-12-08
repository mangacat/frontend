{#if process.browser && !$page.path.startsWith('/read/')}
	<Nav />
{/if}

<Notifications bind:this={notifications} />

<slot></slot>
{#if !$page.path.startsWith('/read/')}
	<Footer />
{/if}

<script>
	import GAnalytics from 'ganalytics'
	import { stores } from '@sapper/app'
	import { onMount, tick } from 'svelte'
	import Nav from 'components/Nav.svelte'
	import Footer from 'components/Footer.svelte'
	import { userSession, notify } from 'stores.js'
	import Notifications from 'components/Notifications.svelte'
	
	const { page, session } = stores()

	userSession.set(session)

	let ga
	let notifications

	$: log($page.path)

	const log = async () => {
		await tick()
		if (process.browser && ga) ga.send('pageview')
	}

	onMount(() => {
		notify.set(notifications)
		if (process.env.NODE_ENV !== 'development' && process.env.GOOGLE_ANALYTICS_ID) ga = new GAnalytics(process.env.GOOGLE_ANALYTICS_ID, { aid: 1 })
	})
</script>