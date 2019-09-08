<svelte:head>
    <title>{series.name} - MangaCat</title>
</svelte:head>

<div class="series-wrapper min-h-screen px-4 pt-8 max-w-5xl mx-auto mb-8">
    <div>
        <div id="cover-container" class="sticky" style="top: { $nav_height + 25}px;">
            <img alt="Cover for {series.name}" src="{cdn(series.cover, { resize: '384,512' })}" class="h-64 w-48 rounded shadow mx-auto">
            <div class="flex justify-center mt-2 items-center text-sm tabular-nums">
                <svg class="fill-current h-3 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
                </svg>
                {series.views}
                <svg class="fill-current h-3 mr-1 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z" />
                </svg>
                {series.follows}
            </div>
            {#if $session && $session.user}
                <a href="/upload/{series.id}" class="flex items-center justify-center bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 rounded py-1 mt-2 shadow">
                    <svg class="h-4 w-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24">
                        <path d="M13 5.41V17a1 1 0 0 1-2 0V5.41l-3.3 3.3a1 1 0 0 1-1.4-1.42l5-5a1 1 0 0 1 1.4 0l5 5a1 1 0 1 1-1.4 1.42L13 5.4zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"/>
                    </svg>
                    Upload
                </a>
            {/if}
            {#if series.raw || series.amzjp_id}
                <div class="border border-gray-500 dark:border-gray-600 rounded overflow-hidden mt-2 series-official-links">
                    <p class="uppercase tracking-widest bg-gray-400 dark:bg-gray-700 p-2 text-xs">
                        official links
                    </p>
                    {#if series.raw}
                        <p class="py-2 mx-2 text-sm">
                            <a href="{series.raw}" rel="noreferrer noopener nofollow" class="inline-block align-middle cursor-pointer hover:text-gray-600 dark:hover:text-gray-400" target="_blank">
                                <svg class="w-4 fill-current inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" />
                                </svg>
                                <span>Raw</span>
                            </a>
                        </p>
                    {/if}
                    {#if series.amzjp_id}
                        <p class="py-2 mx-2 text-sm">
                            <a href="https://www.amazon.co.jp/dp/{series.amzjp_id}" rel="noreferrer noopener nofollow" class="inline-block align-middle cursor-pointer hover:text-gray-600 dark:hover:text-gray-400" target="_blank">
                                <svg class="w-4 fill-current inline-block mr-1" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 0 1-10.951-.577 17.88 17.88 0 0 1-5.43-3.35c-.1-.074-.15-.15-.15-.22 0-.047.02-.09.05-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 0 1-.526-.496l-.31-.347a9.391 9.391 0 0 1-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 0 1 1.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.09.228.09.39v.15c0 .51-.14 1.11-.415 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z" />
                                </svg>
                                <span>Amazon JP</span>
                            </a>
                        </p>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
    <div>
        <h1 class="text-xl font-bold">{series.name}</h1>
        <p class="mt-2 whitespace-pre-line">
            {series.description}
        </p>
        <ul class="flex border-b border-gray-500 dark:border-gray-600 mt-4">
            <li class="{activeLink === '' ? 'border-b border-gray-700 dark:border-gray-400' : 'text-gray-600 dark:text-gray-500'} py-2 mr-4 uppercase tracking-widest text-sm cursor-pointer font-bold" style="margin-bottom: -1px;" on:click={() => { activeLink = '' }}>
                Genres
            </li>
            <li class="{activeLink === 'crew' ? 'border-b border-gray-700 dark:border-gray-400' : 'text-gray-600 dark:text-gray-500'} py-2 mr-4 uppercase tracking-widest text-sm cursor-pointer font-bold" style="margin-bottom: -1px;" on:click={() => { activeLink = 'crew' }}>
                Crew
            </li>
            <li class="{activeLink === 'details' ? 'border-b border-gray-700 dark:border-gray-400' : 'text-gray-600 dark:text-gray-500'} py-2 mr-4 uppercase tracking-widest text-sm cursor-pointer font-bold" style="margin-bottom: -1px;" on:click={() => { activeLink = 'details' }}>
                Details
            </li>
        </ul>
        <div class="mt-2 {activeLink === '' ? 'flex flex-wrap' : ''}">
            {#if activeLink === ''}
                {#each series.tags as { name }}
                    <a href="/search?tags_inc={name}" class="cursor-pointer py-1 px-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 rounded mr-2 mt-2 text-sm">
                        {name}
                    </a>
                {/each}
            {:else if activeLink === 'crew'}
                {#if series.people.filter(x => x.type.toLowerCase().includes('story')).length !== 0}
                    <div class="flex leading-none pt-2 max-w-md">
                        <div class="w-1/2">
                            <h3 class="uppercase tracking-wide text-sm border-b border-dotted border-gray-700 dark:border-gray-100">
                                <span class="bg-gray-100 dark:bg-gray-800 relative pr-1" style="top: 2px;">
                                    authors
                                </span>
                            </h3>
                        </div>
                        <div class="w-1/2 px-2 flex flex-wrap">
                            {#each series.people.filter(x => x.type.toLowerCase().includes('story')) as { people, type }}
                                <a href="/people/{people.id}/{slugify(people.name)}" class="cursor-pointer py-1 px-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 rounded mr-2 mb-2 text-sm">
                                    {people.name}
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if series.people.filter(x => x.type.toLowerCase().includes('art')).length !== 0}
                    <div class="flex leading-none pt-2 max-w-md">
                        <div class="flex-grow">
                            <h3 class="uppercase tracking-wide text-sm border-b border-dotted border-gray-700 dark:border-gray-100">
                                <span class="bg-gray-100 dark:bg-gray-800 relative pr-1" style="top: 2px;">
                                    artists
                                </span>
                            </h3>
                        </div>
                        <div class="w-1/2 px-2 flex flex-wrap">
                            {#each series.people.filter(x => x.type.toLowerCase().includes('art')) as { people, type }}
                                <a href="/people/{people.id}/{slugify(people.name)}" class="cursor-pointer py-1 px-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 rounded mr-2 mb-2 text-sm">
                                    {people.name}
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}
            {:else}
                <div class="flex leading-none py-2 max-w-md">
                    <div class="w-1/2">
                        <h3 class="uppercase tracking-wide text-sm border-b border-dotted border-gray-700 dark:border-gray-100">
                            <span class="bg-gray-100 dark:bg-gray-800 relative pr-1" style="top: 2px;">
                                country
                            </span>
                        </h3>
                    </div>
                    <div class="w-1/2 px-2">
                        <a href="/search?country={series.country}" class="cursor-pointer py-1 px-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 rounded mr-2 mt-2 text-sm">
                            {series.country}
                        </a>
                    </div>
                </div>
                <div class="flex leading-none py-2 max-w-md">
                    <div class="flex-grow">
                        <h3 class="uppercase tracking-wide text-sm border-b border-dotted border-gray-700 dark:border-gray-100">
                            <span class="bg-gray-100 dark:bg-gray-800 relative pr-1" style="top: 2px;">
                                status
                            </span>
                        </h3>
                    </div>
                    <div class="w-1/2 px-2">
                        <a href="/search?status={series.status}" class="cursor-pointer py-1 px-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 rounded mr-2 mt-2 text-sm">
                            {series.status}
                        </a>
                    </div>
                </div>
                <div class="flex leading-none py-2 max-w-md">
                    <div class="flex-grow">
                        <h3 class="uppercase tracking-wide text-sm border-b border-dotted border-gray-700 dark:border-gray-100">
                            <span class="bg-gray-100 dark:bg-gray-800 relative pr-1" style="top: 2px;">
                                alternative titles
                            </span>
                        </h3>
                    </div>
                    <div class="w-1/2 px-2 text-sm leading-snug">
                        {series.aliases.map(x => x.name).join(', ')}
                    </div>
                </div>
            {/if}
        </div>
        {#if series.mal_id || series.mu_id}
            <div class="text-xs mt-6">
                More details at
                {#if series.mal_id}
                    <a rel="noreferrer noopener nofollow" href="https://myanimelist.net/manga/{series.mal_id}" target="_blank" class="cursor-pointer border-2 border-solid border-gray-600 hover:border-gray-700 dark:border-gray-500 dark:hover:border-gray-400 p-1 mx-1">MAL</a>
                {/if}
                {#if series.mu_id}
                    <a rel="noreferrer noopener nofollow" href="https://www.mangaupdates.com/series.html?id={series.mu_id}" target="_blank" class="cursor-pointer border-2 border-solid border-gray-600 hover:border-gray-700 dark:border-gray-500 dark:hover:border-gray-400 p-1 mr-1">MU</a>
                {/if}
            </div>
        {/if}
        {#if series.related.length !== 0}
            <div class="mt-12 relative">
                <h2 class="py-2 pr-1 uppercase tracking-widest text-sm border-b border-gray-500 dark:border-gray-600 flex items-center justify-between mb-4">
                    Related Series
                </h2>
                <div class="related-series">
                    {#each series.related as { rel_series, type }}
                        <a class="inline-block relative" href="/series/{rel_series.id}/{slugify(rel_series.name)}">
                            <img class="h-32 w-24 rounded shadow" src="{cdn(rel_series.cover, { resize: '384,512' })}" alt="{rel_series.name}">
                            <div class="text-sm absolute inset-x-0 bottom-0 leading-tight py-1 text-center rounded-b text-gray-200" style="background-color: rgba(26, 32, 44, 0.6); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);">{type}</div>
                        </a>
                    {/each}
                </div>
            </div>
        {/if}
        {#if series.chapters.length !== 0}
            <div class="mt-12 relative">
                <h2 class="py-2 pr-1 uppercase tracking-widest text-sm border-b border-gray-500 dark:border-gray-600 flex items-center justify-between">
                    chapters
                    <button class="flex items-center outline-none focus:shadow-outline" on:click={toggle_language_dropdown}>
                        <svg aria-hidden="true" class="fill-current w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                            <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm193.2 152h-82.5c-9-44.4-24.1-82.2-43.2-109.1 55 18.2 100.2 57.9 125.7 109.1zM336 256c0 22.9-1.6 44.2-4.3 64H164.3c-2.7-19.8-4.3-41.1-4.3-64s1.6-44.2 4.3-64h167.4c2.7 19.8 4.3 41.1 4.3 64zM248 40c26.9 0 61.4 44.1 78.1 120H169.9C186.6 84.1 221.1 40 248 40zm-67.5 10.9c-19 26.8-34.2 64.6-43.2 109.1H54.8c25.5-51.2 70.7-90.9 125.7-109.1zM32 256c0-22.3 3.4-43.8 9.7-64h90.5c-2.6 20.5-4.2 41.8-4.2 64s1.5 43.5 4.2 64H41.7c-6.3-20.2-9.7-41.7-9.7-64zm22.8 96h82.5c9 44.4 24.1 82.2 43.2 109.1-55-18.2-100.2-57.9-125.7-109.1zM248 472c-26.9 0-61.4-44.1-78.1-120h156.2c-16.7 75.9-51.2 120-78.1 120zm67.5-10.9c19-26.8 34.2-64.6 43.2-109.1h82.5c-25.5 51.2-70.7 90.9-125.7 109.1zM363.8 320c2.6-20.5 4.2-41.8 4.2-64s-1.5-43.5-4.2-64h90.5c6.3 20.2 9.7 41.7 9.7 64s-3.4 43.8-9.7 64h-90.5z" />
                        </svg>
                        English
                        <svg class="h-3 fill-current ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                        </svg>
                    </button>
                    {#if language_dropdown}
                        <div class="absolute right-0 top-0 bg-gray-300 dark:bg-gray-700 p-4 rounded shadow mt-8 normal-case">
                            <ul>
                                {#each languages as language}
                                    <li class="cursor-pointer">{language}</li>
                                {/each}
                            </ul>
                        </div>
                    {/if}
                </h2>
                {#each series.chapters as chapter}
                    <Chapter {chapter} />
                {/each}
            </div>
        {/if}
    </div>
</div>

<script context="module">
    import * as api from 'api.js'

    export async function preload({ params }, { user }) {
    	const res = await api.get(`series/${params.id}`, user && user.token)
        
    	if (res.status === 500) this.error(404)
        
    	return { series: res }
    }
</script>

<script>
    import { cdn } from 'cdn.js'
    import { slugify } from 'utils'
    import { stores } from '@sapper/app'
    import { nav_height } from 'stores.js'
    import Chapter from 'components/Chapter.svelte'

    const { session } = stores()

    export let series
    let activeLink = ''

    let language_dropdown = false
    const languages = ["Arabic", "Bengali", "Brazilian", "Bulgarian", "Chinese", "Czech", "Danish", "Dutch", "English", "Filipino", "French", "German", "Greek", "Hebrew", "Hungarian", "Indonesian", "Italian", "Japanese", "Korean", "Lithuanian", "Malay", "Persian", "Polish", "Portuguese", "Romanian", "Russian", "Spanish", "Swedish", "Thai", "Turkish", "Vietnamese"]

    const toggle_language_dropdown = () => {
    	language_dropdown = !language_dropdown
    }
</script>

<style lang="postcss">
.series-official-links p:not(:last-child) {
    @apply border-b border-gray-500;

    @screen dark {
        @apply border-gray-600;
    }
}

.series-wrapper {
    display: grid;
    gap: 2rem;

    @screen sm {
        grid-template-columns: 12rem auto;
    }
}

.related-series {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, 6rem);
}

div#cover-container {
    transition: top 0.5s ease 0s;
}
</style>