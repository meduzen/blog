<script setup>
import Tags from './Tags.vue';

const props = defineProps({
  article: {
    type: Object,
    required: true,
  }
})

const {
  excerpt,
  frontmatter: { title, publishedAt, tags },
  url,
} = props.article
</script>

<template>
  <h2><a :href="url" v-html="title"/></h2>

  <datetime :date="publishedAt" formatter="longdate"/>
  <tags :tags="tags" />

  <p v-if="excerpt" v-html="excerpt"></p>

  <a :href="url">Continue reading</a>
</template>
