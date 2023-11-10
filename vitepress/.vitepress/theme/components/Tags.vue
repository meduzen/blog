<script setup>
defineProps({
  tags: {
    type: Array[String, Number],
    required: true,
  },
})

</script>

<template>
  <ul class="tags" v-if="tags">
    <li class="tag" v-for="tag in tags">{{ tag }}</li>
  </ul>
</template>

<style scoped>
.tags {
  padding: 0;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .5em;

  list-style-type: none;
}

.tag {
  margin: 0;
  padding: .2em .75em;

  font-size: var(--vp-code-font-size);
  font-weight: 500;

  background: var(--vp-badge-info-bg);
  border-radius: .25em;
}
</style>
