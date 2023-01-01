<script setup>
import { computed } from 'vue';

const props = defineProps({
  tag: {
    type: String,
    default: 'button'
  },
  label: String,
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
  const colors = {
    primary: '--bangui-button-color-primary',
    secondary: '--bangui-button-color-primary',
    danger: '--bangui-button-color-danger',
    success: '--bangui-button-color-success',
    warning: '--bangui-button-color-warning',
    light: '--bangui-button-color-light',
    dark: '--bangui-button-color-light',
  };
  const sizes = {
    xs: '--bangui-button-size-xs',
    sm: '--bangui-button-size-sm',
    md: '--bangui-button-size-md',
    lg: '--bangui-button-size-lg',
    xl: '--bangui-button-size-xl',
  };
  return [
    '--bangui-button',
    props.block ?? '--bangui-button-block',
    props.disabled ?? '--bangui-button-disabled',
    props.loading ?? '--bangui-button-loading',
    colors[props.color] ?? colors['primary'],
    sizes[props.size] ?? sizes['md'],
  ];
});
</script>

<template>
  <component :is="props.tag" :class="style">
    <slot>
      <span>{{ props.label }}</span>
    </slot>
  </component>
</template> 