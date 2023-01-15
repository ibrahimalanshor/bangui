<script setup>
import { ref, computed } from 'vue';
import dropdownClass from '../helpers/dropdown-class.js';

const props = defineProps({
  items: Array,
  size: {
    type: String,
    default: 'md',
  },
  position: {
    type: String,
    default: 'left',
  },
});
const emit = defineEmits(['click-item']);

const visible = ref(false);

const style = computed(() => {
  return {
    wrapper: [dropdownClass.wrapper],
    content: [
      dropdownClass.content,
      dropdownClass.sizes[props.size] ?? dropdownClass.sizes.md,
      dropdownClass.positions[props.position] ?? dropdownClass.positions.left,
    ],
    item: [dropdownClass.item],
  };
});

function handleToggle() {
  visible.value = !visible.value;
}

function handleClickItem(item) {
  emit('click-item', item.value);
}
</script>

<template>
  <div :class="style.wrapper">
    <slot name="toggle" :toggle="handleToggle" />
    <div v-if="visible" :class="style.content">
      <slot :style-class="style">
        <ul>
          <li
            v-for="item in props.items"
            :key="item.key"
            :class="style.item"
            v-on:click="handleClickItem(item)"
          >
            {{ item.label }}
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>
