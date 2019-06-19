<button class={_class} title="Switch between light and dark theme" on:click={toggleTheme}>
	<svg class="fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path d="M9.57 3.38a8 8 0 0 0 10.4 10.4 1 1 0 0 1 1.31 1.3 10 10 0 1 1-13-13 1 1 0 0 1 1.3 1.3zM7.1 5.04A8 8 0 1 0 18.3 16.27 10 10 0 0 1 7.08 5.04z"/>
	</svg>
</button>

<svelte:window on:storage={storage} />

<script>
    import { onMount } from 'svelte'
    import prefersColorScheme from 'css-prefers-color-scheme'

    let _class = ''
    export { _class as class }

    const storage = () => { prefersColorScheme(localStorage.getItem('site-theme')) }

    const toggleTheme = () => {
    	if (localStorage.getItem('site-theme') === 'light') {
    		localStorage.setItem('site-theme', 'dark')
    		prefersColorScheme('dark')
    	} else {
    		localStorage.setItem('site-theme', 'light')
    		prefersColorScheme('light')
    	}
    }

    onMount(() => {
    	const siteTheme = localStorage.getItem('site-theme')

    	if (siteTheme === null) {
    		localStorage.setItem('site-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    	} else {
    		prefersColorScheme(siteTheme)
    	}
    })
</script>