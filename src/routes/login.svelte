<svelte:head>
    <title>Login - MangaCat</title>
</svelte:head>

<div class="min-h-screen">
    <div class="w-full max-w-sm lg:max-w-2xl lg:flex mx-auto mt-24 shadow-md rounded overflow-hidden mx-2">
        <div class="hidden lg:block w-1/2 bg-cover bg-center" style="{$medQ ? `background-image: url(${cdn(img, { w: 1000 })});` : '' }" />
        <div class="lg:w-1/2 bg-white dark:bg-gray-700 px-8 pt-6 pb-8">
            <form bind:this={form_element} on:submit|preventDefault={submit}>
                {#if errors.response}
                    <div class="mb-4 text-center text-red-600">
                        {errors.response}
                    </div>
                {/if}
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input id="email" name="email" type="text" class="{errors.email ? 'border-red-600 dark:border-red-600': ''} hover:shadow focus:shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
                    {#if errors.email}
                        <p class="text-sm text-red-600 dark:text-red-400 mt-1">{errors.email}</p>
                    {/if}
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <div class="relative">
                        <input id="password" bind:this={password_elem} name="password" type="password" class="{errors.password ? 'border-red-600 dark:border-red-600': ''} hover:shadow focus:shadow appearance-none border dark:border-gray-900 rounded w-full py-2 pl-3 pr-10 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
                        <div class="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center" on:click={toggle_password_visibility}>
                            <svg class="fill-current w-4 h-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                {#if password_visibilty}
                                    <path d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                                {:else}
                                    <path d="M12.81 4.36l-1.77 1.78a4 4 0 0 0-4.9 4.9l-2.76 2.75C2.06 12.79.96 11.49.2 10a11 11 0 0 1 12.6-5.64zm3.8 1.85c1.33 1 2.43 2.3 3.2 3.79a11 11 0 0 1-12.62 5.64l1.77-1.78a4 4 0 0 0 4.9-4.9l2.76-2.75zm-.25-3.99l1.42 1.42L3.64 17.78l-1.42-1.42L16.36 2.22z" />
                                {/if}
                            </svg>
                        </div>
                    </div>
                    {#if errors.password}
                        <p class="text-sm text-red-600 dark:text-red-400 mt-1">{errors.password}</p>
                    {/if}
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit" class="bg-gray-400 hover:bg-gray-300 text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 font-bold py-2 px-4 rounded outline-none focus:shadow-outline dark:focus:bg-gray-900">
                        Login
                    </button>
                    <a href="/signup" class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400">
                        Need an account? <u>Register</u>
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

<script context="module">
	export async function preload(_, { user }) {
		if (user) this.redirect(301, '/')
	}
</script>

<script>
    import { goto } from '@sapper/app'
    import { cdn } from 'cdn.js'
    import { userSession } from 'stores.js'
    import { validate, serialize } from 'formee'
    import { wallpaper } from 'wallpaper.js'
    import { mediaQuery } from 'utils'
   	import nhost from 'nhost-js-sdk'
	import { stores } from '@sapper/app'

const {  session } = stores()

userSession.set(session)
console.log(session)
console.log(userSession)


const config = {
	endpoint: "http://in51b05uqk.lb.c1.gra.k8s.ovh.net",
	storage: userSession
}

nhost.initializeApp(config)

const auth = nhost.auth()
    const medQ = mediaQuery('(min-width: 1024px)')

    let password_visibilty = false
    let password_elem
    let form_element
    let errors = {}

    const img = wallpaper()

    const form_rules = {
    	email(val) {
    		if (!val) return 'Required'
			// return /.+@.+\..+/.test(val) || 'Invalid email'
			return true
    	},
    	password(val) {
    		if (!val) return 'Required'
    		return val.length >= 8 || 'Must be at least 8 characters'
    	}
    }

    function toggle_password_visibility() {
    	password_elem.focus()
    	if (password_elem.type === "password") {
    		password_elem.type = "text"
    		password_visibilty = true
    	} else {
    		password_elem.type = "password"
    		password_visibilty = false
    	}
    }

    async function submit() {
    	errors = validate(form_element, form_rules)

    	if (form_element.isValid) {
    		const data = serialize(form_element)

			// const response = await userSession.login(data)
			const response = await auth.login(data['email'], data['password']);
			console.log(response)

    		// if (typeof response !== 'object') {
    		// 	errors.response = 'Invalid email or password'
    		// } else {
			goto('/')
    		// }
    	}
    }
</script>
