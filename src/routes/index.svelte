<svelte:head>
    <title>Home - MangaCat</title>
</svelte:head>

<div class="min-h-screen max-w-xl mx-auto pt-8 px-4">
    {#if loading}
        {#each [...new Array(10).keys()] as i}
            <LoadingPulse class="{['max-w-lg', 'w-64', 'w-48'][Math.round(Math.random() * 3)]} h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        {/each}
    {:else}
        {#each chapters as chapter, index}
            {#if index === 0 || chapters[index - 1].series.id !== chapter.series.id}
                <a href="/series/{chapter.series.id}/{slugify(chapter.series.name)}" class="hover:underline block py-1 border-b border-gray-500 dark:border-gray-600">
                    {chapter.series.name}
                </a>
            {/if}
            <Chapter {chapter} />
        {/each}
    {/if}
</div>

<script>
    import * as api from 'api.js'
    import { onMount } from 'svelte'
    import { slugify } from 'utils'
    import Chapter from 'components/Chapter.svelte'
    import LoadingPulse from 'components/LoadingPulse.svelte'

    let chapters = []
    let loading = true

    onMount(async () => {
    	chapters = await api.get(`series_chapters?sortby=TimeUploaded&order=desc&limit=25`)
    	loading = false
    })
</script>