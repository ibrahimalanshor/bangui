import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { BanguiBox } from '../components';
import boxClass from '../helpers/box-class';

describe('box test', () => {
  test('component exists', () => {
    expect(BanguiBox).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiBox, {
      slots: {
        default: 'Test Box',
      },
    });

    expect(wrapper.find('div').exists()).toBeTruthy();
    expect(wrapper.text()).toEqual('Test Box');
  });

  test('colors', () => {
    for (const colorName in boxClass.colors) {
      const wrapper = mount(BanguiBox, {
        props: {
          color: colorName,
        },
      });

      expect(
        wrapper.find(`.${boxClass.colors[colorName]}`).exists()
      ).toBeTruthy();
    }
  });
});
