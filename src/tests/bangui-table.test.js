import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BanguiTable } from '../components/';
import tableClass from '../helpers/table-class.js';

describe('table test', () => {
  const columns = [
    {
      key: 'id',
      label: 'Id',
    },
    {
      key: 'name',
      label: 'Name',
    },
  ];
  const data = [
    {
      id: 1,
      name: 'Item 1',
    },
    {
      id: 2,
      name: 'Item 2',
    },
    {
      id: 3,
      name: 'Item 3',
    },
  ];

  test('component exists', () => {
    expect(BanguiTable).toBeDefined();
  });

  test('default', async () => {
    const wrapper = mount(BanguiTable, {
      props: { columns, data },
    });

    expect(wrapper.find(`.${tableClass.table}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${tableClass.thead}`).exists()).toBeTruthy();
    expect(wrapper.findAll(`.${tableClass.th}`).length).toEqual(2);
    expect(wrapper.find(`.${tableClass.tbody}`).exists()).toBeTruthy();
    expect(wrapper.findAll(`.${tableClass.tbodyTr}`).length).toEqual(3);

    await wrapper.setProps({ data: [] });

    expect(wrapper.findAll(`.${tableClass.tbodyTr}`).length).toEqual(1);
    expect(wrapper.findAll(`.${tableClass.td}`).length).toEqual(1);
    expect(wrapper.find(`.${tableClass.td}`).text()).toEqual('Empty');

    await wrapper.setProps({ emptyMessage: 'Empty Data' });

    expect(wrapper.find(`.${tableClass.td}`).text()).toEqual('Empty Data');
  });
});
