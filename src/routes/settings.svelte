<svelte:head>
    <title>Settings - MangaCat</title>
</svelte:head>

<div class="max-w-3xl mx-auto">
    <h1 class="font-semibold text-xl px-5 pt-1 mt-4">Account Settings</h1>

    <div class="rounded-lg overflow-hidden shadow-md mt-4">
        <div class="py-4 px-5 bg-white dark:bg-gray-700">
            <h2>Basic Information</h2>
            <h3 class="text-sm">Set your login preferences, help us personalize your experience, and make big account changes here.</h3>
        </div>
        <div class="py-4 px-5 bg-gray-100 dark:bg-gray-800">
            <label class="block sm:flex my-3">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Email address</span>
                <input bind:value={email} class="w-full sm:w-2/3 form-input mt-1 block" placeholder="johndoe@example.com">
            </label>
            <label class="block sm:flex my-3">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Language</span>
                <input bind:value={language} class="w-full sm:w-2/3 form-input mt-1 block" placeholder="English">
            </label>
        </div>
    </div>

    <div class="rounded-lg overflow-hidden shadow-md mt-8">
        <div class="py-4 px-5 bg-white dark:bg-gray-700">
            <h2>Profile</h2>
            <h3 class="text-sm">Public information visible to other users on the site.</h3>
        </div>
        <div class="py-4 px-5 bg-gray-100 dark:bg-gray-800">
            <label class="block sm:flex my-3">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Mugshot</span>
                <div class="w-full sm:w-2/3 mt-1 sm:mt-0 flex">
                    <img alt="mugshot image" class="w-16 h-16 object-cover object-center rounded-full" src="https://github.com/daszgfz.png" />
                    <div class="flex items-center ml-4 relative">
                        <input type="file" accept="image/jpeg,image/png,image/gif" class="opacity-0 absolute top-0 left-0 h-0 w-0">
                        <div class="bg-gray-300 hover:bg-gray-200 font-bold text-sm py-1 px-3 rounded cursor-pointer">Change</div>
                    </div>
                </div>
            </label>
            <label class="block sm:flex my-3">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Cover</span>
                <div class="w-full sm:w-2/3 mt-1 sm:mt-0 flex">
                    <img alt="cover image" class="w-64 h-36 object-cover object-center rounded-lg" src="https://w.wallhaven.cc/full/4v/wallhaven-4v7zrm.png" />
                    <div class="flex items-center ml-4 relative">
                        <input type="file" accept="image/jpeg,image/png,image/gif" class="opacity-0 absolute top-0 left-0 h-0 w-0">
                        <div class="bg-gray-300 hover:bg-gray-200 font-bold text-sm py-1 px-3 rounded cursor-pointer">Change</div>
                    </div>
                </div>
            </label>
            <label class="block sm:flex my-3">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Username</span>
                <input bind:value={username} class="w-full sm:w-2/3 form-input mt-1 block" placeholder="johndoe">
            </label>
            <label class="block sm:flex my-3">
                <span class="sm:inline-flex sm:w-1/3 font-bold mt-3 text-sm justify-end pr-4">Description</span>
                <textarea bind:value={description} class="form-textarea mt-1 block w-full sm:w-2/3" rows="3"></textarea>
            </label>
        </div>
    </div>

    <div class="rounded-lg overflow-hidden shadow-md mt-8 mb-6">
        <div class="py-4 px-5 bg-white dark:bg-gray-700">
            <h2>Danger Zone</h2>
            <h3 class="text-sm">These options can have unintended side effects.</h3>
        </div>
        <div class="py-4 px-5 bg-gray-100 dark:bg-gray-800">
            <label class="block sm:flex my-3">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Delete account</span>
                <button class="text-white bg-red-500 py-2 px-4 rounded">Delete account</button>
            </label>
        </div>
    </div>
</div>

<div class="fixed z-100 bottom-0 inset-x-0 bg-white dark:bg-gray-700 dark:border-gray-900 border-t border-gray-300">
    <div class="max-w-3xl mx-auto my-4 flex justify-end">
        <button class="bg-gray-300 hover:bg-gray-200 font-semibold py-2 px-4 rounded mr-4" type="button">Cancel</button>
        <button class="bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold py-2 px-4 rounded" type="button">Save</button>
    </div>
</div>

<script context="module">
	export async function preload(_, { user }) {
		if (!user) this.redirect(301, '/')
	}
</script>

<script>
    import { onMount } from 'svelte'
    import { stores } from '@sapper/app'

    const { session } = stores()

    let email = $session.user.email || ''
    let language = ''
    let username = $session.user.username || ''
    let description = $session.user.description || ''

    onMount(() => {
    	document.body.classList.add('mb-16')

    	return () => { document.body.classList.remove('mb-16') }
    })
</script>