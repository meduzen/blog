<script setup>
import { datetime } from 'datetime-attribute'

const props = defineProps({
  date: {
    type: [Date, String],
    required: true,
  },
})

const date = datetime(new Date(props.date))
</script>

<template>
  <time :datetime="date">{{ date }}</time>
</template>
