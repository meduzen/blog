<script setup>
defineProps({
  tags: {
    type: Array[String, Number],
    required: true,
  },
})
</script>

<template>
  <ul class="tags">
    <li class="tag" v-for="tag in tags">
      <Badge class="tag__badge">{{ tag }}</Badge>
    </li>
  </ul>
</template>

<style scoped>
.tags {
  --tag-font-size: var(--vp-code-font-size);

  padding: 0;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .5em;

  list-style-type: none;
}

.tag {
  margin: 0;
}

.tag__badge {
  font-size: var(--tag-font-size, 0.85rem);
}
</style>
