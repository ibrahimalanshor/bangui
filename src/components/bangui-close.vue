<script setup>
import { computed } from 'vue';
import closeClass from '../helpers/close-class.js';

const style = computed(() => {
  return {
    wrapper: closeClass.wrapper,
    icon: closeClass.icon,
  };
});
</script>

<template>
  <button :class="style.wrapper">
    <slot :classess="style.icon">
      <svg
        :class="style.icon"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6L6 18"></path>
          <path d="M6 6l12 12"></path>
        </g>
      </svg>
    </slot>
  </button>
</template>
