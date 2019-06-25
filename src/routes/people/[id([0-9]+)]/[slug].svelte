<svelte:head>
    <title>{people.name} - MangaCat</title>
</svelte:head>

<div class="people-wrapper min-h-screen px-4 pt-8 max-w-5xl mx-auto mb-8">
    {#if width < 640}
        <div class="flex pb-2 mb-2">
            {#if people.image !== 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'}
                <img alt="{people.name}" src="{cdn(people.image, { resize: '384,512' })}" class="h-32 w-24 rounded shadow mr-4">
            {/if}
            <div>
                <h1 class="font-bold text-xl">{people.name}</h1>
                {#if people.about}
                    <div class="text-sm whitespace-pre-line text-gray-700 dark:text-gray-300">
                        {#if about_expanded}
                            {people.about}
                        {:else}
                            {people.about.substr(0, 150)}...
                        {/if}
                        <button class="font-bold" on:click={() => {about_expanded = !about_expanded}}>
                            {about_expanded ? 'less' : 'more'}
                        </button>
                    </div>
                {/if}
            </div>
        </div>
        {#if people.series.filter(x => x.type.toLowerCase().includes('story')).length !== 0}
            <h2 class="uppercase text-sm tracking-wide bg-gray-200 dark:bg-gray-700 -mx-4 py-1 px-4">
                writer for {people.series.filter(x => x.type.toLowerCase().includes('story')).length} series
            </h2>
            <div class="series mb-6 mt-6">
                {#each people.series.filter(x => x.type.toLowerCase().includes('story')) as { series, type }}
                    <a class="inline-block" href="/series/{series.id}/{slugify(series.name)}" title="{series.name}">
                        <img class="h-32 rounded shadow" src="{cdn(series.cover, { resize: '384,512' })}" alt="{series.name}">
                    </a>
                {/each}
            </div>
        {/if}
        {#if people.series.filter(x => x.type.toLowerCase().includes('art')).length !== 0}
            <h2 class="uppercase text-sm tracking-wide bg-gray-200 dark:bg-gray-700 -mx-4 py-1 px-4">
                illustrator for {people.series.filter(x => x.type.toLowerCase().includes('art')).length} series
            </h2>
            <div class="series mb-6 mt-6">
                {#each people.series.filter(x => x.type.toLowerCase().includes('art')) as { series, type }}
                    <a class="inline-block" href="/series/{series.id}/{slugify(series.name)}" title="{series.name}">
                        <img class="h-32 rounded shadow" src="{cdn(series.cover, { resize: '384,512' })}" alt="{series.name}">
                    </a>
                {/each}
            </div>
        {/if}
    {:else}
        <div>
            {#if people.series.filter(x => x.type.toLowerCase().includes('story')).length !== 0}
                <h3 class="uppercase text-sm tracking-wide">series written by</h3>
                <h1 class="font-bold text-xl pb-4 mb-4 border-b border-gray-500 dark:border-gray-600">{people.name}</h1>
                <div class="series mb-8">
                    {#each people.series.filter(x => x.type.toLowerCase().includes('story')) as { series, type }}
                        <a class="inline-block" href="/series/{series.id}/{slugify(series.name)}" title="{series.name}">
                            <img class="h-48 rounded shadow" src="{cdn(series.cover, { resize: '384,512' })}" alt="{series.name}">
                        </a>
                    {/each}
                </div>
            {/if}
            {#if people.series.filter(x => x.type.toLowerCase().includes('art')).length !== 0}
                <h3 class="uppercase text-sm tracking-wide">series illustrated by</h3>
                <h1 class="font-bold text-xl pb-4 mb-4 border-b border-gray-500 dark:border-gray-600">{people.name}</h1>
                <div class="series mb-8">
                    {#each people.series.filter(x => x.type.toLowerCase().includes('art')) as { series, type }}
                        <a class="inline-block" href="/series/{series.id}/{slugify(series.name)}" title="{series.name}">
                            <img class="h-48 rounded shadow" src="{cdn(series.cover, { resize: '384,512' })}" alt="{series.name}">
                        </a>
                    {/each}
                </div>
            {/if}
        </div>
        <div>
            {#if people.image !== 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'}
                <img alt="{people.name}" src="{cdn(people.image, { resize: '384,512' })}" class="h-64 w-48 rounded shadow mx-auto mb-6">
            {/if}
            {#if people.about}
                <div class="text-sm whitespace-pre-line text-gray-700 dark:text-gray-300">
                    {#if about_expanded}
                        {people.about}
                    {:else}
                        {people.about.substr(0, 100)}...
                    {/if}
                    <button class="font-bold" on:click={() => {about_expanded = !about_expanded}}>
                        {about_expanded ? 'less' : 'more'}
                    </button>
                </div>
            {/if}
            {#if people.mal_id}
                <div class="text-xs mt-4">
                    More details at
                    <a rel="noreferrer noopener nofollow" href="https://myanimelist.net/people/{people.mal_id}" target="_blank" class="cursor-pointer border-2 border-solid border-gray-600 hover:border-gray-700 dark:border-gray-500 dark:hover:border-gray-400 p-1 mx-1">MAL</a>
                </div>
            {/if}
        </div>
    {/if}
</div>

<svelte:window bind:innerWidth={width} />

<script context="module">
    import * as api from 'api.js'

    export async function preload({ params }, { user }) {
    	const res = await api.get(`people/${params.id}`, user && user.token)
        
    	if (res.status === 500) this.error(404)
        
    	return { people: res }
    }
</script>

<script>
    import { cdn } from 'cdn.js'
    import { slugify } from 'filters.js'

    export let people
    let width
    let about_expanded = false
</script>

<style lang="postcss">
.people-wrapper {
    @screen sm {
        grid-template-columns: auto 12rem;
        display: grid;
        column-gap: 4rem;
        row-gap: 2rem;
    }
}

.series {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, 6rem);

    @screen sm {
        grid-template-columns: repeat(auto-fill, 9rem);
    }
}
</style>