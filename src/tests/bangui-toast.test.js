import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { h, ref } from 'vue';
import { BanguiToast } from '../components';
import toastClass from '../helpers/toast-class.js';

describe('toast test', () => {
  test('component exists', async () => {
    expect(BanguiToast).toBeDefined();
  });

  test('default', async () => {
    const wrapper = mount(BanguiToast);

    expect(wrapper.find(`.${toastClass.wrapper}`).exists()).toBeFalsy();
  });

  test('visible', async () => {
    const visible = ref(true);

    const wrapper = mount(BanguiToast, {
      props: {
        modelValue: visible.value,
      },
    });

    expect(wrapper.find(`.${toastClass.wrapper}`).exists()).toBeTruthy();
  });

  test('message from props', async () => {
    const visible = ref(true);
    const message = 'Test Message';

    const wrapper = mount(BanguiToast, {
      props: {
        modelValue: visible.value,
        message,
      },
    });

    expect(wrapper.text()).toEqual(message);
  });

  test('message from slot', async () => {
    const visible = ref(true);
    const message = 'Test Message';

    const wrapper = mount(BanguiToast, {
      props: {
        modelValue: visible.value,
        message: 'Overrided',
      },
      slots: {
        default: message,
      },
    });

    expect(wrapper.text()).toEqual(message);
  });

  test('icon', async () => {
    const visible = ref(true);

    const wrapper = mount(BanguiToast, {
      props: {
        modelValue: visible.value,
      },
      slots: {
        icon: h('span', {}, 'Icon'),
      },
    });

    expect(wrapper.find('span').exists()).toBeFalsy();

    await wrapper.setProps({ withIcon: true });

    expect(wrapper.find('span').exists()).toBeTruthy();
  });

  test('closable', async () => {
    const visible = ref(true);

    const wrapper = mount(BanguiToast, {
      props: {
        modelValue: visible.value,
      },
      slots: {
        close: ({ close }) => h('span', { onClick: close }, 'Close'),
      },
    });

    expect(wrapper.find('span').exists()).toBeFalsy();

    await wrapper.setProps({ closeable: true });

    expect(wrapper.find('span').exists()).toBeTruthy();

    await wrapper.find('span').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBeFalsy();

    visible.value = false;

    await wrapper.setProps({ modelValue: visible.value });

    expect(wrapper.find('div').exists()).toBeFalsy();

    visible.value = true;

    await wrapper.setProps({
      modelValue: visible.value,
      autoClose: true,
      timeout: 1000,
    });

    expect(wrapper.find('div').exists()).toBeTruthy();

    // Not Working : How To Use Set Timout in Test Vitest
    setTimeout(() => {
      expect(wrapper.find('div').exists()).toBeFalsy();
    }, 1000);
  });

  test('color', async () => {
    for (const colorName in toastClass.colors) {
      const wrapper = mount(BanguiToast, {
        props: {
          modelValue: true,
          color: colorName,
        },
      });

      expect(
        wrapper.find(`.${toastClass.colors[colorName]}`).exists()
      ).toBeTruthy();
    }
  });
});
