import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { BanguiRadio } from '../components';
import radioClass from '../helpers/radio-class.js';

describe('radio test', () => {
  test('component exists', async () => {
    expect(BanguiRadio).toBeTruthy();
  });

  test('default', async () => {
    const wrapper = mount(BanguiRadio, {
      props: {
        value: 'Test',
      },
    });

    expect(wrapper.attributes('value')).toEqual('Test');
    expect(wrapper.classes()).toContain(radioClass.wrapper);
  });

  test('colors', async () => {
    for (const color in radioClass.colors) {
      const wrapper = mount(BanguiRadio, {
        props: {
          color: color,
        },
      });

      expect(wrapper.classes()).toContain(radioClass.colors[color]);
    }
  });

  test('sizes', async () => {
    for (const size in radioClass.sizes) {
      const wrapper = mount(BanguiRadio, {
        props: {
          size: size,
        },
      });

      expect(wrapper.classes()).toContain(radioClass.sizes[size]);
    }
  });

  test('disabled', async () => {
    const wrapper = mount(BanguiRadio, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain(radioClass.disabled);
  });

  test('loading', async () => {
    const wrapper = mount(BanguiRadio, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.classes()).toContain(radioClass.loading);
  });

  test('modelValue', async () => {
    const value = ref(true);
    const wrapper = mount(BanguiRadio, {
      props: {
        modelValue: value,
      },
    });

    expect(wrapper.props('modelValue')).toEqual(value);
  });

  test('change event', async () => {
    const radioValue = ref('test');
    const wrapper = mount(BanguiRadio, {
      props: {
        value: 'Test',
        modelValue: radioValue,
      },
    });

    await wrapper.find('input').setValue(true);

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1);
    expect(wrapper.emitted()['update:modelValue'][0][[0]]).toEqual('Test');

    expect(wrapper.emitted()).toHaveProperty('change');
  });
});
