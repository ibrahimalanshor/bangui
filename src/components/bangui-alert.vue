<script setup>
import { computed, watch } from 'vue';
import alertClass from '../helpers/alert-class.js';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  message: String,
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
  return [
    alertClass.wrapper,
    alertClass.colors[props.color] ?? alertClass.colors.light,
  ];
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
  <div v-if="visible" :class="style">
    <slot name="icon" v-if="props.withIcon" />
    <slot>{{ props.message }}</slot>
    <slot name="close" v-if="props.closeable" :close="handleClose" />
  </div>
</template>
