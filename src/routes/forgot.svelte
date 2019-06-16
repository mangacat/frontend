<svelte:head>
    <title>Forgot - MangaCat</title>
    <script type="text/javascript">var recaptchaOnload = function() { grecaptcha.render('recaptcha', {'sitekey' : process.env.GOOGLE_RECAPTCHA_SITEKEY}); };</script>
</svelte:head>

<div class="min-h-screen">
    <div class="w-full max-w-sm lg:max-w-2xl lg:flex mx-auto mt-24 shadow-md rounded overflow-hidden">
        <div class="hidden lg:block w-1/2 bg-cover bg-center" style="{width > 1024 ? `background-image: url(${cdn('https://files.catbox.moe/8l2v45.jpg')});` : '' }" />
        <div class="lg:w-1/2 bg-white dark:bg-gray-700 px-8 pt-6 pb-8">
            <form on:submit|preventDefault={submit}>
                {#if error_message}
                    <div class="mb-4">
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span>{error_message}</span>
                        </div>
                    </div>
                {/if}
                <div class="mb-4">
                    <label class="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input id="email" bind:value={form.email} class="shadow appearance-none border dark:border-gray-900 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 leading-tight outline-none focus:shadow-outline dark:focus:bg-gray-900 focus:bg-white bg-gray-200" type="text" placeholder="Email" />
                </div>
                <div id="recaptcha" class="flex justify-center mb-4"></div>
                <div class="flex items-center justify-between">
                    <button class="bg-gray-400 hover:bg-gray-300 text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 font-bold py-2 px-4 rounded outline-none focus:shadow-outline dark:focus:bg-gray-900" type="submit">
                        Reset
                    </button>
                    <a href="/login" class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400">
                        Amnesia subsided? <u>Login</u>
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

<svelte:window bind:innerWidth={width} />

<script>
    import { cdn } from 'cdn.js'
    import { onMount } from 'svelte'

    let error_message = ''
    const form = {
    	email: '',
    	recaptcha: ''
    }
    let width

    function submit() {
    	form.recaptcha = window.grecaptcha.getResponse()

    	if (form.recaptcha === '') {
    		error_message = "Verify you're not a robot by completing the recaptcha!"
    		return
    	}

    	if (form.email === '') {
    		error_message = "Email cannot be empty!"
    		return
    	}

    	error_message = ""
    }

    onMount(() => {
    	const e = document.createElement('script')
    	e.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaOnload&render=explicit'
    	document.head.appendChild(e)

    	return () => { document.head.removeChild(e) }
    })
</script>