<script setup>
import { computed } from 'vue';
import BanguiBox from './bangui-box.vue';
import widgetClass from '../helpers/widget-class.js';

const props = defineProps({
  title: String,
});

const style = computed(() => {
  return {
    wrapper: [widgetClass.wrapper],
    title: [widgetClass.title],
    content: [widgetClass.content],
  };
});
</script>

<template>
  <bangui-box :class="style.wrapper">
    <h3 :class="style.title">{{ props.title }}</h3>
    <div :class="style.content">
      <slot />
    </div>
  </bangui-box>
</template>
