import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BanguiSkeleton } from '../components/';
import skeletonClass from '../helpers/skeleton-class.js';

describe('skeleton test', () => {
  test('component exists', () => {
    expect(BanguiSkeleton).toBeDefined();
  });

  test('default', async () => {
    const wrapper = mount(BanguiSkeleton);

    expect(wrapper.find(`.${skeletonClass.wrapper}`).exists()).toBeTruthy();
    expect(wrapper.findAll(`.${skeletonClass.item}`).length).toEqual(1);

    await wrapper.setProps({ size: 5 });

    expect(wrapper.findAll(`.${skeletonClass.item}`).length).toEqual(5);
  });
});
