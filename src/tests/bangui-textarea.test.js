import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { BanguiTextarea } from '../components';
import inputClass from '../helpers/input-class.js';

describe('textarea test', () => {
  test('component exists', async () => {
    expect(BanguiTextarea).toBeTruthy();
  });

  test('default', async () => {
    const wrapper = mount(BanguiTextarea, {
      attrs: {
        placeholder: 'Default Textarea',
      },
    });

    expect(wrapper.find('textarea').attributes('placeholder')).toEqual(
      'Default Textarea'
    );
    expect(wrapper.classes()).toContain(inputClass.wrapper);
  });

  test('type', async () => {
    const wrapper = mount(BanguiTextarea, {
      attrs: {
        type: 'number',
      },
    });

    expect(wrapper.find('textarea').attributes('type')).toEqual('number');
  });

  test('colors', async () => {
    for (const color in inputClass.colors) {
      const wrapper = mount(BanguiTextarea, {
        props: {
          label: 'Test Textarea',
          color: color,
        },
      });

      expect(wrapper.classes()).toContain(inputClass.colors[color]);
    }
  });

  test('sizes', async () => {
    for (const size in inputClass.sizes) {
      const wrapper = mount(BanguiTextarea, {
        props: {
          label: 'Test Textarea',
          size: size,
        },
      });

      expect(wrapper.classes()).toContain(inputClass.sizes[size]);
    }
  });

  test('block', async () => {
    const wrapper = mount(BanguiTextarea, {
      props: {
        label: 'Test Textarea',
        block: true,
      },
    });

    expect(wrapper.classes()).toContain(inputClass.block);
  });

  test('disabled', async () => {
    const wrapper = mount(BanguiTextarea, {
      props: {
        label: 'Test Textarea',
        disabled: true,
      },
    });

    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain(inputClass.disabled);
  });

  test('loading', async () => {
    const wrapper = mount(BanguiTextarea, {
      props: {
        label: 'Test Textarea',
        loading: true,
      },
    });

    expect(wrapper.classes()).toContain(inputClass.loading);
  });

  test('modelValue', async () => {
    const value = ref('test');
    const wrapper = mount(BanguiTextarea, {
      props: {
        modelValue: value,
      },
    });

    expect(wrapper.props('modelValue')).toEqual(value);
  });

  test('change event', async () => {
    const value = ref('');
    const wrapper = mount(BanguiTextarea, {
      props: {
        modelValue: value,
      },
    });

    await wrapper.find('textarea').setValue('changed');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1);
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['changed']);

    expect(wrapper.emitted()).toHaveProperty('change');
  });
});
