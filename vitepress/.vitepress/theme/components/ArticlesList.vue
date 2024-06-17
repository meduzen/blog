<script setup>
import ArticlesListItem from './ArticlesListItem.vue';

const props = defineProps({
  articles: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <ArticlesListItem v-for="article in articles" :article="article"/>
</template>
