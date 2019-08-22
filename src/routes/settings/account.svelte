<div>
    <form bind:this={form_element} on:submit|preventDefault={submit}>
        <h1>Username</h1>
        <input name="username" value={$session.user.username} class="form-input dark:bg-gray-700 dark:border-gray-900 mt-1 mb-2 block w-full">
        <h1>Email</h1>
        <input name="email" value={$session.user.email} class="form-input dark:bg-gray-700 dark:border-gray-900 mt-1 mb-2 block w-full">
        <h1>Current Password</h1>
        <input name="old_password" type="password" class="form-input dark:bg-gray-700 dark:border-gray-900 mt-1 mb-2 block w-full">
        <h1>New Password</h1>
        <input name="password" type="password" class="form-input dark:bg-gray-700 dark:border-gray-900 mt-1 mb-2 block w-full">
        <h1>Confirm New Password</h1>
        <input name="confirmed_password" type="password" class="form-input dark:bg-gray-700 dark:border-gray-900 mt-1 mb-2 block w-full">

        <div in:slide={{ duration: 200 }} class="mb-2 pt-1">
            <button type="submit" class="px-3 py-2 rounded shadow bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800">Save</button>
        </div>
    </form>

    <label class="mt-8 pt-8 border-t-2 border-gray-300 dark:border-gray-700 block font-bold">Delete User Account</label>
    <p class="mt-1">WARNING: This action is irreversible! All your data will be deleted permanently!</p>
    <button class="px-4 py-2 mt-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-red-100 rounded" on:click={() => modal = true}>Delete Account</button>
</div>

{#if modal}
    <div class="fixed inset-0 flex items-center justify-center z-100">
        <div transition:fade="{{ duration: 250 }}" class="absolute inset-0 bg-black opacity-25" on:click={() => modal = false}></div>
        <div transition:fly="{{ y: -20, duration: 250 }}" class="relative">
            <div class="max-w-lg w-full bg-white dark:bg-gray-700 rounded-lg shadow-2xl px-6 py-6">
                <h2 class="font-semibold text-2xl leading-tight border-b-2 border-gray-200 pb-4">Delete account</h2>
                <p class="mt-4">Are you absolutely sure you want to delete your account? This action cannot be undone and your data will be deleted permanently.</p>
                <div class="mt-6">
                    <button class="px-4 py-2 mt-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-red-100 rounded" on:click={del}>Delete Account</button>
                    <button class="ml-4 px-4 py-2 font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 border rounded focus:outline-none focus:shadow-outline" on:click={() => modal = false}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
{/if}

<script>
    import * as api from 'api.js'
    import { serialize } from 'formee'
    import { stores } from '@sapper/app'
    import { fade, fly, slide } from 'svelte/transition'
    
    const { session } = stores()

    let modal = false
    let form_element

    const submit = async () => {
    	await api.put(`users/${$session.user.id}`, serialize(form_element), $session.user.token)
    }

    const del = async () => {
    	await api.del(`users/${$session.user.id}`, $session.user.token)
    }
</script>