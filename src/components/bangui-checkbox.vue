<script setup>
import { computed, ref, watch } from 'vue';
import checkboxClass from '../helpers/checkbox-class.js';

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

const checked = computed({
  get: function () {
    return props.modelValue ?? false;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});

const style = computed(() => {
  const colors = checkboxClass.colors;
  const sizes = checkboxClass.sizes;

  return [
    checkboxClass.wrapper,
    colors[props.color] ?? colors['light'],
    sizes[props.size] ?? sizes['md'],
    props.disabled ? checkboxClass.disabled : '',
    props.loading ? checkboxClass.loading : '',
  ];
});

const handleChange = () => emit('change');
</script>

<template>
  <input
    type="checkbox"
    :class="style"
    :disabled="disabled"
    v-model="checked"
    v-on:change="handleChange"
  />
</template>
