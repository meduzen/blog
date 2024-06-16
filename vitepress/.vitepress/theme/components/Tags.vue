<script>
class Tag {
  constructor(tag, count) {
    this.tag = tag
    this.count = count
  }
}
</script>

<script setup>
import { useData } from 'vitepress'
import { slugify } from '@mdit-vue/shared' // same as Vitepress

const props = defineProps({
  tags: {
    type: Array[String, Number, Tag],
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
      <a :href="`/tags/${slugify(tag?.tag ?? tag)}`">
        <Badge class="tag__badge">
          {{ tag?.tag ?? tag }}
          <span
            v-if="tag?.count"
            class="tag__count"
            :aria-label="`(count: ${tag.count})`"
          >
            {{ tag.count }}
          </span>
        </Badge>
      </a>
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

.tag__count {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 2.6ex;
  height: 2.6ex;

  /* @todo Usage of `cap` awaiting for feedbacks: https://m.nintendojo.fr/@meduz/112627461086349722 */

  @supports (width: 2cap) {
    width: 2cap;
    height: 2cap;
  }

  font-size: 85%;
  font-weight: 700;

  background: var(--vp-c-bg);
  border-radius: 50%;
}
</style>
