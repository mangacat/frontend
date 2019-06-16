<div class="min-h-screen mt-6 px-4 search max-w-9xl mx-auto">
    <div>
        <div class="{width < 1024 ? 'search-input' : ''}">
            <div class="relative">
                <input bind:value={query.name} class="focus:outline-none focus:shadow-outline focus:shadow-md shadow bg-white dark:bg-gray-700 rounded py-2 pr-4 pl-10 block appearance-none leading-normal w-full" type="search" placeholder="Search" />
                <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg class="fill-current pointer-events-none w-5 h-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41l.01-.01zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                </div>
            </div>
            {#if width < 1024}
                <button class="bg-white dark:bg-gray-700 rounded px-2 focus:outline-none focus:shadow-outline shadow" on:click="{() => { filters = !filters }}">
                    <svg class="h-full w-full fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M4 5h16a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2zm3 6h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2zm3 6h4a1 1 0 0 1 0 2h-4a1 1 0 0 1 0-2z" />
                    </svg>
                </button>
            {/if}
        </div>
        {#if ready}
            {#if width >= 1024 || filters}
                <div transition:slide="{{ duration: 400 }}">
                    <div class="capitalize mb-1 mt-4">status</div>
                    <SearchMultipleSelect bind:value={query.status} options={['Completed', 'Releasing', 'Hiatus', 'Cancelled']} />
                    <div class="capitalize mb-1 mt-4">country</div>
                    <SearchMultipleSelect bind:value={query.country} options={['Japan', 'China', 'Korea', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia']} />
                    <div class="capitalize mb-1 mt-4">include tags</div>
                    <SearchMultipleSelect bind:value={query.tags_inc} options="{tags.filter(x => !query.tags_exc.includes(x))}" filterFunction="{tagSearch}" searchProperty="name" />
                    <div class="capitalize mb-1 mt-4">exclude tags</div>
                    <SearchMultipleSelect bind:value={query.tags_exc} options="{tags.filter(x => !query.tags_inc.includes(x))}" filterFunction="{tagSearch}" searchProperty="name" />
                    <!-- <div class="capitalize mb-1 mt-4">hentai (18+)</div>
                    <ToggleInput v-model="searchParams.hentai" /> -->
                </div>
            {/if}
        {/if}
    </div>
    <div class="mb-8">
        {#if searching}
                <div class="flex justify-center pt-2 pb-4">
                    <Loading />
                </div>
        {:else}
            {#if results.length == 0}
                <div class="mt-4 text-center">
                    <div class="text-xl">
                        (╯°□°）╯︵ ┻━┻
                    </div>
                    <div>
                        No results found.
                    </div>
                </div>
            {:else}
                <div class="results">
                    {#each results as {id, name, cover, description, tags}, i}
                        <div class="series rounded overflow-hidden bg-white dark:bg-gray-700 shadow hover:shadow-lg">
                            <a class="z-20" href="/series/{id}/{slugify(name)}">
                                <img src="{cdn(cover, { resize: '320,512' })}" alt="Cover for {name}"/>
                            </a>
                            <div class="relative">
                                <div class="series-content absolute left-0 {active === i ? 'active' : ''}">
                                    <div class="h-64 flex flex-col">
                                        <a class="flex-shrink-0 truncate text-lg font-semibold pt-2 px-3" href="/series/{id}/{slugify(name)}">
                                            {name}
                                        </a>
                                        <p class="overflow-y-auto text-sm flex-grow leading-snug px-3 mb-2">
                                            {description}
                                        </p>
                                        <div class="flex-shrink-0 flex items-center py-2 px-3 bg-gray-300 dark:bg-gray-800 cursor-pointer" on:click={() => { active = i }}>
                                            <div class="flex flex-wrap h-6 text-sm overflow-hidden flex-grow leading-none">
                                                {#each tags as {name}}
                                                    <div class="bg-white dark:bg-gray-900 rounded-full px-2 h-6 mr-2 flex items-center lowercase">
                                                        {name}
                                                    </div>
                                                {/each}
                                            </div>
                                            <div class="flex-grow-0">
                                                <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-107.5 8.5L225.7 387.3c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l91.7-91.7-91.7-91.7c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l122.8 122.8c4.7 4.7 4.7 12.3 0 17z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col h-64">
                                        <div class="overflow-y-auto flex-grow px-3 pt-3 mb-2">
                                            <div class="flex flex-wrap -mt-1 text-sm leading-none">
                                                {#each tags as {name}}
                                                    <div class="bg-gray-300 dark:bg-gray-800 rounded-full px-2 h-6 mr-1 mt-1 flex items-center lowercase">
                                                        {name}
                                                    </div>
                                                {/each}
                                            </div>
                                        </div>
                                        <div class="text-center flex items-center py-2 px-3 bg-gray-300 dark:bg-gray-800 cursor-pointer" on:click={() => { active = -1 }}>
                                            <svg class="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm107.5-8.5l122.8-122.8c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17L234.2 256l91.7 91.7c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L163.5 264.5c-4.7-4.7-4.7-12.3 0-17z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        {/if}
    </div>
  </div>

<svelte:head>
    <title>Search - MangaCat</title>
</svelte:head>

<style lang="postcss">
.search {
    display: grid;
    gap: 2rem;
    grid-template-rows: min-content auto;

    @screen lg {
        grid-template-columns: 14rem auto;
    }
}

.search-input {
    display: grid;
    grid-template-columns: auto 40px;
    column-gap: 10px;
}

.results {
    display: grid;
    grid-auto-rows: 16rem;
    gap: 2rem;

    @screen sm {
        grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
    }
}

.series {
    display: grid;
    grid-template-columns: 10rem minmax(0, auto);
}

.series-content {
    width: 200%;
    display: grid;
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    transition: left 0.5s ease;
}

.active {
    left: -100%;
}
</style>

<script context="module">
    import * as api from 'api.js'

    export async function preload(_, { user }) {
    	const tags = await api.get(`tags?sortby=TagName&order=asc`, user && user.token)
        
    	return { tags }
    }
</script>

<svelte:window bind:innerWidth={width} />

<script>
    import { onMount } from 'svelte'
    import { encode, decode } from 'qss'
    import { cdn } from 'cdn.js'
    import { slugify } from 'filters.js'
    import Loading from '../components/Loading.svelte'
    import { slide } from 'svelte/transition'
    import SearchMultipleSelect from '../components/SearchMultipleSelect.svelte'
    
    export let tags

    let controller
    let active = -1
    let results = []
    let ready = false
    let searching = false
    let width
    let filters = false

    const query = {
    	name: '',
    	status: [],
    	country: [],
    	tags_exc: [],
    	tags_inc: [],
    	hentai: false
    }

    $: process(query)

    const removeFalsy = obj => {
    	const newObj = {}
    	Object.keys(obj).forEach(prop => {
    		if (obj[prop] || typeof obj[prop] == 'boolean') newObj[prop] = obj[prop]
    	})
    	return newObj
    }

    const convertArraysToString = obj => {
    	const newObj = {}
    	Object.keys(obj).forEach(prop => {
    		if (Array.isArray(obj[prop])) newObj[prop] = obj[prop].join(',')
    		else newObj[prop] = obj[prop]
    	})
    	return newObj
    }

    const tagSearch = (search, options) => { return options.filter(elem => elem.name.toLowerCase().includes(search.toLowerCase())) }

    const process = async () => {
    	if (!ready) return
        
    	controller.abort()

    	active = -1
    	searching = true

    	const encoded_query = encode(removeFalsy({...query, tags_inc: query['tags_inc'].map(x => x.name), tags_exc: query['tags_exc'].map(x => x.name)}), '?') !== '?' 
    		? encode(removeFalsy(convertArraysToString({...query, tags_inc: query['tags_inc'].map(x => x.name), tags_exc: query['tags_exc'].map(x => x.name)})), '?')
    		: ''
        
    	window.history.pushState({}, '', `search${encoded_query.replace(new RegExp('%2C', 'g'), ',')}`)

    	const api_query = removeFalsy({
    		name__icontains: query['name'],
    		hentai: query['hentai'],
    		status__in: query['status'].join('+'),
    		tags__tags_id__in: query['tags_inc'].map(x => x.id).join('+'),
    		country__in: query['country'].join('+')
    	})

    	const api_exclude = removeFalsy({
    		tags__tags_id__in: query['tags_exc'].map(x => x.id).join('+')
    	})

    	const api_data = {
    		limit: 18,
    		offset: 0,
    		query: Object.keys(api_query).map(k => `${k}:${api_query[k]}`).join(','),
    		exclude: Object.keys(api_exclude).map(k => `${k}:${api_exclude[k]}`).join(','),
    	}

    	controller = new AbortController()
    	const signal = controller.signal
    	const response = await fetch(`https://api.manga.cat/v1/series${encode(removeFalsy(api_data), '?')}`, {signal})
    	results = await response.json()
    	searching = false
    }

    onMount(() => {
    	if (window.location.search) {
    		const window_query = decode(window.location.search.substring(1))
    		const valid_keys = Object.keys(query)
            
    		Object.keys(window_query).forEach(prop => {
    			if (valid_keys.includes(prop)) {
    				if (['status', 'country'].includes(prop)) {
    					query[prop] = window_query[prop].split(',')
    				} else if (['tags_exc', 'tags_inc'].includes(prop)) {
    					query[prop] = tags.filter(tag => { return window_query[prop].split(',').includes(tag.name) })
    				} else {
    					query[prop] = window_query[prop]
    				}
    			}
    		})
    	}

    	ready = true
    	controller = new AbortController()

    	const initial_query = encode(removeFalsy(query), '?')

    	if (initial_query !== "?") {
    		window.history.pushState({}, '', `search${encode(removeFalsy(query), '?').replace(new RegExp('%2C', 'g'), ',')}`)
    	} else {
    		process(query)
    	}
    })
</script>