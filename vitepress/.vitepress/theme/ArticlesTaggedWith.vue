<script setup>
import { onBeforeMount, reactive } from 'vue'
import { useData } from 'vitepress'
import { data as importedData } from '../../articles.data'
import { slugify } from '@mdit-vue/shared'

import ArticlesList from './components/ArticlesList.vue';

// The following declaration is just to import type autocompletion. 😑

/** @type {Record<string, import('vitepress').ContentData[]>} */
let data = reactive(importedData)

const { params } = useData()

data = data.filter(article =>
  article.frontmatter.tags
    .map(slugify) // compare against slugified tags
    .includes(params.value.tag)
)

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
</script>

<template>
  <ArticlesList :articles="data"/>
</template>
