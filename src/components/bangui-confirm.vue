<script setup>
import { computed } from 'vue';
import confirmClass from '../helpers/confirm-class.js';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: String,
  withIcon: {
    type: Boolean,
    default: true,
  },
  withTitle: {
    type: Boolean,
    default: true,
  },
  withActions: {
    type: Boolean,
    default: true,
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
    wrapper: [confirmClass.wrapper],
    content: [confirmClass.content],
    icon: [confirmClass.icon],
    title: [confirmClass.title],
    body: [confirmClass.body],
    actions: [confirmClass.actions],
  };
});
</script>

<template>
  <div v-if="visible" :class="style.wrapper">
    <div :class="style.content">
      <slot v-if="props.withIcon" name="icon" :style-class="style.icon" />
      <h5 v-if="props.withTitle" :class="style.title">{{ props.title }}</h5>
      <div :class="style.body">
        <slot />
      </div>
      <slot
        v-if="props.withActions"
        name="actions"
        :style-class="style.actions"
      />
    </div>
  </div>
</template>
