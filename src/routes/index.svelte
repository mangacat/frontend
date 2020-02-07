<script context="module">
  import client,  { SERIES_CHAPTERS } from "utils/apollo.js";


  export async function preload() {
    return {
      cache: await client.query({
		query: SERIES_CHAPTERS
      })
    };
  }
</script>

<script>
  import { slugify } from "utils";
  import Chapter from "components/Chapter.svelte";
  import LoadingPulse from "components/LoadingPulse.svelte";

  import {  restore, query } from "svelte-apollo";
  export let cache;
  restore(client, SERIES_CHAPTERS, cache.data);

  const chapters = query(client, { query: SERIES_CHAPTERS });
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
      {#each result.data.series_chapters as chapter, index}
        {#if index === 0 || result.data.series_chapters[index - 1].series_chapters_series.id !== chapter.series_chapters_series.id}
          <a
            href="/series/{chapter.series_chapters_series.id}/{slugify(chapter.series_chapters_series.name)}"
            class="hover:underline block py-1 border-b border-gray-500
            dark:border-gray-600">
            {chapter.series_chapters_series.name}
          </a>
        {/if}
        <Chapter {chapter} />
      {/each}
    {:else}
      <p>ERROR!!</p>
    {/if}
  {/await}
</div>
