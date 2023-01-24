import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import {
  BanguiDatatable,
  BanguiLoading,
  BanguiPagination,
  BanguiTable,
} from '../components';
import datatableClass from '../helpers/datatable-class';
import paginationClass from '../helpers/pagination-class';

describe('datatable test', () => {
  const columns = [
    {
      key: 'id',
      label: 'No',
    },
    {
      key: 'name',
      label: 'Name',
    },
  ];
  const data = [
    {
      id: 1,
      name: 'Data 1',
    },
    {
      id: 2,
      name: 'Data 2',
    },
    {
      id: 3,
      name: 'Data 3',
    },
  ];

  test('component exists', () => {
    expect(BanguiDatatable).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiDatatable, {
      props: { columns, data, paginationSize: 50 },
    });

    expect(wrapper.find(`.${datatableClass.wrapper}`).exists()).toBeTruthy();
  });

  test('loading', async () => {
    const wrapper = mount(BanguiDatatable, {
      props: { columns, data, paginationSize: 50 },
    });

    expect(wrapper.findComponent(BanguiLoading).exists()).toBeFalsy();

    await wrapper.setProps({ isLoading: true });

    expect(wrapper.findComponent(BanguiLoading).exists()).toBeTruthy();
  });

  test('table', async () => {
    const wrapper = mount(BanguiDatatable, {
      props: { columns, data, paginationSize: 50 },
    });

    expect(
      wrapper.find(`.${datatableClass.tableWrapper}`).exists()
    ).toBeTruthy();
    expect(wrapper.findComponent(BanguiTable).exists()).toBeTruthy();

    expect(wrapper.findComponent(BanguiTable).findAll('th').length).toEqual(
      columns.length
    );
    expect(
      wrapper.findComponent(BanguiTable).findAll('tbody tr').length
    ).toEqual(data.length);
    expect(
      wrapper.findComponent(BanguiTable).find('tbody tr').findAll('td').length
    ).toEqual(columns.length);

    await wrapper.findComponent(BanguiTable).find('tbody tr').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click-row');
    expect(wrapper.emitted()['click-row'][0][0]).toEqual(data[0]);
  });

  test('pagination', async () => {
    const wrapper = mount(BanguiDatatable, {
      props: { columns, data, paginationSize: 50 },
    });

    expect(
      wrapper.find(`.${datatableClass.paginationWrapper}`).exists()
    ).toBeTruthy();
    expect(wrapper.findComponent(BanguiPagination).exists()).toBeTruthy();

    expect(
      wrapper
        .findComponent(BanguiPagination)
        .findAll(`.${paginationClass.item}`).length
    ).toEqual(5);

    wrapper
      .findComponent(BanguiPagination)
      .findAll(`.${paginationClass.item}`)[1]
      .trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:page');
    expect(wrapper.emitted()).toHaveProperty('page-change');
    expect(wrapper.emitted()['update:page'][0][0]).toEqual(2);
  });
});
