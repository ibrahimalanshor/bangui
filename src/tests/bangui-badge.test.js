import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { BanguiBadge } from '../components';
import badgeClass from '../helpers/badge-class.js';

describe('badge test', () => {
  test('component exists', async () => {
    expect(BanguiBadge).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiBadge);

    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper.find('div').classes()).toContain(badgeClass.wrapper);
    expect(wrapper.find('div').classes()).toContain(badgeClass.colors.light);
  });

  test('label from props', () => {
    const wrapper = mount(BanguiBadge, {
      props: {
        label: 'Test Label',
      },
    });

    expect(wrapper.text()).toEqual('Test Label');
  });

  test('label from slot', () => {
    const wrapper = mount(BanguiBadge, {
      props: {
        label: 'Overrided',
      },
      slots: {
        default: 'Test Label',
      },
    });

    expect(wrapper.text()).toEqual('Test Label');
  });

  test('colors', () => {
    for (const colorName in badgeClass.colors) {
      const wrapper = mount(BanguiBadge, {
        props: {
          color: colorName,
        },
      });

      expect(wrapper.find('div').classes()).toContain(
        badgeClass.colors[colorName]
      );
    }
  });
});
