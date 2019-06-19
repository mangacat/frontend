<svelte:head>
    <title>Upload - MangaCat</title>
</svelte:head>

<div class="min-h-screen">
    <div class="max-w-2xl flex mx-auto my-24 shadow-md rounded overflow-hidden">
        <div class="w-full bg-white dark:bg-gray-700 px-8 pt-6 pb-8">
            <form bind:this={form_element} on:submit|preventDefault={submit}>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                        Series
                    </label>
                    <input disabled value="{series.name}" type="text" class="appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="chapter_name">
                        Chapter Name
                    </label>
                    <input id="chapter_name" name="title" type="text" class="hover:shadow focus:shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="volume_number">
                        Volume Number
                    </label>
                    <input id="volume_number" name="number_volume" type="number" min="0" class="hover:shadow focus:shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="chapter_number">
                        Chapter Number
                    </label>
                    <input id="chapter_number" name="number_absolute" type="number" min="0" step=".1" class="hover:shadow focus:shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                        Groups
                    </label>
                    <SearchMultipleSelect bind:value={selected_groups} options="{groups}" filterFunction="{groupSearch}" searchProperty="name" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                        Language
                    </label>
                    <select name="language" class="block w-full mt-1 hover:shadow focus:shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200">
                        {#each languages as language}
                            <option>{language}</option>
                        {/each}
                    </select>
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="flex items-center bg-gray-400 hover:bg-gray-300 text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 font-bold py-2 px-4 rounded outline-none focus:shadow-outline dark:focus:bg-gray-900">
                        Create Chapter
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script context="module">
    export async function preload({ params }, { user }) {
    	if (!user) this.redirect(301, '/')

    	const series_res = await this.fetch(`https://api.manga.cat/v1/series/${params.id}`)
    	const series = await series_res.json()
        
    	if (series.status === 500) this.error(404)
        
    	const groups_res = await this.fetch('https://api.manga.cat/v1/groups_scanlation?limit=10000')
    	const groups = await groups_res.json()

    	return { series, groups }
    }
</script>

<script>
    import { goto, stores } from '@sapper/app'
    import { serialize } from 'formee'
    import SearchMultipleSelect from 'components/SearchMultipleSelect.svelte'
    import * as api from 'api.js'


    export let series
    export let groups

    const { session } = stores()
    let selected_groups = []
    let form_element

    const languages = ["Arabic", "Bengali", "Brazilian", "Bulgarian", "Chinese", "Czech", "Danish", "Dutch", "English", "Filipino", "French", "German", "Greek", "Hebrew", "Hungarian", "Indonesian", "Italian", "Japanese", "Korean", "Lithuanian", "Malay", "Persian", "Polish", "Portuguese", "Romanian", "Russian", "Spanish", "Swedish", "Thai", "Turkish", "Vietnamese"]

    const groupSearch = (search, options) => {
    	return options.filter(elem =>
    		elem.name.toLowerCase().startsWith(search.toLowerCase())
    	)
    }

    async function submit() {
    	const data = {
    		series,
    		uploaded: true,
    		groups: selected_groups,
    		...serialize(form_element)
    	}

    	const chapter = await api.post('series_chapters', data, $session.user && $session.user.token)
        
    	goto(`/edit/chapter/${chapter.id.toString(36)}/files`)
    }
</script>