<script setup>
import { computed } from 'vue';
import BanguiBox from './bangui-box.vue';
import cardClass from '../helpers/card-class.js';

const props = defineProps({
  title: String,
  body: String,
  color: {
    type: String,
    default: 'light',
  },
  withHeader: {
    type: Boolean,
    default: true,
  },
  withFooter: {
    type: Boolean,
    default: false,
  },
  customHeader: {
    type: Boolean,
    default: false,
  },
});

const style = computed(() => {
  return {
    wrapper: [cardClass.wrapper],
    header: [cardClass.header],
    title: [cardClass.title],
    body: [cardClass.body],
    footer: [cardClass.footer],
  };
});
</script>

<template>
  <bangui-box :color="props.color" :class="style.wrapper">
    <div v-if="props.withHeader" :class="style.header">
      <slot v-if="props.customHeader" name="header" />
      <template v-else>
        <h5 :class="style.title">{{ props.title }}</h5>
      </template>
    </div>
    <div :class="style.body">
      <slot>{{ props.body }}</slot>
    </div>
    <div v-if="props.withFooter" :class="style.footer">
      <slot name="footer" />
    </div>
  </bangui-box>
</template>
