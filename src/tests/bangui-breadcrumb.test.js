import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import { BanguiBreadcrumb } from '../components';

describe('breadcrumb', () => {
  const items = [
    {
      key: 'home',
      label: 'Home',
    },
    {
      key: 'user',
      label: 'User',
    },
    {
      key: 'profile',
      label: 'Profile',
    },
  ];

  test('component exists', () => {
    expect(BanguiBreadcrumb).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiBreadcrumb, {
      props: {
        items,
      },
    });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('ul').exists()).toBeTruthy();
    expect(wrapper.findAll('li').length).toEqual(3);
  });

  test('active');
});
