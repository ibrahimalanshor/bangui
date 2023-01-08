<script setup>
import { computed, ref, watch } from 'vue';
import radioClass from '../helpers/radio-class.js';

const props = defineProps({
  modelValue: null,
  value: null,
  size: {
    type: String,
    default: 'md',
  },
  color: {
    type: String,
    default: 'light',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'change']);

const computedValue = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});

const style = computed(() => {
  const colors = radioClass.colors;
  const sizes = radioClass.sizes;

  return [
    radioClass.wrapper,
    colors[props.color] ?? colors['light'],
    sizes[props.size] ?? sizes['md'],
    props.disabled ? radioClass.disabled : '',
    props.loading ? radioClass.loading : '',
  ];
});

const handleChange = () => emit('change');
</script>

<template>
  <input
    type="radio"
    :class="style"
    :disabled="disabled"
    :value="value"
    v-model="computedValue"
    v-on:change="handleChange"
  />
</template>
