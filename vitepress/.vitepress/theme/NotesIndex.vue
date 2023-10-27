<script setup>
import { defineClientComponent } from 'vitepress'

/**
 * This components only runs in the browser, hence the dynamic import.
 * https://vitepress.dev/guide/ssr-compat#defineclientcomponent
 */
const NotesIndexClient = defineClientComponent(() => import('./NotesIndexClient.vue'))
</script>

<template>
  <NotesIndexClient />
</template>
