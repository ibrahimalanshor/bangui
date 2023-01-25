<script setup>
import BanguiClose from './bangui-close.vue';
import { computed } from 'vue';
import modalClass from '../helpers/modal-class.js';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: String,
  size: {
    type: String,
    default: 'md',
  },
  withHeader: {
    type: Boolean,
    default: true,
  },
  withFooter: {
    type: Boolean,
    default: false,
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
    wrapper: [modalClass.wrapper],
    content: [
      modalClass.content,
      modalClass.sizes[props.size] ?? modalClass.sizes.md,
    ],
    header: [modalClass.header],
    title: [modalClass.title],
    body: [modalClass.body],
    footer: [modalClass.footer],
  };
});

function handleClose() {
  visible.value = false;
}
</script>

<template>
  <div v-if="visible" :class="style.wrapper">
    <div :class="style.content">
      <div v-if="props.withHeader" :class="style.header">
        <h5 :class="style.title">{{ props.title }}</h5>
        <slot name="close" :close="handleClose">
          <bangui-close v-on:click="handleClose" />
        </slot>
      </div>
      <div :class="style.body">
        <slot />
      </div>
      <div v-if="props.withFooter" :class="style.footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
