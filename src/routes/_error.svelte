<svelte:head>
	<title>{status} - MangaCat</title>
</svelte:head>

<div class="absolute inset-0 z-100 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
	<div class="bg-white dark:bg-gray-700 rounded max-w-2xl shadow-md p-8 sm:flex">
		<div class="sm:mr-8 text-center sm:text-left sm:flex sm:flex-col">
			<h1 class="font-bold text-3xl sm:mt-8 mb-4 sm:mb-8">{status}</h1>
			<p class="mb-4 mx-auto sm:mx-0 sm:mb-8 text-lg w-48">
				You've been isekai'd into the wrong world!
			</p>
			<a href="/" class="underline hover:no-underline">Teleport back home?</a>
		</div>
		<div class="flex-shrink-0">
			<picture>
				<source srcset="/img/404@2x.webp 2x" type="image/webp"> 
				<source srcset="/img/404.webp" type="image/webp"> 
				<source srcset="/img/404@2x.png 2x" type="image/jpeg"> 
				<source srcset="/img/404.png" type="image/webp"> 
				<img alt="Error mascot" src="/img/404.png" class="w-64" />
			</picture>
		</div>
	</div>
</div>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

<script>
	export let error
	export let status

	const dev = process.env.NODE_ENV === 'development'
</script>