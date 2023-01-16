<script setup>
import { ref, computed } from 'vue';
import paginationClass from '../helpers/pagination-class.js';

const props = defineProps({
  prevLabel: {
    type: String,
    default: 'Prev',
  },
  nextLabel: {
    type: String,
    default: 'Prev',
  },
  size: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['page-change', 'prev', 'next']);

const activePage = ref(1);

const style = computed(() => {
  return {
    wrapper: [paginationClass.wrapper],
    prev: [paginationClass.prev],
    next: [paginationClass.next],
    item: [paginationClass.item],
    disabled: [paginationClass.disabled],
    active: [paginationClass.active],
  };
});

function handleClickPrev() {
  emit('prev');
}
function handleClickNext() {
  emit('next');
}
function handleClickItem(pageNumber) {
  emit('page-change', pageNumber);
}
</script>

<template>
  <div :class="style.wrapper">
    <div
      :class="[style.prev, activePage !== 1 ? style.disabled : '']"
      v-on:click="handleClickPrev"
    >
      <slot name="prev">{{ props.prevLabel }}</slot>
    </div>
    <div
      v-for="item in size"
      :key="item"
      :class="[style.item, activePage === item ? style.active : '']"
      v-on:click="handleClickItem"
    >
      {{ item }}
    </div>
    <div
      :class="[style.next, activePage === props.size ? style.disabled : '']"
      v-on:click="handleClickNext"
    >
      <slot name="next">{{ props.nextLabel }}</slot>
    </div>
  </div>
</template>
