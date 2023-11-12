<script setup>
import { onBeforeMount, reactive } from 'vue'
import { data as importedData } from '../../articles.data'
import { datetime } from 'datetime-attribute'
import Tags from './components/Tags.vue';

// The following declaration is just to import type autocompletion. 😑

/** @type {Record<string, import('vitepress').ContentData[]>} */
const data = reactive(importedData)

// Normalize date
data.forEach(article => {
  article.frontmatter.publishedAt = new Date(article.frontmatter.publishedAt)
})

onBeforeMount(() => {
  /**
   * Make sure the excerpt links to the post URL.
   *
   * Ideally this transformation should be done at build time, but I don’t
   * want to add a DOM Parser library because Node doesn’t have one. 😑
   * It turns an excerpt into a proper link for the content index.
   */
  import('./utils/frontmatter').then(({ excerptToLink }) => {
    data.forEach(excerptToLink)
  })
})

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
</script>

<template>
  <template v-for="({ excerpt, frontmatter: { title, publishedAt, tags }, url }) in data">

    <h2><a :href="url" v-html="title"/></h2>

    <time :datetime="datetime(new Date(publishedAt), 'year')">
      {{ dateFormatter.format(publishedAt) }}
    </time>

    <tags v-if="tags" :tags="tags" />

    <p v-if="excerpt" v-html="excerpt"></p>
  </template>
</template>
