<script setup>
import { defineClientComponent } from 'vitepress'

/**
 * This components only runs in the browser, hence the dynamic import.
 * https://vitepress.dev/guide/ssr-compat#defineclientcomponent
 */
const ArticlesIndexClient = defineClientComponent(() => import('./ArticlesIndexClient.vue'))
</script>

<template>
  <ArticlesIndexClient />
</template>
