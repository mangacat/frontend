<svelte:head>
    <title>Edit Chapter - MangaCat</title>
</svelte:head>

<div class="min-h-screen max-w-6xl mt-8 px-4 mx-auto">
    <div class="edit">
        <div>
            <ul>
                <li>
                    <a class="block py-2 pl-6 border-l-2 mb-2 rounded-sm {segment === 'metadata' ? 'font-bold bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-200' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-400'}" href="/edit/chapter/{$page.params.id}/metadata">Metadata</a>
                </li>
                <li>
                    <a class="block py-2 pl-6 border-l-2 mb-2 rounded-sm {segment === 'files' ? 'font-bold bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-200' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-400'}" href="/edit/chapter/{$page.params.id}/files">Files</a>
                </li>
            </ul>
        </div>
        <slot></slot>
    </div>
</div>

<script context="module">
    import * as api from 'api.js'

    export async function preload({ params }, { user }) {
    	if (!user) this.redirect(301, '/')
        
    	const res = await api.get(`series_chapters/${parseInt(params.id.toString().split('-')[0], '36')}?edit=true`, user && user.token)
        
    	if (res.status === 500) this.error(404)
        
    	return { res }
    }
</script>

<style lang="postcss">
    .edit {
        display: grid;
        gap: 2rem;

        @screen md {
            grid-template-columns: 12rem auto;
        }
    }
</style>

<script>
    import { stores } from '@sapper/app'
    import { chapter } from './chapter.js'

    export let segment
    export let res

    chapter.set(res)

    const { page } = stores()
</script>