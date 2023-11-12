<script setup>
import { useData } from 'vitepress'

const props = defineProps({
  tags: {
    type: Array[String, Number],
    required: false,
    default: undefined,
  },
})

let tags = props.tags ?? useData().frontmatter.value.tags

if (typeof tags == 'string') {
  tags = tags.split(',').map(tag => tag.trim())
}
</script>

<template>
  <ul v-if="tags.length" class="tags">
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
