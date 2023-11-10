<script setup>
import { data as importedData } from '../../articles.data'
import Tags from './components/Tags.vue';
import { excerptToLink } from './utils/frontmatter'
import { datetime } from 'datetime-attribute'

// The following declaration is just to import type autocompletion. 😑

/** @type {Record<string, import('vitepress').ContentData[]>} */
const data = importedData

// Sort years
data.forEach(article => {

  // normalize date
  article.frontmatter.publishedAt = new Date(article.frontmatter.publishedAt)

  /**
   * Ideally this transformation should be done at build time, but I don’t
   * want to add a DOM Parser library because Node doesn’t have one. 😑
   * It turns an excerpt into a proper link for the content index.
   */
  excerptToLink(article)
})

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
</script>

<template>
  <template v-for="({ excerpt, frontmatter: { title, publishedAt, tags }, url }) in data">

    <h2><a :href="url">{{ title }}</a></h2>
    <time :datetime="datetime(new Date(publishedAt), 'year')">{{ dateFormatter.format(publishedAt) }}</time>

    <tags v-if="tags" :tags="tags" />

    <p v-if="excerpt" v-html="excerpt"></p>
  </template>
</template>
