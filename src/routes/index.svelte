<svelte:head>
    <title>Home - MangaCat</title>
</svelte:head>

<div class="min-h-screen max-w-xl mx-auto pt-8 px-4">
    {#each chapters as chapter, index}
        {#if index === 0 || chapters[index - 1].series.id !== chapter.series.id}
            <a href="/series/{chapter.series.id}/{slugify(chapter.series.name)}" class="hover:underline block py-1 border-b border-gray-500 dark:border-gray-600">
                {chapter.series.name}
            </a>
        {/if}
        <Chapter {chapter} />
    {/each}
</div>

<script context="module">
    import * as api from 'api.js'

    export async function preload() {
    	const chapters = await api.get(`series_chapters?sortby=TimeUploaded&order=desc&limit=25`)
        
    	return { chapters }
    }
</script>

<script>
    import { slugify } from 'filters.js'
    import Chapter from 'components/Chapter.svelte'

    export let chapters
</script>