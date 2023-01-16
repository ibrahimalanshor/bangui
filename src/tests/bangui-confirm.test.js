import { h } from 'vue';
import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BanguiConfirm } from '../components/';
import confirmClass from '../helpers/confirm-class.js';

describe('confirm test', () => {
  test('component exists', () => {
    expect(BanguiConfirm).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiConfirm);

    expect(wrapper.find(`.${confirmClass.wrapper}`).exists()).toBeFalsy();
  });

  test('visible', async () => {
    const wrapper = mount(BanguiConfirm, {
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.find(`.${confirmClass.wrapper}`).exists()).toBeTruthy();

    await wrapper.setProps({ modelValue: false });

    expect(wrapper.find(`.${confirmClass.wrapper}`).exists()).toBeFalsy();
  });

  test('content', () => {
    const wrapper = mount(BanguiConfirm, {
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.find(`.${confirmClass.content}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${confirmClass.title}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${confirmClass.body}`).exists()).toBeTruthy();
  });

  test('icon', async () => {
    const wrapper = mount(BanguiConfirm, {
      props: {
        modelValue: true,
      },
      slots: {
        icon: ({ styleClass }) =>
          h('div', { class: styleClass }, { default: () => 'Test Icon' }),
      },
    });

    expect(wrapper.find(`.${confirmClass.icon}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${confirmClass.icon}`).text()).toEqual('Test Icon');

    await wrapper.setProps({ withIcon: false });

    expect(wrapper.find(`.${confirmClass.icon}`).exists()).toBeFalsy();
  });

  test('title', async () => {
    const wrapper = mount(BanguiConfirm, {
      props: {
        modelValue: true,
        title: 'Test Title',
      },
    });

    expect(wrapper.find(`.${confirmClass.title}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${confirmClass.title}`).text()).toEqual('Test Title');

    await wrapper.setProps({ withTitle: false });

    expect(wrapper.find(`.${confirmClass.title}`).exists()).toBeFalsy();
  });

  test('actions', async () => {
    const wrapper = mount(BanguiConfirm, {
      props: {
        modelValue: true,
      },
      slots: {
        actions: ({ styleClass }) =>
          h('div', { class: styleClass }, { default: () => 'Test Actions' }),
      },
    });

    expect(wrapper.find(`.${confirmClass.actions}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${confirmClass.actions}`).text()).toEqual(
      'Test Actions'
    );

    await wrapper.setProps({ withActions: false });

    expect(wrapper.find(`.${confirmClass.actions}`).exists()).toBeFalsy();
  });
});
