<div>
    <div id="dropzone" class="inline-block rounded-lg w-full bg-white dark:bg-gray-700 p-4 shadow-md cursor-pointer mb-8">
        <div class="dz-message flex flex-col justify-center items-center py-8">
            <svg class="w-10 h-10 mb-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2h9a1 1 0 0 1 .7.3l4 4a1 1 0 0 1 .3.7v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm9 2.41V7h2.59L15 4.41zM18 9h-3a2 2 0 0 1-2-2V4H6v16h12V9zm-5 4h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 2 0v2z"/></svg>
            <strong>Drag and drop files</strong>
            <span>or click to select files</span>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 relative mb-4">
        {#if loading}
            <div class="absolute inset-0 flex items-center justify-center" style="background-color: rgba(26, 32, 44, .4);">
                <Loading />
            </div>
        {/if}
        {#if $chapter.files.length === 0}
            <div class="flex items-center justify-center p-2 my-2">
                <svg class="fill-current w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                No Files!
            </div>
        {:else}
            <div class="flex items-center mb-2 mx-2">
                <div class="font-bold text-lg flex-grow">
                    Files
                </div>
                <button class="px-2 py-1 hover:text-gray-600 dark:hover:text-gray-400 flex items-center" on:click={() => { if (edit) { process() } edit = !edit }}>
                    <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        {#if edit}
                            <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"/>
                        {:else}
                            <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"/>
                        {/if}
                    </svg>
                    <span class="ml-1">{edit ? 'Done' : 'Edit'}</span>
                </button>
            </div>
            <div bind:this={list}>
                {#each $chapter.files as { uuid, name, id }, i}
                    <div class="sortable-item bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 mx-2 pr-4" style="{edit ? 'grid-template-columns: 3.5rem 2rem 1fr 2rem;' : ''}">
                        <div class="flex items-center font-bold tabular-nums {!edit ? 'justify-end' : ''}">
                            {#if edit}
                                <div class="flex-grow">
                                    <svg class="h-4 w-4 cursor-move fill-current sortable-handle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M14 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm6 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm-6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm6 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm-6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/>
                                    </svg>
                                </div>
                            {/if}
                            {i + 1}
                        </div>
                        <div class="w-8 h-8 bg-center bg-cover rounded" 
                        style="background-image: url('{cdn(`https://cdn.manga.cat/chapters/${$chapter.hash}/${uuid}`, { resize: '64, 64' })}');" />
                        <div class="flex items-center min-w-0 truncate">{name}</div>
                        <div class="flex justify-end items-center">
                            {#if edit}
                                <button class="hover:text-gray-600 dark:hover:text-gray-400" on:click={() => deleteFile(id)}>
                                    <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/></svg>
                                </button>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style lang="postcss">
    .sortable-item {
        display: grid;
        grid-template-columns: 2rem 2rem 1fr 2rem;
        gap: 2rem;
    }

    .sortable-item:not(:last-child) {
        @apply border-b pb-2 mb-2;
    }
</style>

<script>
    import { onMount } from 'svelte'
    import { stores } from '@sapper/app'
    import { chapter } from './chapter.js'
    import * as api from 'api.js'
    import { cdn } from 'cdn.js'
    import Loading from 'components/Loading.svelte'

    let list
    let dropzone 
    let edit = false
    let loading = false
    const { session } = stores()

    const move = (items, oldIndex, newIndex) => {
    	const itemRemovedArray = [
    		...items.slice(0, oldIndex),
    		...items.slice(oldIndex + 1, items.length)
    	]
            
    	return [
    		...itemRemovedArray.slice(0, newIndex),
    		items[oldIndex],
    		...itemRemovedArray.slice(newIndex, itemRemovedArray.length)
    	]
    }

    const changeEditState = () => {
    	edit ? process() : setupSortable()
    	edit = !edit
    }

    const setupSortable = () => {}

    const deleteFile = async (id) => {
    	loading = true
    	await api.del(`series_chapters_files/${id}`, $session.user.token)
    	const res = await api.get(`series_chapters/${$chapter.id}?edit=true`, $session.user.token)
    	chapter.set(res)
    	loading = false
    }


    const process = () => {
    	console.log('save')
    }

    const sort = async () => {
    	const files = [ ...$chapter.files ]
    	files.sort((a, b) => {
    		if (a.name < b.name) return -1
    		if (a.name > b.name) return 1
    		return 0
    	})
        
    	const res = await api.put(`series_chapters/${$chapter.id}/order`, files.map(x => x.id), $session.user.token)
    	chapter.set(res)
    }

    onMount(async () => {
    	const Dropzone = (await import('dropzone')).default

    	dropzone = new Dropzone('div#dropzone', { // eslint-disable-line no-undef
    		acceptedFiles: 'image/jpeg,image/png,image/gif',
    		parallelUploads: 1,
    		paramName: 'data',
    		url: `https://api.manga.cat/v1/series_chapters/${$chapter.id}`,
    		previewsContainer: false,
    		headers: {
    			Authorization: `Bearer ${$session.user.token}`,
    			'Cache-Control': null,
    			'X-Requested-With': null
    		}
    	})

    	dropzone.on('addedfile', () => {
    		loading = true
    	})
            
    	dropzone.on('success', (_, response) => {
    		chapter.set(response)
    	})
            
    	dropzone.on('queuecomplete', () => {
    		loading = false
    	})

    	const Sortable = (await import('@shopify/draggable/lib/sortable')).default

    	const sortable = new Sortable(list, {
    		draggable: '.sortable-item',
    		handle: '.sortable-handle',
    		mirror: {
    			constrainDimensions: true
    		}
    	})

    	sortable.on('sortable:stop', async ({ oldIndex, newIndex }) => {
    		const res = await api.put(`series_chapters/${$chapter.id}/order`, move($chapter.files, oldIndex, newIndex).map(x => x.id), $session.user.token)
    		chapter.set(res)
    	})
    })
</script>