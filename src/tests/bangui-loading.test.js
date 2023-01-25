import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BanguiLoading } from '../components';
import loadingClass from '../helpers/loading-class.js';

describe('loading test', () => {
  test('component exists', () => {
    expect(BanguiLoading).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiLoading);

    expect(wrapper.find(`.${loadingClass.wrapper}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${loadingClass.spinner}`).exists()).toBeTruthy();
  });

  test('spinner slot', () => {
    const wrapper = mount(BanguiLoading, {
      slots: {
        default: 'Custom Slot',
      },
    });

    expect(wrapper.find(`.${loadingClass.wrapper}`).text()).toEqual(
      'Custom Slot'
    );
  });
});
