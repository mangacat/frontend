<svelte:head>
    <title>{user.username} - MangaCat</title>
</svelte:head>

<div class="min-h-screen max-w-9xl mx-auto px-4 mt-8">
    <div class="rounded-lg w-full h-64 bg-cover bg-center relative flex items-end shadow" alt="{user.username}" style="background-image: url('{cdn(user.cover, { h: 512 })}');">
        <div class="h-full w-full flex flex-col justify-end">
            <div class="flex ml-4 md:ml-8">
                <img class="rounded-t md:rounded w-32 h-32 md:-mb-8 z-20 object-cover object-center md:shadow-md bg-gray-300 dark:bg-gray-700" alt="{user.username}" src="{cdn(user.mugshot, { resize: '256,256' }) || '/img/mugshot.png'}" />
                <div class="ml-4 text-gray-300">
                    <div class="mt-6">
                        <span class="leading-none py-2 px-2 font-extrabold text-xl" style="background-color: rgba(26, 32, 44, 0.6); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);">{user.username}</span>
                    </div>
                    <div class="mt-4">
                        <span class="leading-none py-1 px-2" style="background-color: rgba(26, 32, 44, 0.6); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);">{user.role}</span>
                    </div>
                </div>
            </div>
            <div class="md:pl-40 py-2 rounded-b-lg bg-gray-300 dark:bg-gray-700 flex text-sm font-bold tracking-wide">
                <div class="flex-grow flex items-center">
                    <span class="ml-4 py-1 border-r border-gray-500 dark:border-gray-600 mr-2 pr-2">Joined {timeAgo(user.joined)} ago</span>
                    <span class="py-1">Last seen {timeAgo(user.last_logged_in)} ago</span>
                </div>
                {#if $session.user && $session.user.id === user.id}
                    <div class="flex-grow-0 flex items-center">
                        <a href="/settings/profile" class="uppercase tracking-wide bg-gray-400 hover:bg-gray-300 text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 font-bold py-1 px-2 rounded outline-none focus:shadow-outline dark:focus:bg-gray-900 text-sm self-end mr-4 md:mr-8 shadow-md">
                            {#if $medQ}
                                <svg class="fill-current w-4 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M3.94 6.5L2.22 3.64l1.42-1.42L6.5 3.94c.52-.3 1.1-.54 1.7-.7L9 0h2l.8 3.24c.6.16 1.18.4 1.7.7l2.86-1.72 1.42 1.42-1.72 2.86c.3.52.54 1.1.7 1.7L20 9v2l-3.24.8c-.16.6-.4 1.18-.7 1.7l1.72 2.86-1.42 1.42-2.86-1.72c-.52.3-1.1.54-1.7.7L11 20H9l-.8-3.24c-.6-.16-1.18-.4-1.7-.7l-2.86 1.72-1.42-1.42 1.72-2.86c-.3-.52-.54-1.1-.7-1.7L0 11V9l3.24-.8c.16-.6.4-1.18.7-1.7zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
                            {:else}
                                edit profile
                            {/if}
                        </a>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<script context="module">
    import * as api from 'api.js'

    export async function preload({ params }, { user }) {
    	const res = await api.get(`users/${params.id}`, user && user.token)
        
    	if (res.status === 500) this.error(404)
        
    	return { user: res }
    }
</script>

<script>
    import { cdn } from 'cdn.js'
    import { timeAgo, mediaQuery } from 'utils'
    import { stores } from '@sapper/app'

    export let user
    
    const medQ = mediaQuery('(max-width: 768px)')

    const { session } = stores()
</script>