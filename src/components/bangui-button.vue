<script setup>
import { computed } from 'vue';
import buttonClass from '../helpers/button-class.js'

const props = defineProps({
  tag: {
    type: String,
    default: 'button'
  },
  label: null,
  size: {
    type: String,
    default: 'md'
  },
  color: {
    type: String,
    default: 'primary',
  },
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const style = computed(() => {
  const colors = buttonClass.colors;
  const sizes = buttonClass.sizes;
  return [
    buttonClass.wrapper,
    props.block ? buttonClass.block : '',
    props.disabled ? buttonClass.disabled : '',
    props.loading ? buttonClass.loading : '',
    colors[props.color] ?? colors['primary'],
    sizes[props.size] ?? sizes['md'],
  ];
});
</script>

<template>
  <component :is="props.tag" :class="style" :disabled="props.disabled">
    <slot>
      <span>{{ props.label }}</span>
    </slot>
  </component>
</template> 