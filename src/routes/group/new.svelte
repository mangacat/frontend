<svelte:head>
    <title>New Group - MangaCat</title>
</svelte:head>

<div class="min-h-screen">
    <div class="max-w-2xl mx-auto mt-24 rounded shadow-md overflow-hidden">
        <div class="w-full bg-white dark:bg-gray-700 p-8">
            <form bind:this={form_element} on:submit|preventDefault={submit}>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="name">
                        Name
                    </label>
                    <input id="name" name="name" class="{errors.name ? 'border-red-600 dark:border-red-600': ''} shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none dark:focus:bg-gray-900 focus:bg-white bg-gray-200" type="text" placeholder="Name" />
                    {#if errors.name}
                        <p class="text-sm text-red-600 dark:text-red-400 mt-1">{errors.name}</p>
                    {/if}
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="description">
                        Description
                    </label>
                    <textarea id="description" name="description" class="shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none dark:focus:bg-gray-900 focus:bg-white bg-gray-200" placeholder="Description" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="url">
                        URL
                    </label>
                    <input id="url" name="url" class="shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none dark:focus:bg-gray-900 focus:bg-white bg-gray-200" type="url" placeholder="URL" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="irc">
                        IRC
                    </label>
                    <input id="irc" name="irc" class="shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none dark:focus:bg-gray-900 focus:bg-white bg-gray-200" type="text" placeholder="irc://server/channel" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="twitter">
                        Twitter
                    </label>
                    <input id="twitter" name="twitter" class="shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none dark:focus:bg-gray-900 focus:bg-white bg-gray-200" type="text" placeholder="https://twitter.com/handle" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="facebook">
                        Facebook
                    </label>
                    <input id="facebook" name="facebook" class="shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none dark:focus:bg-gray-900 focus:bg-white bg-gray-200" type="text" placeholder="https://www.facebook.com/page" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="discord">
                        Discord
                    </label>
                    <input id="discord" name="discord" class="shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight focus:outline-none dark:focus:bg-gray-900 focus:bg-white bg-gray-200" type="text" placeholder="https://discord.gg/invitecode" />
                </div>
                <div class="flex items-center justify-end">
                    <button class="bg-gray-400 hover:bg-gray-300 text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 font-bold py-2 px-4 rounded focus:outline-none dark:focus:bg-gray-900" type="submit">
                        Create Group
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script context="module">
	export async function preload(_, { user }) {
		if (!user) this.redirect(301, '/')
	}
</script>

<script>
    import { validate, serialize } from 'formee'
    import { slugify } from 'utils'
    import { goto, stores } from '@sapper/app'
    import * as api from 'api.js'

    let form_element
    let errors = {}

    const { session } = stores()

    const form_rules = {
    	name(value) {
    		if (!value) return 'Required'
    		return !value.includes(' ') || 'Cannot have whitespaces'
    	}
    }

    async function submit() {
    	errors = validate(form_element, form_rules)

    	if (form_element.isValid) {
    		const data = serialize(form_element)

    		const group = await api.post('groups_scanlation', data, $session.user.token)
            
    		goto(`/group/${group.id}/${slugify(group.name)}`)
    	}
    }
</script>