<script setup>
import { onBeforeMount, reactive } from 'vue'
import { data as importedData } from '../../notes/notes.data'

// The following declaration is just to import type autocompletion. 😑

/** @type {Record<string, import('vitepress').ContentData[]>} */
const data = reactive(importedData)

// Sort years
const years = Object.keys(data).sort((a, b) => b - a)

// Normalize date
years.forEach(year => data[year].forEach(note => {
  note.frontmatter.publishedAt = new Date(note.frontmatter.publishedAt)
}))

onBeforeMount(() => {
    /**
     * Make sure the excerpt links to the post URL.
     *
     * Ideally this transformation should be done at build time, but I don’t
     * want to add a DOM Parser library because Node doesn’t have one. 😑
     * It turns an excerpt into a proper link for the content index.
     */
    import('./utils/frontmatter').then(({ excerptToLink }) => {
      years.forEach(year => data[year].forEach(excerptToLink))
    })
})

</script>

<template>
  <template v-for="year in years">

    <h2><datetime :date="year" precision="year"/></h2>

    <ul>
      <li v-for="({ excerptTransformed, frontmatter: { title, publishedAt, excerpt }, url }) in data[year]">
        <p>
          <datetime :date="publishedAt" formatter="yearless"/>:

          <span v-if="excerptTransformed" v-html="excerpt"/>
          <a v-else :href="url">{{ title }}</a>
        </p>
      </li>
    </ul>

</template>
</template>
