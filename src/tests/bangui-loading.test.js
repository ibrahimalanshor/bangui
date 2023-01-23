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
});
