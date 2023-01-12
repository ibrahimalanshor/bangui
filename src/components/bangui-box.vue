<script setup>
import { computed } from 'vue';
import boxClass from '../helpers/box-class';

const props = defineProps({
  color: {
    type: String,
    default: 'light',
  },
});

const style = computed(() => {
  return [
    boxClass.wrapper,
    boxClass.colors[props.color] ?? boxClass.colors.default,
  ];
});
</script>

<template>
  <div :class="style">
    <slot />
  </div>
</template>
