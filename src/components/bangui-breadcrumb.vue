<script setup>
import { computed } from 'vue';
import breadcrumbClass from '../helpers/breadcrumb-class.js';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  activeKey: null,
});

const style = computed(() => {
  return {
    wrapper: [breadcrumbClass.wrapper],
    item: [breadcrumbClass.item],
    itemActive: [breadcrumbClass.itemActive],
  };
});

function isActive(item) {
  return item.key === props.activeKey;
}
</script>

<template>
  <ul :class="style.wrapper">
    <li
      v-for="item in props.items"
      :key="item.key"
      :class="[style.item, isActive(item) ? style.itemActive : '']"
    >
      {{ item.label }}
    </li>
  </ul>
</template>
