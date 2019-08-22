<div>
    <h1 class="font-bold">KissManga</h1>
    <h2>Follow the instructions at <a class="underline hover:no-underline" href="http://mdbookmarkimport.rn86.net" target="_blank" rel="noreferrer noopener nofollow">http://mdbookmarkimport.rn86.net</a>. Copy the resultant JSON and paste below.</h2>
    <div class="relative">
        {#if submitting === 'kissmanga'}
            <div class="absolute inset-0 flex items-center justify-center rounded" style="background-color: rgba(26, 32, 44, .4); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);">
                <Loading />
            </div>
        {/if}
        <textarea bind:value={kissmanga} class="form-textarea dark:bg-gray-700 dark:border-gray-900 mt-1 mb-2 block w-full" rows="5" autocomplete="no"></textarea>
    </div>
    {#if !submitting && kissmanga}
        <div in:slide={{ duration: 200 }} class="mb-2">
            <button on:click={KMImport} class="px-3 py-2 rounded shadow bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800">Import</button>
        </div>
    {/if}

    <h1 class="font-bold mt-4">MangaDex</h1>
    <h2>Go to your MDList and change it to Simple List Mode. Copy the source code and paste it below. For most browsers, pressing <code>right click -> View Page Source</code> should bring up the Source Code. (This must be repeated for each page of follows you have).</h2>
    <div class="relative">
        {#if submitting === 'mangadex'}
            <div class="absolute inset-0 flex items-center justify-center rounded" style="background-color: rgba(26, 32, 44, .4); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);">
                <Loading />
            </div>
        {/if}
        <textarea bind:value={mangadex} class="form-textarea dark:bg-gray-700 dark:border-gray-900 mt-1 mb-2 block w-full" rows="5" autocomplete="no"></textarea>
    </div>
    {#if !submitting && mangadex}
        <div in:slide={{ duration: 200 }} class="mb-2">
            <button on:click={MDImport} class="px-3 py-2 rounded shadow bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800">Import</button>
        </div>
    {/if}

    <h1 class="font-bold mt-4">Batoto</h1>
    <h2>Go to <a class="underline hover:no-underline" href="https://vatoto.com/myfollows" target="_blank" rel="noreferrer noopener nofollow">https://vatoto.com/myfollows</a> and export as JSON. Paste the contents of the file below.</h2>
    <div class="relative">
        {#if submitting === 'batoto'}
            <div class="absolute inset-0 flex items-center justify-center rounded" style="background-color: rgba(26, 32, 44, .4); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);">
                <Loading />
            </div>
        {/if}
        <textarea bind:value={batoto} class="form-textarea dark:bg-gray-700 dark:border-gray-900 mt-1 mb-2 block w-full" rows="5" autocomplete="no"></textarea>
    </div>
    {#if !submitting && batoto}
        <div in:slide={{ duration: 200 }} class="mb-2">
            <button on:click={BatotoImport} class="px-3 py-2 rounded shadow bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800">Import</button>
        </div>
    {/if}
</div>

<script>
    import * as api from 'api.js'
    import { stores } from '@sapper/app'
    import { slide } from 'svelte/transition'
    import Loading from 'components/Loading.svelte'

    let kissmanga = ''
    let mangadex = ''
    let batoto = ''
    let submitting = ''

    const { session } = stores()

    const save = async (data) => {
    	await api.post('following/import', data, $session.user.token)
    	submitting = ''
    }

    const KMImport = async () => {
    	submitting = 'kissmanga'
    	await save(JSON.parse(kissmanga).map(entry => ({ id: entry.comic_id, status: 'Reading', rating: null })))
    	kissmanga = ''
    }

    const BatotoImport = async () => {
    	submitting = 'batoto'
    	await save(JSON.parse(batoto).map(entry => ({ id: entry.comic_id, status: 'Reading', rating: null })))
    	batoto = ''
    }

    const MDImport = async () => {
    	submitting = 'mangadex'
    	const parser = new DOMParser()
    	const el = parser.parseFromString(mangadex, 'text/html')
        
    	const entries = el.getElementsByClassName('manga-entry row m-0 border-bottom')
    	const tmp = []

    	for (const entry of entries) {
    		tmp.push({
    			id: entry.getAttribute('data-id'),
    			status: entry.getElementsByClassName('btn-group btn-group-xs ')[0].getElementsByClassName('d-none d-xl-inline')[0].textContent.trim(),
    			rating: parseInt(entry.getElementsByClassName('p-1 col text-center text-primary')[0].getElementsByClassName('btn btn-primary dropdown-toggle')[0].textContent.trim()) || null
    		})
    	}
        
    	await save([...new Set(tmp)])
    	mangadex = ''
    }
</script>