import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { BanguiSelect } from '../components';
import selectClass from '../helpers/select-class.js';

const options = [
  {
    key: 1,
    value: 'option_1',
    label: 'Option 1',
  },
  {
    key: 2,
    value: 'option_2',
    label: 'Option 2',
  },
  {
    key: 3,
    value: 'option_3',
    label: 'Option 3',
  },
];

describe('select test', () => {
  test('component exists', async () => {
    expect(BanguiSelect).toBeTruthy();
  });

  test('default', async () => {
    const wrapper = mount(BanguiSelect, {
      props: {
        placeholder: 'Select',
        options,
      },
    });

    expect(wrapper.classes()).toContain(selectClass.wrapper);
  });

  test('colors', async () => {
    for (const color in selectClass.colors) {
      const wrapper = mount(BanguiSelect, {
        props: {
          color: color,
          options,
        },
      });

      expect(wrapper.classes()).toContain(selectClass.colors[color]);
    }
  });

  test('sizes', async () => {
    for (const size in selectClass.sizes) {
      const wrapper = mount(BanguiSelect, {
        props: {
          size: size,
          options,
        },
      });

      expect(wrapper.classes()).toContain(selectClass.sizes[size]);
    }
  });

  test('block', async () => {
    const wrapper = mount(BanguiSelect, {
      props: {
        block: true,
        options,
      },
    });

    expect(wrapper.classes()).toContain(selectClass.block);
  });

  test('disabled', async () => {
    const wrapper = mount(BanguiSelect, {
      props: {
        disabled: true,
        options,
      },
    });

    expect(wrapper.find('select').attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain(selectClass.disabled);
  });

  test('loading', async () => {
    const wrapper = mount(BanguiSelect, {
      props: {
        loading: true,
        options,
      },
    });

    expect(wrapper.classes()).toContain(selectClass.loading);
  });

  test('modelValue', async () => {
    const value = ref(options[1].value);
    const wrapper = mount(BanguiSelect, {
      props: {
        modelValue: value,
        options,
      },
    });

    expect(wrapper.props('modelValue')).toEqual(value);
  });

  test('change event', async () => {
    const value = ref(options[1].value);
    const wrapper = mount(BanguiSelect, {
      props: {
        modelValue: value,
        options,
      },
    });

    await wrapper.find('select').setValue(options[2].value);

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1);
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
      options[2].value,
    ]);

    expect(wrapper.emitted()).toHaveProperty('change');
  });
});
