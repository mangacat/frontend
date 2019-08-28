<div class="inline-block rounded-lg w-full bg-white dark:bg-gray-700 py-8 shadow-md mb-8">
    <div bind:this={dropzone} class="text-gray-600 dark:text-gray-400 rounded bg-gray-100 border-2 border-dashed border-gray-400 dark:border-gray-900 dark:bg-gray-800 p-4 mx-8 cursor-pointer">
        <div class="flex flex-col justify-center items-center py-8">
            <svg class="w-10 h-10 mb-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2h9a1 1 0 0 1 .7.3l4 4a1 1 0 0 1 .3.7v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm9 2.41V7h2.59L15 4.41zM18 9h-3a2 2 0 0 1-2-2V4H6v16h12V9zm-5 4h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 2 0v2z"/></svg>
            <strong>Drag and drop files</strong>
            <span>or click to select files</span>
        </div>
    </div>
    <div class="{sorted_files.length && 'pt-4'}">
        {#each sorted_files as item, i (item.id)}
            <div class="{item.status} {item.status === 'success' && 'text-green-500'} {item.status === 'uploading' && 'text-yellow-500'} {item.status === 'error' && 'text-red-500'} file mx-8 p-2">
                <svg class="status fill-current h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    {#if item.status === 'success'}
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                    {:else if item.status === 'uploading'}
                        <path d="M13 10v6H7v-6H2l8-8 8 8h-5zM0 18h20v2H0v-2z"/>
                    {:else}
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"/>
                    {/if}
                </svg>
                <div class="meta flex">
                    <span class="flex-grow">{item.name}</span>
                    <span class="text-gray-500 dark:text-gray-400 flex-grow-0">{prettyBytes(item.progress)} / {prettyBytes(item.size)}</span>
                </div>
                <progress class="progress" value="{item.progress}" max="{item.size}"></progress>
                <div class="action">
                    <svg on:click={() => {removeFile(i)}} class="fill-current cursor-pointer h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"/></svg>
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
    .file {
        display: grid;
        grid-template-columns: 2rem 1fr 1.5rem;
        row-gap: 0.5rem;
        column-gap: 1.5rem;
        grid-template-areas: 
            "status meta action"
            "status progress action"
    }

    .meta {
        grid-area: meta;
    }

    .status {
        grid-area: status;
    }

    .progress {
        grid-area: progress;
        @apply rounded-lg w-full h-3;

        &::-webkit-progress-bar {
            @apply bg-gray-300 rounded-lg h-3;

            @screen dark {
                @apply bg-gray-400
            }
        }

        &::-moz-progress-bar {
            @apply rounded-lg h-3;

            .success > & {
                @apply bg-green-500;
            }

            .uploading > & {
                @apply bg-yellow-500;
            }

            .error > & {
                @apply bg-red-500;
            }
        }

        &::-webkit-progress-value {
            @apply rounded-lg h-3;
            
            .success > & {
                @apply bg-green-500;
            }

            .uploading > & {
                @apply bg-yellow-500;
            }

            .error > & {
                @apply bg-red-500;
            }
        }

        &::-ms-fill {
            @apply rounded-lg h-3;
            
            .success > & {
                @apply bg-green-500;
            }

            .uploading > & {
                @apply bg-yellow-500;
            }

            .error > & {
                @apply bg-red-500;
            }
        }
    }
    .action {
        grid-area: action;
    }
</style>

<script>
    import * as api from 'api.js'
    import { onMount } from 'svelte'
    import Droppable from 'droppable'
    import { stores } from '@sapper/app'
    import { chapter } from './chapter.js'
    import prettyBytes from 'pretty-bytes'

    let dropzone
    let sorted_files = []
    const { session } = stores()
    const files = [...$chapter.files]
    	.map(elem => ({
    		file: elem,
    		size: elem.size,
    		name: elem.name,
    		progress: elem.size,
    		status: 'success',
    		id: `${Date.now()}${new Date(elem.updated).getTime()}-${elem.name}`,
    		promise: elem,
    		cancel: () => {}
    	}))

    function updateSortedFiles() {
    	sorted_files = [...files]
    		.map((elem, index) => ({
    			...elem,
    			index
    		}))
    		.sort((a, b) => {
    			if (a.file.name < b.file.name) return -1
    			if (a.file.name > b.file.name) return 1
    			return 0
    		})
    }

    async function removeFile(index) {
    	const removed = files.splice(sorted_files[index].index, 1)[0]
    	if (removed.status !== 'success') {
    		removed.cancel()
    	} else {
    		await api.del(`series_chapters_files/${removed.promise.id}`, $session.user.token)
    	}
    	updateSortedFiles()
    }

    onMount(() => {
    	updateSortedFiles()
        
    	const droppable = new Droppable({
    		element: dropzone,
    		acceptsMultipleFiles: true,
    		dragOverClass: 'shadow-lg'
    	})

    	droppable.onFilesDropped(dfiles => {
    		dfiles = dfiles
    			.filter(({ type }) => ['image/jpeg', 'image/png', 'image/gif'].includes(type))
    			.map(elem => ({
    				file: elem,
    				size: elem.size,
    				name: elem.name,
    				progress: 0,
    				status: 'uploading',
    				id: `${Date.now()}${elem.lastModified}-${elem.name}`,
    				promise: null,
    				cancel: () => {}
    			}))
                
    		const initial = files.length
                
    		files.push(...dfiles)

    		const final = files.length

    		for (let index = initial; index < final; index++) {
    			files[index].promise = new Promise(resolve => {
    				const formData = new FormData()
    				formData.append('data', files[index].file)

    				const xhr = new XMLHttpRequest()
                    
    				files[index].cancel = () => { xhr.abort() }
                    
    				xhr.upload.addEventListener(
    					'progress', 
    					({ lengthComputable, loaded, total }) => {
    						if (lengthComputable) {
    							files[index].progress = (loaded / total) * files[index].file.size
    							updateSortedFiles()
    						}
    					}, 
    					false
    				)

    				xhr.upload.addEventListener(
    					'error',
    					() => {
    						files[index].status = 'error'
    						updateSortedFiles()
    					},
    					false
    				)
                    
    				xhr.addEventListener(
    					'load',
    					() => {
    						if (xhr.status === 200) {
    							const response = JSON.parse(xhr.response)
    							files[index].promise = response.files.filter(x => !$chapter.files.map(elem => JSON.stringify(elem)).includes(JSON.stringify(x)))[0]
    							chapter.set(response)
    							files[index].status = 'success'
    							updateSortedFiles()
    						}
    					},
    					false
    				)
                    
    				xhr.open('POST', `${api.base}/series_chapters/${$chapter.id}`)
                    
    				xhr.setRequestHeader('Authorization', `Bearer ${$session.user.token}`)
    				xhr.setRequestHeader('Cache-Control', null)
    				xhr.setRequestHeader('X-Requested-With', null)
                    
    				xhr.send(formData)
                    
    				resolve()
    			})
    		}
    	})
        
    	return () => { droppable.destroy() }
    })
</script>