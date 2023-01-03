import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { BanguiInput } from '../components';
import inputClass from '../helpers/input-class.js';

describe('input test', () => {
  test('component exists', async () => {
    expect(BanguiInput).toBeTruthy();
  });

  test('default', async () => {
    const wrapper = mount(BanguiInput, {
      attrs: {
        placeholder: 'Default Input',
      },
    });

    expect(wrapper.find('input').attributes('placeholder')).toEqual(
      'Default Input'
    );
    expect(wrapper.classes()).toContain(inputClass.wrapper);
  });

  test('type', async () => {
    const wrapper = mount(BanguiInput, {
      attrs: {
        type: 'number',
      },
    });

    expect(wrapper.find('input').attributes('type')).toEqual('number');
  });

  test('colors', async () => {
    for (const color in inputClass.colors) {
      const wrapper = mount(BanguiInput, {
        props: {
          label: 'Test Input',
          color: color,
        },
      });

      expect(wrapper.classes()).toContain(inputClass.colors[color]);
    }
  });

  test('sizes', async () => {
    for (const size in inputClass.sizes) {
      const wrapper = mount(BanguiInput, {
        props: {
          label: 'Test Input',
          size: size,
        },
      });

      expect(wrapper.classes()).toContain(inputClass.sizes[size]);
    }
  });

  test('block', async () => {
    const wrapper = mount(BanguiInput, {
      props: {
        label: 'Test Input',
        block: true,
      },
    });

    expect(wrapper.classes()).toContain(inputClass.block);
  });

  test('disabled', async () => {
    const wrapper = mount(BanguiInput, {
      props: {
        label: 'Test Input',
        disabled: true,
      },
    });

    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain(inputClass.disabled);
  });

  test('loading', async () => {
    const wrapper = mount(BanguiInput, {
      props: {
        label: 'Test Input',
        loading: true,
      },
    });

    expect(wrapper.classes()).toContain(inputClass.loading);
  });

  test('modelValue', async () => {
    const value = ref('test');
    const wrapper = mount(BanguiInput, {
      props: {
        modelValue: value,
      },
    });

    expect(wrapper.props('modelValue')).toEqual(value);
  });

  test('change event', async () => {
    const value = ref('');
    const wrapper = mount(BanguiInput, {
      props: {
        modelValue: value,
      },
    });

    await wrapper.find('input').setValue('changed');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1);
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['changed']);

    expect(wrapper.emitted()).toHaveProperty('change');
  });
});
