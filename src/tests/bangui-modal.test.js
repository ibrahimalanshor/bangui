import { h } from 'vue';
import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BanguiModal, BanguiButton, BanguiClose } from '../components';
import modalClass from '../helpers/modal-class.js';

describe('modal test', () => {
  test('component exists', () => {
    expect(BanguiModal).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiModal);

    expect(wrapper.find(`.${modalClass.wrapper}`).exists()).toBeFalsy();
  });

  test('model value', async () => {
    const wrapper = mount(BanguiModal, {
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.find(`.${modalClass.wrapper}`).exists()).toBeTruthy();

    await wrapper.setProps({ modelValue: false });

    expect(wrapper.find(`.${modalClass.wrapper}`).exists()).toBeFalsy();
  });

  test('header', () => {
    const wrapper = mount(BanguiModal, {
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.find(`.${modalClass.header}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${modalClass.title}`).exists()).toBeTruthy();
    expect(wrapper.findComponent(BanguiClose).exists()).toBeTruthy();
  });

  test('title', () => {
    const wrapper = mount(BanguiModal, {
      props: {
        modelValue: true,
        title: 'Test Title',
      },
    });

    expect(wrapper.find(`.${modalClass.title}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${modalClass.title}`).text()).toEqual('Test Title');
  });

  test('header close', async () => {
    const wrapper = mount(BanguiModal, {
      props: {
        modelValue: true,
        title: 'Test Title',
      },
      slots: {
        close: ({ close }) =>
          h(BanguiButton, { label: 'Close', onClick: close }),
      },
    });

    expect(wrapper.findComponent(BanguiButton).exists()).toBeTruthy();

    await wrapper.findComponent(BanguiButton).trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBeFalsy();
  });

  test('body', () => {
    const wrapper = mount(BanguiModal, {
      props: {
        modelValue: true,
      },
      slots: {
        default: 'Test Body',
      },
    });

    expect(wrapper.find(`.${modalClass.body}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${modalClass.body}`).text()).toEqual('Test Body');
  });

  test('footer', async () => {
    const wrapper = mount(BanguiModal, {
      props: {
        modelValue: true,
      },
      slots: {
        footer: 'Test Footer',
      },
    });

    expect(wrapper.find(`.${modalClass.footer}`).exists()).toBeFalsy();

    await wrapper.setProps({ withFooter: true });

    expect(wrapper.find(`.${modalClass.footer}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${modalClass.footer}`).text()).toEqual('Test Footer');
  });
});
