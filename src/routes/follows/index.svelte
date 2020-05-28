<script context="module">
  import client,  { PRIVATE_SERIES_CHAPTERS } from "utils/apollo.js"


  export async function preload( { params, user, session }) {
	//   console.log(user)
	//   console.log(session)
	//   console.log(params)
  	// return {
  	// 	cache: await client.query({
	// 		query: PRIVATE_SERIES_CHAPTERS,

  	// 	})
  	// }
  }
</script>

<script>
  import { slugify } from "utils"
  import Chapter from "components/Chapter.svelte"
  import LoadingPulse from "components/LoadingPulse.svelte"
  import { stores } from '@sapper/app'

  import {  query } from "svelte-apollo"
//   export let cache
//   restore(client, SERIES_CHAPTERS, cache.data)
  const { session } = stores()
  console.log($session)


  const chapters = query(client, { query: PRIVATE_SERIES_CHAPTERS,
  })
</script>

<svelte:head>
  <title>Home - MangaCat</title>
</svelte:head>
<div class="min-h-screen max-w-xl mx-auto pt-8 px-4">
  {#await $chapters}
    {#each [...Array(10).keys()] as i}
      <LoadingPulse
        class="{['max-w-lg', 'w-64', 'w-48'][Math.round(Math.random() * 3)]} h-8
        bg-gray-200 dark:bg-gray-700 rounded mb-4" />
    {/each}
  {:then result}
    {#if result.data}
      {#each result.data.series_chapters as {chapter} , index}
        {#if index === 0 || result.data.series_chapters[index - 1].chapter.series.id !== chapter.series.id}
          <a
            href="/series/{chapter.series.id}/{slugify(chapter.series.name)}"
            class="hover:underline block py-1 border-b border-gray-500
            dark:border-gray-600">
            {chapter.series.name}
          </a>
        {/if}
        <Chapter {chapter} />
      {/each}
    {:else}
      <p>ERROR!!</p>
    {/if}
  {/await}
</div>
