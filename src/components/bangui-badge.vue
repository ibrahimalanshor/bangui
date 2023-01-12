<script setup>
import { computed } from 'vue';
import badgeClass from '../helpers/badge-class';

const props = defineProps({
  label: String,
  color: {
    type: String,
    default: 'light',
  },
});

const style = computed(() => {
  return [
    badgeClass.wrapper,
    badgeClass.colors[props.color] ?? badgeClass.colors.light,
  ];
});
</script>

<template>
  <div :class="style">
    <slot>{{ props.label }}</slot>
  </div>
</template>
