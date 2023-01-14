import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import { BanguiBreadcrumb } from '../components';
import breadcrumbClass from '../helpers/breadcrumb-class.js';

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

  test('active', () => {
    const wrapper = mount(BanguiBreadcrumb, {
      props: {
        items,
        activeKey: items[1].key,
      },
    });

    expect(
      wrapper.find(`.${breadcrumbClass.itemActive}`).exists()
    ).toBeTruthy();
    expect(wrapper.find(`.${breadcrumbClass.itemActive}`).text()).toEqual(
      items[1].label
    );
  });
});
