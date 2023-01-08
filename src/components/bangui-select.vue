<script setup>
import { computed, ref } from 'vue';
import selectClass from '../helpers/select-class.js';

const props = defineProps({
  modelValue: null,
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Select',
  },
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
const emit = defineEmits(['update:modelValue', 'change']);
const value = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});
const selectOptions = computed(() => {
  return [
    {
      key: 'all',
      value: null,
      label: props.placeholder,
    },
    ...props.options,
  ];
});
const style = computed(() => {
  const colors = selectClass.colors;
  const sizes = selectClass.sizes;

  return [
    selectClass.wrapper,
    colors[props.color] ?? colors['light'],
    sizes[props.size] ?? sizes['md'],
    props.block ? selectClass.block : '',
    props.disabled ? selectClass.disabled : '',
    props.loading ? selectClass.loading : '',
  ];
});
const handleChange = () => emit('change');
</script>

<template>
  <select
    :class="style"
    :disabled="props.disabled"
    v-model="value"
    v-on:change="handleChange"
  >
    <option
      v-for="option in selectOptions"
      :key="option.key"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>
