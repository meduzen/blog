<script setup>
import { data as importedData } from '../../notes.data'
import { excerptToLink } from './utils/frontmatter'
import { datetime } from 'datetime-attribute'

// The following declaration is just to import type autocompletion. 😑

/** @type {Record<string, import('vitepress').ContentData[]>} */
const data = importedData

// Sort years
const years = Object.keys(data).sort((a, b) => b - a)

years.forEach(year => data[year].forEach(note => {

  // normalize date
  note.frontmatter.publishedAt = new Date(note.frontmatter.publishedAt)

  /**
   * Ideally this transformation should be done at build time, but I don’t
   * want to add a DOM Parser library because Node doesn’t have one. 😑
   * It turns an excerpt into a proper link for the content index.
   */
  excerptToLink(note)
}))

const dateFormatter = new Intl.DateTimeFormat('en-BG', {
  day: 'numeric',
  month: 'long',
})
</script>

<template>
  <template v-for="year in years">
    <h2><time :datetime="datetime(new Date(year), 'year')">{{ year }}</time></h2>

    <ul>
      <li class="index__listItem" v-for="({ excerpt, frontmatter, url }) in data[year]">
        <time :datetime="datetime(frontmatter.publishedAt)">
          {{ dateFormatter.format(frontmatter.publishedAt) }}
        </time>:

        <p v-if="frontmatter.excerpt" v-html="frontmatter.excerpt"></p>
        <a v-else :href="url">{{ frontmatter?.title }}</a>
      </li>
    </ul>
  </template>
</template>

<style scoped>
.index__listItem > :not(time) {
  display: inline-block;
  margin-block: 0;
}
</style>
