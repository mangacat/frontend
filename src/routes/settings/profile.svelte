<div>
    <div class="font-bold mb-2">Description</div>
    <textarea bind:value={description} class="form-textarea dark:bg-gray-700 dark:border-gray-900 mt-1 mb-4 block w-full" rows="5" autocomplete="no"></textarea>
    {#if description != $session.user.description}
        <div in:slide={{ duration: 250 }} class="mb-2">
            <button on:click={saveDescription} class="px-3 py-2 rounded shadow bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800">Save</button>
        </div>
    {/if}
    <div class="font-bold mb-2">Cover</div>
    <div class="mb-4">
        <div class="h-64 w-full rounded bg-cover bg-center relative" style="{$session.user.cover ? `background-image: url('${cdn($session.user.cover)}');` : ''}">
            <div class="h-full w-full bg-gray-900 rounded {$session.user.cover && !cover_uploading ? 'hover:opacity-100 opacity-0' : ''}" style="background-color: rgba(26, 32, 44, .3); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); transition: opacity 0.2s ease 0s;">
                <input bind:files={cover} type="file" id="cover" accept="image/jpeg,image/png,image/gif" class="opacity-0 absolute top-0 left-0 h-0 w-0">
                <label for="cover" class="block flex items-center justify-center uppercase cursor-pointer text-gray-200 font-bold h-full w-full tracking-wide">
                    {#if cover_uploading}
                        <Loading />
                    {:else}
                        Change Cover
                    {/if}
                </label>
            </div>
        </div>
    </div>
    <div class="font-bold mb-2">Mugshot</div>
    <div class="mb-4">
        <div class="h-48 w-48 rounded bg-cover bg-center relative" style="{$session.user.mugshot ? `background-image: url('${cdn($session.user.mugshot)}');` : ''}">
            <div class="h-full w-full bg-gray-900 rounded {$session.user.mugshot && !mugshot_uploading ? 'hover:opacity-100 opacity-0' : ''}" style="background-color: rgba(26, 32, 44, .3); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); transition: opacity 0.2s ease 0s;">
                <input bind:files={mugshot} type="file" id="mugshot" accept="image/jpeg,image/png,image/gif" class="opacity-0 absolute top-0 left-0 h-0 w-0">
                <label for="mugshot" class="block flex items-center justify-center uppercase cursor-pointer text-gray-200 font-bold h-full w-full px-6 text-center leading-snug tracking-wide">
                    {#if mugshot_uploading}
                        <Loading />
                    {:else}
                        Change Mugshot
                    {/if}
                </label>
            </div>
        </div>
    </div>
</div>

<script>
    import { cdn } from 'cdn.js'
    import * as api from 'api.js'
    import { stores } from '@sapper/app'
    import { userSession } from 'stores.js'
    import { slide } from 'svelte/transition'
    import Loading from 'components/Loading.svelte'

    const { session } = stores()

    let cover
    let cover_uploading = false
    let mugshot
    let mugshot_uploading = false
    let description = $session.user.description

    $: if (cover) {
    	upload(cover[0], '?coverimage=true')
    	cover_uploading = true
    }
    $: if (mugshot) {
    	upload(mugshot[0])
    	mugshot_uploading = true
    }

    const saveDescription = async () => {
    	await api.put(`users/${$session.user.id}`, { description }, $session.user.token)
    	await userSession.update()
    }

    const upload = async (file, query = '') => {
    	const formData = new FormData()
    	formData.append('data', file)

    	await fetch(`${api.base}/users/${$session.user.id}${query}`, {
    		method: 'POST',
    		body: formData,
    		headers: {
    			Authorization: `Bearer ${$session.user.token}`
    		}
    	})

    	await userSession.update()
    	mugshot_uploading = false
    	cover_uploading = false
    	cover = null
    	mugshot = null
    }
</script>