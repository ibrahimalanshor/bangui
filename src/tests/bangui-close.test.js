import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BanguiClose } from '../components';
import closeClass from '../helpers/close-class.js';

describe('close test', () => {
  test('component exists', () => {
    expect(BanguiClose).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiClose);

    expect(wrapper.find(`.${closeClass.wrapper}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${closeClass.icon}`).exists()).toBeTruthy();
  });

  test('icon slot', () => {
    const wrapper = mount(BanguiClose, {
      slots: {
        default: 'custom icon slot',
      },
    });

    expect(wrapper.find(`.${closeClass.wrapper}`).text()).toEqual(
      'custom icon slot'
    );
  });

  test('click event', async () => {
    const wrapper = mount(BanguiClose);

    await wrapper.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
