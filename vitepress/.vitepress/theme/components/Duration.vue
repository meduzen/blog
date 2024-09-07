<script>
const durationPropOption = {
  validator: value => Number(value).toString() == value,
  required: false,
  default: 0,
}
</script>

<script setup>
import { duration } from 'datetime-attribute'

const props = defineProps({
  w: durationPropOption,
  d: durationPropOption,
  h: durationPropOption,
  m: durationPropOption,
  s: durationPropOption,
})
</script>

<template>
  <time :datetime="duration(props)">
    <!-- @todo Consider: if no slot provided, generate the duration. -->
    <slot></slot>
  </time>
</template>
