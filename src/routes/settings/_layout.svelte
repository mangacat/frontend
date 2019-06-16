<svelte:head>
    <title>Settings - MangaCat</title>
</svelte:head>

<div class="min-h-screen max-w-6xl mt-8 px-4 mx-auto">
    <div class="settings">
        <div>
            <ul>
                <li>
                    <a class="block py-2 pl-6 border-l-2 mb-2 rounded-sm {segment === 'profile' ? 'font-bold bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-800 dark:border-gray-200' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-400'}" href="/settings/profile">Profile</a>
                </li>
                <li>
                    <a class="block py-2 pl-6 border-l-2 mb-2 rounded-sm {segment === 'account' ? 'font-bold bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-800 dark:border-gray-200' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-400'}" href="/settings/account">Account</a>
                </li>
                <li>
                    <a class="block py-2 pl-6 border-l-2 mb-2 rounded-sm {segment === 'import' ? 'font-bold bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-800 dark:border-gray-200' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-400'}" href="/settings/import">Import</a>
                </li>
            </ul>
        </div>
        <slot></slot>
    </div>
</div>

<script context="module">
	export async function preload(_, { user }) {
		if (!user) this.redirect(301, '/')
	}
</script>

<style lang="postcss">
    .settings {
        display: grid;
        grid-template-columns: 12rem auto;
        gap: 2rem;
    }
</style>

<script>
    export let segment
</script>