<script setup>
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
  page: {
    type: Number,
    default: 1,
  },
  paginationPrevLabel: {
    type: String,
    default: 'Prev',
  },
  paginationNextLabel: {
    type: String,
    default: 'Next',
  },
  paginationSize: {
    type: Number,
    required: true,
  },
  paginationPerPage: {
    type: Number,
    default: 10,
  },
});
const emit = defineEmits(['click-row', 'update:page', 'page-change']);

const pageValue = computed({
  get: function () {
    return props.page;
  },
  set: function (value) {
    emit('update:page', value);
  },
});

function handleClickRow(item) {
  emit('click-row', item);
}
function handleClickItem(pageNumber) {
  activePage.value = pageNumber;

  emit('page-change');
}
</script>

<template>
  <div :class="style.wrapper">
    <bangui-loading v-if="props.isLoading" />
    <bangui-table
      :columns="props.columns"
      :data="props.data"
      :item-key="props.itemKey"
      :empty-message="props.emptyMessage"
      v-on:click-row="handleClickRow"
    />
    <bangui-pagination
      :prev-label="props.paginationPrevLabel"
      :next-label="props.paginationNextLabel"
      :size="props.paginationSize"
      :per-page="props.paginationPerPage"
      v-model="pageValue"
      v-on:page-change="handlePageChange"
    />
  </div>
</template>
