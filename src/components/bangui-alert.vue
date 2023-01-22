<script setup>
import { computed, watch } from 'vue';
import alertClass from '../helpers/alert-class.js';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  title: String,
  message: String,
  withTitle: {
    type: Boolean,
    default: false,
  },
  withIcon: {
    type: Boolean,
    default: false,
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  autoClose: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'light',
  },
  timeout: {
    type: Number,
    default: 500,
  },
});
const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});

const style = computed(() => {
  return {
    wrapper: [
      alertClass.wrapper,
      alertClass.colors[props.color] ?? alertClass.colors.light,
    ],
    content: [alertClass.content],
    title: [alertClass.title],
  };
});

function handleClose() {
  visible.value = false;
}

watch(visible, () => {
  if (props.autoClose && visible.value) {
    setTimeout(() => (visible.value = false), props.timeout);
  }
});
</script>

<template>
  <div v-if="visible" :class="style.wrapper">
    <slot name="icon" v-if="props.withIcon" />
    <div :class="style.content">
      <h3 v-if="props.withTitle" :class="style.title">{{ props.title }}</h3>
      <slot>{{ props.message }}</slot>
    </div>
    <slot name="close" v-if="props.closeable" :close="handleClose" />
  </div>
</template>
