<svelte:head>
    <title>Settings - MangaCat</title>
</svelte:head>

<div class="min-h-screen max-w-6xl mt-8 px-4 mx-auto">
    <div class="settings">
        <div>
            <ul class="nav -mx-4 sm:mx-0">
                <li class="text-center sm:text-left">
                    <a class="block py-2 sm:pl-6 border-b-2 sm:border-b-0 sm:border-l-2 sm:mb-2 sm:rounded-sm {segment === 'profile' ? 'font-bold bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-500' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-400'}" href="/settings/profile">Profile</a>
                </li>
                <li class="text-center sm:text-left">
                    <a class="block py-2 sm:pl-6 border-b-2 sm:border-b-0 sm:border-l-2 sm:mb-2 sm:rounded-sm {segment === 'account' ? 'font-bold bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-500' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-400'}" href="/settings/account">Account</a>
                </li>
                <li class="text-center sm:text-left">
                    <a class="block py-2 sm:pl-6 border-b-2 sm:border-b-0 sm:border-l-2 sm:mb-2 sm:rounded-sm {segment === 'import' ? 'font-bold bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-500' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-400'}" href="/settings/import">Import</a>
                </li>
            </ul>
        </div>
        <slot></slot>
    </div>
</div>

<style lang="postcss">
    .nav {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        @screen sm {
            @apply block;
        }
    }

    .settings {
        display: grid;
        gap: 2rem;

        @screen sm {
            grid-template-columns: 12rem auto;
        }
    }
</style>

<script context="module">
	export async function preload(_, { user }) {
		if (!user) this.redirect(301, '/')
	}
</script>

<script>
    export let segment
</script>