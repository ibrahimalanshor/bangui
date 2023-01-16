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
        size: 10,
      },
    });

    expect(wrapper.find(`.${paginationClass.wrapper}`).exists()).toBeTruthy();
  });
});
