<script setup>
import { computed, ref } from 'vue';
import inputClass from '../helpers/input-class.js';

const props = defineProps({
  modelValue: null,
  size: {
    type: String,
    default: 'md',
  },
  color: {
    type: String,
    default: 'light',
  },
  block: {
    type: Boolean,
    default: false,
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
const emit = defineEmits(['update:modelValue', 'change', 'input']);
const value = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});
const style = computed(() => {
  const colors = inputClass.colors;
  const sizes = inputClass.sizes;

  return [
    inputClass.wrapper,
    colors[props.color] ?? colors['light'],
    sizes[props.size] ?? sizes['md'],
    props.block ? inputClass.block : '',
    props.disabled ? inputClass.disabled : '',
    props.loading ? inputClass.loading : '',
  ];
});
const handleChange = () => emit('change');
const handleInput = () => emit('input');
</script>

<template>
  <textarea
    :class="style"
    :disabled="props.disabled"
    v-model="value"
    v-on:change="handleChange"
    v-on:input="handleInput"
  ></textarea>
</template>
