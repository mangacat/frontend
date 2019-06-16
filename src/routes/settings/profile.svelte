<div class="profile">
    <div class="text-right font-bold">Username</div>
    <div>{$session.user.username}</div>
    <div class="text-right font-bold">Email</div>
    <div>{$session.user.email}</div>
    <div class="text-right font-bold">Description</div>
    <div>{$session.user.description}</div>
    <div class="text-right font-bold">Cover</div>
    <div>
        <div class="h-64 w-full rounded bg-cover bg-center relative" style="{$session.user.cover ? `background-image: url('${cdn($session.user.cover)}');` : ''}">
            <div class="h-full w-full bg-gray-900 rounded {$session.user.cover && !cover_uploading ? 'hover:opacity-100 opacity-0' : ''}" style="background-color: rgba(26, 32, 44, .4); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); transition: opacity 0.2s ease 0s;">
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
    <div class="text-right font-bold">Mugshot</div>
    <div>
        <div class="h-48 w-48 rounded bg-cover bg-center relative" style="{$session.user.mugshot ? `background-image: url('${cdn($session.user.mugshot)}');` : ''}">
            <div class="h-full w-full bg-gray-900 rounded {$session.user.mugshot && !mugshot_uploading ? 'hover:opacity-100 opacity-0' : ''}" style="background-color: rgba(26, 32, 44, .4); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); transition: opacity 0.2s ease 0s;">
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

<style lang="postcss">
    .profile {
        display: grid;
        grid-template-columns: 8rem auto;
        gap: 2rem;
    }
</style>

<script>
    import { stores } from '@sapper/app'
    import { cdn } from 'cdn.js'
    import { userSession } from 'stores.js'
    import Loading from '../../components/Loading.svelte'

    export let user

    let cover
    let cover_uploading = false
    let mugshot
    let mugshot_uploading = false

    const { session } = stores()

    $: if (cover) {
    	upload(cover[0], '?coverimage=true')
    	cover_uploading = true
    }
    $: if (mugshot) {
    	upload(mugshot[0])
    	mugshot_uploading = true
    }

    const upload = async (file, query = '') => {
    	const formData = new FormData()
    	formData.append('data', file)

    	await fetch(`https://api.manga.cat/v1/users/${$session.user.id}${query}`, {
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