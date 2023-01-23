<script setup>
import { computed } from 'vue';
import tableClass from '../helpers/table-class.js';

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  itemKey: {
    type: String,
    default: 'id',
  },
  emptyMessage: {
    type: String,
    default: 'Empty',
  },
});
const emit = defineEmits(['click-row']);

const style = computed(() => {
  return {
    table: [tableClass.table],
    thead: [tableClass.thead],
    theadTr: [tableClass.tr, tableClass.theadTr],
    th: [tableClass.th],
    tbody: [tableClass.tbody],
    tbodyTr: [tableClass.tr, tableClass.tbodyTr],
    td: [tableClass.td],
  };
});

function handleClickRow(item) {
  emit('click-row', item);
}
</script>

<template>
  <table :class="style.table">
    <thead :class="style.thead">
      <tr :class="style.theadTr">
        <th v-for="column in props.columns" :key="column.key" :class="style.th">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <template v-if="props.data.length">
      <tbody :class="style.tbody">
        <tr
          v-for="item in props.data"
          :key="item[props.itemKey]"
          :class="style.tbodyTr"
          v-on:click="handleClickRow(item)"
        >
          <td v-for="column in columns" :key="column.key" :class="style.td">
            <component v-if="column.render" :is="column.render" :item="item" />
            <span v-else>{{
              column.customValue ? column.value(item) : item[column.key]
            }}</span>
          </td>
        </tr>
      </tbody>
    </template>
    <template v-else>
      <tbody :class="style.tbody">
        <tr :class="style.tbodyTr">
          <td :colspan="props.columns.length" :class="style.td">
            {{ props.emptyMessage }}
          </td>
        </tr>
      </tbody>
    </template>
  </table>
</template>
