import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { BanguiCheckbox } from '../components';
import checkboxClass from '../helpers/checkbox-class.js';

describe('checkbox test', () => {
  test('component exists', async () => {
    expect(BanguiCheckbox).toBeTruthy();
  });

  test('default', async () => {
    const wrapper = mount(BanguiCheckbox);

    expect(wrapper.classes()).toContain(checkboxClass.wrapper);
  });

  test('colors', async () => {
    for (const color in checkboxClass.colors) {
      const wrapper = mount(BanguiCheckbox, {
        props: {
          color: color,
        },
      });

      expect(wrapper.classes()).toContain(checkboxClass.colors[color]);
    }
  });

  test('sizes', async () => {
    for (const size in checkboxClass.sizes) {
      const wrapper = mount(BanguiCheckbox, {
        props: {
          size: size,
        },
      });

      expect(wrapper.classes()).toContain(checkboxClass.sizes[size]);
    }
  });

  test('disabled', async () => {
    const wrapper = mount(BanguiCheckbox, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain(checkboxClass.disabled);
  });

  test('loading', async () => {
    const wrapper = mount(BanguiCheckbox, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.classes()).toContain(checkboxClass.loading);
  });

  test('modelValue', async () => {
    const value = ref(true);
    const wrapper = mount(BanguiCheckbox, {
      props: {
        modelValue: value,
      },
    });

    expect(wrapper.props('modelValue')).toEqual(value);
  });

  test('change event', async () => {
    const value = ref(false);
    const wrapper = mount(BanguiCheckbox, {
      props: {
        modelValue: value,
      },
    });

    await wrapper.find('input').setValue(true);

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1);
    expect(wrapper.emitted()['update:modelValue'][0][[0]]).toEqual(true);

    expect(wrapper.emitted()).toHaveProperty('change');
  });
});
