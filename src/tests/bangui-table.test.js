import { h } from 'vue';
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
      render: (props) => h('h2', {}, { default: () => props.item.name }),
    },
    {
      key: 'status',
      label: 'Status',
      customValue: true,
      value: (item) => item.status + ' Custom',
    },
  ];
  const data = [
    {
      id: 1,
      name: 'Item 1',
      status: 'Status 1',
    },
    {
      id: 2,
      name: 'Item 2',
      status: 'Status 2',
    },
    {
      id: 3,
      name: 'Item 3',
      status: 'Status 3',
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
    expect(wrapper.findAll(`.${tableClass.th}`).length).toEqual(3);
    expect(wrapper.find(`.${tableClass.tbody}`).exists()).toBeTruthy();
    expect(wrapper.findAll(`.${tableClass.tbodyTr}`).length).toEqual(3);

    expect(
      wrapper.findAll(`.${tableClass.tbodyTr}`)[0].findAll(`.${tableClass.td}`)
        .length
    ).toEqual(3);
    expect(
      wrapper.findAll(`.${tableClass.tbodyTr}`)[0].find('h2').exists()
    ).toBeTruthy();

    expect(
      wrapper
        .findAll(`.${tableClass.tbodyTr}`)[0]
        .findAll(`.${tableClass.td}`)[0]
        .text()
    ).toEqual('1');
    expect(
      wrapper
        .findAll(`.${tableClass.tbodyTr}`)[0]
        .findAll(`.${tableClass.td}`)[1]
        .text()
    ).toEqual('Item 1');
    expect(
      wrapper
        .findAll(`.${tableClass.tbodyTr}`)[0]
        .findAll(`.${tableClass.td}`)[2]
        .text()
    ).toEqual('Status 1 Custom');

    await wrapper.findAll(`.${tableClass.tbodyTr}`)[0].trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click-row');
    expect(wrapper.emitted()['click-row'][0][0]).toEqual(data[0]);

    await wrapper.setProps({ data: [] });

    expect(wrapper.findAll(`.${tableClass.tbodyTr}`).length).toEqual(1);
    expect(wrapper.findAll(`.${tableClass.td}`).length).toEqual(1);
    expect(wrapper.find(`.${tableClass.td}`).text()).toEqual('Empty');

    await wrapper.setProps({ emptyMessage: 'Empty Data' });

    expect(wrapper.find(`.${tableClass.td}`).text()).toEqual('Empty Data');
  });
});
