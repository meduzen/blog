<script setup>
import { data as importedData } from '../../tags.data'
import Tags from './components/Tags.vue';

// The following declaration is just to import type autocompletion. 😑

/** @type {Record<string, import('vitepress').ContentData[]>} */
const data = importedData

// Gather tags.

let tags = data
  .flatMap(article => article.frontmatter.tags)

  // turn into an object like `{ tagA: 3, tagB: 1, }`.
  .reduce((tags, tag) => {
    tags[tag] = (tags[tag] ?? 0) + 1
    return tags
  }, {})

/**
 * Convert back to array of tags and turn each tag into an object with count,
 * then sort by count desc, then sort alphabetically (@todo move the sort
 * logic to `<Tags>`).
 */
tags = Object.entries(tags)
  .map(([tag, count]) => ({ tag, count }))
  .toSorted((a, b) => {
    if (a.count != b.count) {
      return b.count - a.count
    }

    return a.tag < b.tag ? -1 : 1
  })

</script>

<template>
  <Tags :tags></Tags>
</template>
