import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BanguiCard } from '../components';
import cardClass from '../helpers/card-class.js';

describe('card test', () => {
  test('component exists', () => {
    expect(BanguiCard).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiCard);

    expect(wrapper.find(`.${cardClass.wrapper}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${cardClass.header}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${cardClass.title}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${cardClass.body}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${cardClass.footer}`).exists()).toBeFalsy();
  });

  test('without header', () => {
    const wrapper = mount(BanguiCard, {
      props: {
        withHeader: false,
      },
    });

    expect(wrapper.find(`.${cardClass.header}`).exists()).toBeFalsy();
    expect(wrapper.find(`.${cardClass.title}`).exists()).toBeFalsy();
  });

  test('title', () => {
    const wrapper = mount(BanguiCard, {
      props: {
        title: 'Test Title',
      },
    });

    expect(wrapper.find(`.${cardClass.title}`).text()).toEqual('Test Title');
  });

  test('custom header', () => {
    const wrapper = mount(BanguiCard, {
      props: {
        title: 'Overrided',
        customHeader: true,
      },
      slots: {
        header: 'Custom Header',
      },
    });

    expect(wrapper.find(`.${cardClass.title}`).exists()).toBeFalsy();
    expect(wrapper.find(`.${cardClass.header}`).text()).toEqual(
      'Custom Header'
    );

    expect;
  });

  test('body', () => {
    const wrapper = mount(BanguiCard, {
      slots: {
        default: 'Test Body',
      },
    });

    expect(wrapper.find(`.${cardClass.body}`).text()).toEqual('Test Body');
  });

  test('footer', async () => {
    const wrapper = mount(BanguiCard, {
      slots: {
        footer: 'Test Footer',
      },
    });

    expect(wrapper.find(`.${cardClass.footer}`).exists()).toBeFalsy();

    await wrapper.setProps({ withFooter: true });

    expect(wrapper.find(`.${cardClass.footer}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${cardClass.footer}`).text()).toEqual('Test Footer');
  });
});
