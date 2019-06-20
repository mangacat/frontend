<div>
    <div id="dropzone" class="inline-block rounded-lg w-full bg-white dark:bg-gray-700 p-4 shadow-lg cursor-pointer mb-8">
        <div class="dz-message flex flex-col justify-center items-center py-8">
            <svg class="w-10 h-10 mb-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2h9a1 1 0 0 1 .7.3l4 4a1 1 0 0 1 .3.7v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm9 2.41V7h2.59L15 4.41zM18 9h-3a2 2 0 0 1-2-2V4H6v16h12V9zm-5 4h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 2 0v2z"/></svg>
            <strong>Drag and drop files</strong>
            <span>or click to select files</span>
        </div>
    </div>
    <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 relative">
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
            {#each $chapter.files as { uuid, name, id }, i}
                <div class="chapter border-gray-200 dark:border-gray-600 mx-2 pr-4">
                    <div class="flex justify-end items-center font-bold">{i + 1}</div>
                    <div class="w-8 h-8 bg-center bg-cover rounded" 
                    style="background-image: url('{cdn(`https://cdn.manga.cat/chapters/${$chapter.hash}/${uuid}`, { resize: '64, 64' })}');" />
                    <div class="flex items-center min-w-0 truncate">{name}</div>
                    <div class="text-right">
                        <button class="hover:text-gray-600 dark:hover:text-gray-400 p-1" on:click={() => deleteFile(id)}>
                            <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/></svg>
                        </button>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style lang="postcss">
    .chapter {
        display: grid;
        grid-template-columns: 2rem 2rem 1fr 6rem;
        gap: 2rem;
    }

    .chapter:not(:last-child) {
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

    let dropzone 
    const { session } = stores()
    let loading = false

    const deleteFile = async (id) => {
    	loading = true
    	await api.del(`series_chapters_files/${id}`, $session.user.token)
    	const res = await api.get(`series_chapters/${$chapter.id}?edit=true`, $session.user.token)
    	chapter.set(res)
    	loading = false
    }

    onMount(() => {
    	const e = document.createElement('script')
    	e.src = 'https://unpkg.com/dropzone@5.5.1/dist/min/dropzone.min.js'
    	document.head.appendChild(e)

    	e.onload = () => {
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
    	}

    	return () => { document.head.removeChild(e) }
    })
</script>