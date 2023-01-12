<script setup>
import { computed, ref } from 'vue';
import formClass from '../helpers/form-class.js';

const props = defineProps({
  label: String,
  message: String,
  withHeader: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: 'light',
  },
  collapsable: {
    type: Boolean,
    default: false,
  },
});

const visible = ref(true);

const style = computed(() => {
  return {
    wrapper: [formClass.wrapper],
    header: [formClass.header],
    content: [formClass.content],
    label: [
      formClass.label,
      formClass.labelColors[props.color] ?? formClass.labelColors['light'],
    ],
    message: [
      formClass.message,
      formClass.messageColors[props.color] ?? formClass.messageColors['light'],
    ],
  };
});

function handleClickCollapse() {
  visible.value = !visible.value;
}
</script>

<template>
  <div :class="style.wrapper">
    <div
      v-if="props.withHeader"
      :class="style.header"
      v-on:click="handleClickCollapse"
    >
      <label :class="style.label">{{ props.label }}</label>
      <slot name="toggle" />
    </div>
    <div v-if="props.collapsable ? visible : true" :class="style.content">
      <slot />
      <p v-if="props.message" :class="style.message">{{ props.message }}</p>
    </div>
  </div>
</template>
