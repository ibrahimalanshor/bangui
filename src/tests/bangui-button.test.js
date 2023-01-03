import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { BanguiButton } from '../components';
import buttonClass from '../helpers/button-class.js';

describe('button test', () => {
  test('component exists', async () => {
    expect(BanguiButton).toBeTruthy();
  });

  test('default', async () => {
    const wrapper = mount(BanguiButton, {
      slots: {
        default: 'Test Button',
      },
    });

    expect(wrapper.text()).toContain('Test Button');
    expect(wrapper.classes()).toContain(buttonClass.wrapper);
  });

  test('label from default slot', async () => {
    const wrapper = mount(BanguiButton, {
      slots: {
        default: 'Test Button',
      },
    });

    expect(wrapper.text()).toContain('Test Button');
  });

  test('label from props', async () => {
    const wrapper = mount(BanguiButton, {
      props: {
        label: 'Test Button',
      },
    });

    expect(wrapper.text()).toContain('Test Button');
  });

  test('colors', async () => {
    for (const color in buttonClass.colors) {
      const wrapper = mount(BanguiButton, {
        props: {
          label: 'Test Button',
          color: color,
        },
      });

      expect(wrapper.classes()).toContain(buttonClass.colors[color]);
    }
  });

  test('sizes', async () => {
    for (const size in buttonClass.sizes) {
      const wrapper = mount(BanguiButton, {
        props: {
          label: 'Test Button',
          size: size,
        },
      });

      expect(wrapper.classes()).toContain(buttonClass.sizes[size]);
    }
  });

  test('block', async () => {
    const wrapper = mount(BanguiButton, {
      props: {
        label: 'Test Button',
        block: true,
      },
    });

    expect(wrapper.classes()).toContain(buttonClass.block);
  });

  test('disabled', async () => {
    const wrapper = mount(BanguiButton, {
      props: {
        label: 'Test Button',
        disabled: true,
      },
    });

    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain(buttonClass.disabled);
  });

  test('loading', async () => {
    const wrapper = mount(BanguiButton, {
      props: {
        label: 'Test Button',
        loading: true,
      },
    });

    expect(wrapper.classes()).toContain(buttonClass.loading);
  });
});
