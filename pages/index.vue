<template>
  <div>
    <h3>Authors</h3>
    <ul>
      <li v-for="item in series_chapters" :key="item.id">
        <!-- <nuxt-link :to="`/article/${item.id}`">{{ item.name }}</nuxt-link> -->
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import seriesChapters from "~/apollo/queries/fetchSeriesChapters";

export default {
  apollo: {
    series_chapters: {
      prefetch: true,
      query: seriesChapters
    }
  },
  head: {
    title: "Authors of Blog"
  }
};
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}
a {
  text-decoration: none;
  color: #3498db;
}
a:hover {
  border-bottom: 1px solid;
}
</style>
