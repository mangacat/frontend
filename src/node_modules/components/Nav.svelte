{#if width >= 768}
    <DesktopNav />
{:else}
    <MobileNav />
{/if}

<svelte:window bind:innerWidth={width} />

<script>
    import DesktopNav from './Nav/DesktopNav.svelte'
    import MobileNav from './Nav/MobileNav.svelte'

    let width
</script>