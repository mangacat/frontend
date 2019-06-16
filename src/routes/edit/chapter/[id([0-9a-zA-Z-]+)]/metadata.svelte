<form bind:this={form_element} class="metadata" on:submit|preventDefault={submit}>
    <div class="font-bold sm:flex justify-end items-center">Series</div>
    <input disabled value="{$chapter.series.name}" type="text" class="appearance-none border border-gray-300 dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-900 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-300" />
    <div class="font-bold sm:flex justify-end items-center">Chapter Name</div>
    <input value={$chapter.title} name="title" type="text" class="hover:shadow focus:shadow appearance-none border border-gray-300 dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
    <div class="font-bold sm:flex justify-end items-center">Volume Number</div>
    <input value={$chapter.number_volume} name="number_volume" type="number" min="0" class="hover:shadow focus:shadow appearance-none border border-gray-300 dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
    <div class="font-bold sm:flex justify-end items-center">Chapter Number</div>
    <input value={$chapter.number_absolute} name="number_absolute" type="number" min="0" step=".1" class="hover:shadow focus:shadow appearance-none border border-gray-300 dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
    <div class="font-bold sm:flex justify-end items-center">Language</div>
    <select value={$chapter.language} name="language" class="block w-full mt-1 hover:shadow focus:shadow appearance-none border border-gray-300 dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200">
        {#each languages as language}
            <option>{language}</option>
        {/each}
    </select>
    <div class="flex justify-end span-2">
        <button type="submit" class="flex items-center bg-gray-400 hover:bg-gray-300 text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 font-bold py-2 px-4 rounded outline-none focus:shadow-outline dark:focus:bg-gray-900">
            Update Chapter
        </button>
    </div>
</form>

<style lang="postcss">
    .metadata {
        display: grid;
        gap: 2rem;

        @screen sm {
            grid-template-columns: 9rem auto;
        }
    }

    .span-2 {
        @screen sm {
            grid-column-end: span 2;
        }
    }
</style>

<script>
    import { stores } from '@sapper/app'
    import { serialize } from 'formee'
    import * as api from 'api.js'
    import { chapter } from './chapter.js'

    const { session } = stores()

    let form_element
    const languages = ["Arabic", "Bengali", "Brazilian", "Bulgarian", "Chinese", "Czech", "Danish", "Dutch", "English", "Filipino", "French", "German", "Greek", "Hebrew", "Hungarian", "Indonesian", "Italian", "Japanese", "Korean", "Lithuanian", "Malay", "Persian", "Polish", "Portuguese", "Romanian", "Russian", "Spanish", "Swedish", "Thai", "Turkish", "Vietnamese"]

    async function submit() {
    	const data = {
    		series: $chapter.series,
    		uploaded: true,
    		...serialize(form_element)
    	}

    	const res = await api.put(`series_chapters/${$chapter.id}`, data, $session.user && $session.user.token)
    	chapter.set(res)
    }
</script>