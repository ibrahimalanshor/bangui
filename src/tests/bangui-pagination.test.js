import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BanguiPagination } from '../components';
import paginationClass from '../helpers/pagination-class.js';

describe('pagination test', () => {
  test('component exists', () => {
    expect(BanguiPagination).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiPagination, {
      props: {
        size: 50,
      },
    });

    expect(wrapper.find(`.${paginationClass.wrapper}`).exists()).toBeTruthy();
  });

  test('prev', async () => {
    const wrapper = mount(BanguiPagination, {
      props: {
        size: 50,
      },
    });

    expect(wrapper.find(`.${paginationClass.prev}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${paginationClass.prev}`).text()).toEqual('Prev');

    expect(wrapper.find(`.${paginationClass.prev}`).classes()).toContain(
      paginationClass.disabled
    );

    await wrapper.find(`.${paginationClass.prev}`).trigger('click');

    expect(wrapper.emitted()).not.toHaveProperty('prev');

    await wrapper.findAll(`.${paginationClass.item}`)[1].trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(2);

    await wrapper.setProps({ modelValue: 2 });

    expect(wrapper.find(`.${paginationClass.prev}`).classes()).not.toContain(
      paginationClass.disabled
    );

    await wrapper.find(`.${paginationClass.prev}`).trigger('click');

    expect(wrapper.emitted()).toHaveProperty('prev');

    expect(wrapper.emitted()).toHaveProperty('page-change');

    await wrapper.setProps({ modelValue: 1 });

    expect(wrapper.findAll(`.${paginationClass.item}`)[0].classes()).toContain(
      paginationClass.active
    );
    expect(wrapper.find(`.${paginationClass.prev}`).classes()).toContain(
      paginationClass.disabled
    );
  });

  test('next', async () => {
    const wrapper = mount(BanguiPagination, {
      props: {
        size: 50,
        modelValue: 5,
      },
    });

    expect(wrapper.find(`.${paginationClass.next}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${paginationClass.next}`).text()).toEqual('Next');

    expect(wrapper.find(`.${paginationClass.next}`).classes()).toContain(
      paginationClass.disabled
    );

    await wrapper.find(`.${paginationClass.next}`).trigger('click');

    expect(wrapper.emitted()).not.toHaveProperty('next');

    await wrapper.findAll(`.${paginationClass.item}`)[3].trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(4);

    await wrapper.setProps({ modelValue: 4 });

    expect(wrapper.find(`.${paginationClass.next}`).classes()).not.toContain(
      paginationClass.disabled
    );

    await wrapper.find(`.${paginationClass.next}`).trigger('click');

    expect(wrapper.emitted()).toHaveProperty('next');

    expect(wrapper.emitted()).toHaveProperty('page-change');

    await wrapper.setProps({ modelValue: 5 });

    expect(wrapper.findAll(`.${paginationClass.item}`)[4].classes()).toContain(
      paginationClass.active
    );
    expect(wrapper.find(`.${paginationClass.next}`).classes()).toContain(
      paginationClass.disabled
    );
  });

  test('item', async () => {
    const wrapper = mount(BanguiPagination, {
      props: {
        size: 50,
      },
    });

    expect(wrapper.findAll(`.${paginationClass.item}`).length).toEqual(50 / 10);
    expect(wrapper.findAll(`.${paginationClass.item}`)[0].classes()).toContain(
      paginationClass.active
    );

    await wrapper.findAll(`.${paginationClass.item}`)[3].trigger('click');
    await wrapper.setProps({ modelValue: 4 });

    expect(wrapper.emitted()).toHaveProperty('page-change');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');

    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(4);

    expect(wrapper.findAll(`.${paginationClass.item}`)[3].classes()).toContain(
      paginationClass.active
    );
  });

  test('perPage', () => {
    const wrapper = mount(BanguiPagination, {
      props: {
        size: 50,
        perPage: 5,
      },
    });

    expect(wrapper.findAll(`.${paginationClass.item}`).length).toEqual(50 / 5);
  });
});
