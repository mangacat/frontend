<svelte:head>
    <title>Settings - MangaCat</title>
</svelte:head>

<Notifications bind:this={notifications} />

<div class="max-w-3xl mx-auto">
    <h1 class="font-semibold text-xl px-5 pt-1 mt-4">Account Settings</h1>

    <div class="rounded-lg overflow-hidden shadow-lg mt-4">
        <div class="py-4 px-5 bg-white dark:bg-gray-700">
            <h2>Basic Information</h2>
            <h3 class="text-sm">Set your login preferences, help us personalize your experience, and make big account changes here.</h3>
        </div>
        <div class="py-4 px-5 bg-gray-100 dark:bg-gray-800">
            <label class="block sm:flex my-4">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Email address</span>
                <Input bind:value={email} class="w-full sm:w-2/3" type="email" placeholder="johndoe@example.com" />
            </label>
            <label class="block sm:flex my-4">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Language</span>
                <Input bind:value={language} class="w-full sm:w-2/3" placeholder="English" />
            </label>
        </div>
    </div>

    <div class="rounded-lg overflow-hidden shadow-lg mt-8">
        <div class="py-4 px-5 bg-white dark:bg-gray-700">
            <h2>Security</h2>
            <h3 class="text-sm">Make changes to increase your account security.</h3>
        </div>
        <div class="py-4 px-5 bg-gray-100 dark:bg-gray-800">
            <label class="block sm:flex my-4">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Old password</span>
                <Input bind:value={oldPassword} class="w-full sm:w-2/3" type="password" placeholder="••••••••" />
            </label>
            <label class="block sm:flex my-4">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">New password</span>
                <Input bind:value={newPassword} class="w-full sm:w-2/3" type="password" placeholder="••••••••" />
            </label>
            <label class="block sm:flex my-4">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Confirm new password</span>
                <Input bind:value={newPasswordConfirm} class="w-full sm:w-2/3" type="password" placeholder="••••••••" />
            </label>
        </div>
    </div>

    <div class="rounded-lg overflow-hidden shadow-lg mt-8">
        <div class="py-4 px-5 bg-white dark:bg-gray-700">
            <h2>Profile</h2>
            <h3 class="text-sm">Public information visible to other users on the site.</h3>
        </div>
        <div class="py-4 px-5 bg-gray-100 dark:bg-gray-800">
            <label class="block sm:flex my-4">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Mugshot</span>
                <div class="w-full sm:w-2/3 mt-1 sm:mt-0 flex">
                    {#if mugshot.src.length !== 0}
                        <img alt="mugshot image" class="w-16 h-16 object-cover object-center rounded-full cursor-pointer mr-4" src="{mugshot.src}" />
                    {/if}
                    <div class="flex items-center relative cursor-pointer">
                        <input bind:this={mugshotInput} on:change={({ target: { files } }) => fileInput('mugshot', files[0])} type="file" accept="image/jpeg,image/png,image/gif" class="opacity-0 absolute top-0 left-0 h-0 w-0">
                        <PrimaryButton on:click={() => mugshotInput.click()} class="dark:bg-gray-700">
                            Upload
                        </PrimaryButton>
                    </div>
                </div>
            </label>
            <label class="block sm:flex my-4">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Cover</span>
                <div class="w-full sm:w-2/3 mt-1 sm:mt-0 flex">
                    {#if cover.src.length !== 0}
                        <img alt="cover image" class="w-64 h-32 object-cover object-center rounded-lg cursor-pointer mr-4" src="{cover.src}" />
                    {/if}
                    <div class="flex items-center relative cursor-pointer">
                        <input bind:this={coverInput} on:change={({ target: { files } }) => fileInput('cover', files[0])} id="cover" type="file" accept="image/jpeg,image/png,image/gif" class="opacity-0 absolute top-0 left-0 h-0 w-0">
                        <PrimaryButton on:click={() => coverInput.click()} class="dark:bg-gray-700">
                            Upload
                        </PrimaryButton>
                    </div>
                </div>
            </label>
            <label class="block sm:flex my-4">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Username</span>
                <div class="flex w-full sm:w-2/3">
                    <div class="form-input border-r-0 rounded-r-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-900 bg-gray-100 text-gray-700">manga.cat/user/{$session.user.id}/</div>
                    <Input bind:value={username} class="rounded-l-none" placeholder="johndoe" />
                </div>
            </label>
            <label class="block sm:flex my-4">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Description</span>
                <Textarea bind:value={description} class="w-full sm:w-2/3" rows="3" />
            </label>
        </div>
    </div>

    <div class="rounded-lg overflow-hidden shadow-lg mt-8 mb-6">
        <div class="py-4 px-5 bg-white dark:bg-gray-700">
            <h2>Danger Zone</h2>
            <h3 class="text-sm">These options can have unintended side effects.</h3>
        </div>
        <div class="py-4 px-5 bg-gray-100 dark:bg-gray-800">
            <label class="block sm:flex my-4">
                <span class="sm:inline-flex sm:w-1/3 font-bold items-center text-sm justify-end pr-4">Delete account</span>
                    <PrimaryButton class="dark:bg-gray-700">
                        Delete account
                    </PrimaryButton>
            </label>
        </div>
    </div>
</div>

<div class="fixed z-100 bottom-0 inset-x-0 bg-white dark:bg-gray-700 dark:border-gray-900 border-t border-gray-300">
    <div class="max-w-3xl mx-4 md:mx-auto my-4 flex justify-end">
        <SecondaryButton class="mr-4" on:click={() => {goto('/')}}>
            Cancel
        </SecondaryButton>
        <PrimaryButton on:click|once={submit}>
            Save
        </PrimaryButton>
    </div>
</div>

<script context="module">
	export async function preload(_, { user }) {
		if (!user) this.redirect(301, '/')
	}
</script>

<script>
    import { onMount } from 'svelte'
    import { stores, goto } from '@sapper/app'
    import Notifications from 'components/Notifications.svelte'
    import PrimaryButton from 'components/Buttons/Primary.svelte'
    import SecondaryButton from 'components/Buttons/Secondary.svelte'
    import Input from 'components/Inputs/Input.svelte'
    import Textarea from 'components/Inputs/Textarea.svelte'

    let notifications

    const { session } = stores()

    let email = $session.user.email
    let language = ''
    let username = $session.user.username
    let description = $session.user.description
    let mugshot = {
    	src: 'https://github.com/daszgfz.png',
    	file: null
    }
    let mugshotInput
    let cover = {
    	src: 'https://w.wallhaven.cc/full/4v/wallhaven-4v7zrm.png',
    	file: null
    }
    let coverInput
    let oldPassword
    let newPassword
    let newPasswordConfirm

    function readFileAsync(img) {
    	return new Promise((resolve, reject) => {
    		img.size > 3000000 && reject(new Error(`Selected image is too big (3 Mb max)`))

    		const reader = new FileReader()
    		reader.addEventListener('load', event => {
    			resolve(event.target.result)
    		})
    		reader.addEventListener('error', reject)
    		reader.readAsDataURL(img)
    	})
    }

    async function fileInput(variable, file) {
    	try {
    		const src = await readFileAsync(file)
    		variable === 'cover' && (cover = { src, file })
    		variable === 'mugshot' && (mugshot = { src, file })
    	} catch ({ message }) {
    		notifications.error(message)
    	}
    }

    function verifyForm() {
    	return new Promise((resolve, reject) => {
    		oldPassword.length === 0 && reject(new Error(`Please enter your old password`))
    		newPassword !== newPasswordConfirm && reject(new Error(`New passwords don't match`))
    		!/.+@.+\..+/.test(email) && reject(new Error(`Invalid email`))
    		username.indexOf(' ') > 0 && reject(new Error(`Username cannot have whitespaces`))
    		username.length === 0 && reject(new Error(`Username cannot be empty`))
            
    		resolve()
    	})
    }

    async function submit() {
    	try {
    		await verifyForm()
            
    		const formData = new FormData()
    		Object
    			.entries({
    				...(email !== $session.user.email && { email }),
    				language,
    				...(username !== $session.user.username && { username }),
    				...(description !== $session.user.description && { description }),
    				...(mugshot.file !== null && { mugshot: mugshot.file }),
    				...(cover.file !== null && { cover: cover.file }),
    				...(newPassword.length > 0 && { old_password: oldPassword, password: newPassword, confirmed_password: newPasswordConfirm })
    			})
    			.forEach(([key, value]) => formData.append(key, value))

    		const xhr = new XMLHttpRequest()

    		xhr.addEventListener('load', () => {
    			if (xhr.status === 200) {
    				notifications.success('Settings saved successfully')
    				console.log(JSON.parse(xhr.response))
    			}
    		})

    		xhr.open('POST', `https://httpbin.org/post`)

    		xhr.send(formData)            
    	} catch ({ message }) {
    		notifications.error(message)
    	}
    }

    onMount(() => {
    	document.body.classList.add('mb-16')

    	return () => document.body.classList.remove('mb-16')
    })
</script>