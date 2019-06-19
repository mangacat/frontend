<svelte:head>
    <title>Home - MangaCat</title>
</svelte:head>

<div class="min-h-screen max-w-xl mx-auto pt-8 px-4">
    {#each chapters as {number_absolute, number_volume, title, time_uploaded, groups, views, comments, id, series}, index}
        {#if index === 0 || chapters[index - 1].series.id !== series.id}
            <a href="/series/{series.id}/{slugify(series.name)}" class="block py-1 border-b border-gray-500 dark:border-gray-600">
                {series.name}
            </a>
        {/if}
        <div class="flex py-2 border-b border-gray-500 dark:border-gray-600">
            <div class="flex-grow">
                <a href="/read/{id.toString(36)}">
                    {#if number_volume}
                        Vol. {number_volume}
                    {/if}
                    {#if number_absolute}
                        Ch. {number_absolute}
                    {/if}
                    {#if title}
                         - {title}
                    {/if}
                </a>
                <div class="text-sm">
                    <span title="{new Date(time_uploaded)}">
                        {timeAgo(time_uploaded)}
                    </span>
                     • 
                    {#each groups as {name, id}, i}
                        {#if i != 0}
                             | 
                        {/if}
                        <a href="/group/{id}/{slugify(name)}">{name}</a>
                    {/each}
                </div>
            </div>
            <div class="flex-grow-0" style="width: 80px;">
                <div class="flex items-center tabular-nums">
                    <svg class="fill-current h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zm-9.9-1.42a6 6 0 0 0 8.48 0L20.38 12l-4.24-4.24a6 6 0 0 0-8.48 0L3.4 12l4.25 4.24zM11.9 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                    </svg>
                    {views}
                </div>
                <a href="/read/{id.toString(36)}/#/comments" class="flex items-center tabular-nums">
                    <svg class="fill-current h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2zM20 5H4v10h13a1 1 0 0 1 .7.3l2.3 2.29V5z"/>
                    </svg>
                    {comments}
                </a>
            </div>
        </div>
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
    import { slugify, timeAgo } from 'filters.js'

    export let chapters
</script>