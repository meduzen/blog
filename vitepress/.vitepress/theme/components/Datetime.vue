<script setup>
import { datetime } from 'datetime-attribute'
import { formatter as dateFormatter } from '../../utils/date.mjs';

const props = defineProps({
  date: {
    type: [Date, String],
    required: true,
    default: new Date(),
  },
  precision: {
    type: String,
    required: false,
    default: 'day',
  },
  formatter: {
    type: String,
    required: false,
    validator: value => ['longdate', 'yearless'].includes(value),
  }
})

const date = new Date(props.date)
const datetimeAttr = datetime(date, props.precision)
const str = dateFormatter[props.formatter]?.format(date) ?? datetimeAttr
</script>

<template>
  <time :datetime="datetimeAttr">{{ str }}</time>
</template>
