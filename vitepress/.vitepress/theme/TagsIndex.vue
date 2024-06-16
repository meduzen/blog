<script setup>
import { data as importedData } from '../../tags.data'
import Tags from './components/Tags.vue';

// The following declaration is just to import type autocompletion. 😑

/** @type {Record<string, import('vitepress').ContentData[]>} */
let tags = importedData

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
