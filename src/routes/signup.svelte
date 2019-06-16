<svelte:head>
    <title>Sign Up - MangaCat</title>
    <script type="text/javascript">var recaptchaOnload = function() { grecaptcha.render('recaptcha', {'sitekey' : process.env.GOOGLE_RECAPTCHA_SITEKEY}) }</script>
</svelte:head>

<div class="min-h-screen">
    <div class="w-full max-w-sm lg:max-w-2xl lg:flex mx-auto mt-24 shadow-md rounded overflow-hidden mx-2">
        <div class="hidden lg:block w-1/2 bg-cover bg-center" style="{width > 1024 ? `background-image: url(${cdn('https://files.catbox.moe/cqqax7.png')});` : '' }" />
        <div class="lg:w-1/2 bg-white dark:bg-gray-700 px-8 pt-6 pb-8">
            <form bind:this={form_element} on:submit|preventDefault={submit}>
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input id="username" name="username" type="text" class="{errors.username ? 'border-red-600 dark:border-red-600': ''} hover:shadow focus:shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
                    {#if errors.username}
                        <p class="text-sm text-red-600 dark:text-red-400 mt-1">{errors.username}</p>
                    {/if}
                </div>
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
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="confirm_email">
                        Confirm Email
                    </label>
                    <input id="confirm_email" name="confirmed_email" type="text" class="{errors.confirmed_email ? 'border-red-600 dark:border-red-600': ''} hover:shadow focus:shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
                    {#if errors.confirmed_email}
                        <p class="text-sm text-red-600 dark:text-red-400 mt-1">{errors.confirmed_email}</p>
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
                <div class="mb-6">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="confirm_password">
                        Confirm Password
                    </label>
                    <div class="relative">
                        <input id="confirm_password" bind:this={confirm_password_elem} name="confirmed_password" type="password" class="{errors.confirmed_password ? 'border-red-600 dark:border-red-600': ''} hover:shadow focus:shadow appearance-none border dark:border-gray-900 rounded w-full py-2 pl-3 pr-10 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" />
                        <div class="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center" on:click={toggle_confirm_password_visibility}>
                            <svg class="fill-current w-4 h-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                {#if confirm_password_visibilty}
                                    <path d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                                {:else}
                                    <path d="M12.81 4.36l-1.77 1.78a4 4 0 0 0-4.9 4.9l-2.76 2.75C2.06 12.79.96 11.49.2 10a11 11 0 0 1 12.6-5.64zm3.8 1.85c1.33 1 2.43 2.3 3.2 3.79a11 11 0 0 1-12.62 5.64l1.77-1.78a4 4 0 0 0 4.9-4.9l2.76-2.75zm-.25-3.99l1.42 1.42L3.64 17.78l-1.42-1.42L16.36 2.22z" />
                                {/if}
                            </svg>
                        </div>
                    </div>  
                    {#if errors.confirmed_password}
                        <p class="text-sm text-red-600 dark:text-red-400 mt-1">{errors.confirmed_password}</p>
                    {/if}
                </div>
                <div id="recaptcha" class="flex justify-center mb-4"></div>
                <div class="flex items-center justify-between">
                    <button type="submit" disabled={submitting} class="hover:shadow bg-gray-400 hover:bg-gray-300 text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 font-bold py-2 px-4 rounded outline-none focus:shadow-outline dark:focus:bg-gray-900">
                        {submitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                    <a href="/login" class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400">
                        Have an account? <u>Login</u>
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

<svelte:window bind:innerWidth={width} />

<script context="module">
	export async function preload(_, { user }) {
		if (user) this.redirect(301, '/')
	}
</script>

<script>
    import { onMount } from 'svelte'
    import { cdn } from 'cdn.js'
    import { validate, serialize } from 'formee'
    import { userSession } from 'stores.js'

    let password_visibilty = false
    let password_elem
    let confirm_password_visibilty = false
    let confirm_password_elem
    let form_element
    let errors = {}
    let submitting = false
    let width
    
    const form_rules = {
    	username(val) {
    		if (!val) return 'Required'
    		return val.indexOf(' ') < 0 || 'Cannot have whitespaces'
    	},
    	email(val) {
    		if (!val) return 'Required'
    		return /.+@.+\..+/.test(val) || 'Invalid email'
    	},
    	confirmed_email(val, data) {
    		if (!val) return 'Required'
    		return val === data.email || 'Must match your email'
    	},
    	password(val) {
    		if (!val) return 'Required'
    		return val.length >= 8 || 'Must be at least 8 characters'
    	},
    	confirmed_password(val, data) {
    		if (!val) return 'Required'
    		return val === data.password || 'Must match your password'
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

    function toggle_confirm_password_visibility() {
    	confirm_password_elem.focus()
    	if (confirm_password_elem.type === "password") {
    		confirm_password_elem.type = "text"
    		confirm_password_visibilty = true
    	} else {
    		confirm_password_elem.type = "password"
    		confirm_password_visibilty = false
    	}
    }

    async function submit() {
    	submitting = true

    	errors = validate(form_element, form_rules)

    	if (form_element.isValid) {
    		const data = serialize(form_element)

    		if (!Object.keys(data).includes('g-recaptcha-response')) {
    			alert("Verify you're not a robot by completing the recaptcha!")
    			submitting = false
    			return
    		}

    		let response
            
    		try {
    			response = await userSession.register(data)
    		} catch (err) {
    			console.log(err) // eslint-disable-line no-console
    			submitting = false
    			return
    		}

    		console.log(response) // eslint-disable-line no-console
    	}
        
    	submitting = false
    }

    onMount(() => {
    	const e = document.createElement('script')
    	e.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaOnload&render=explicit'
    	document.head.appendChild(e)

    	return () => { document.head.removeChild(e) }
    })
</script>