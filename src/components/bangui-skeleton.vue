<script setup>
import { computed } from 'vue';
import skeletonClass from '../helpers/skeleton-class.js';

const props = defineProps({
  size: {
    type: Number,
    default: 1,
  },
});

const style = computed(() => {
  return {
    wrapper: skeletonClass.wrapper,
    item: skeletonClass.item,
  };
});
</script>

<template>
  <div :class="style.wrapper">
    <div v-for="item in size" :key="item" :class="style.item" />
  </div>
</template>
