import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { h, ref } from 'vue';
import { BanguiAlert } from '../components';
import alertClass from '../helpers/alert-class.js';

describe('alert test', () => {
  test('component exists', async () => {
    expect(BanguiAlert).toBeDefined();
  });

  test('default', async () => {
    const wrapper = mount(BanguiAlert);

    expect(wrapper.find(`.${alertClass.wrapper}`).exists()).toBeTruthy();
  });

  test('visible', async () => {
    const visible = ref(false);

    const wrapper = mount(BanguiAlert, {
      props: {
        modelValue: visible.value,
      },
    });

    expect(wrapper.find(`.${alertClass.wrapper}`).exists()).toBeFalsy();
  });

  test('message from props', async () => {
    const message = 'Test Message';

    const wrapper = mount(BanguiAlert, {
      props: {
        message,
      },
    });

    expect(wrapper.text()).toEqual(message);
  });

  test('message from slot', async () => {
    const message = 'Test Message';

    const wrapper = mount(BanguiAlert, {
      props: {
        message: 'Overrided',
      },
      slots: {
        default: message,
      },
    });

    expect(wrapper.text()).toEqual(message);
  });

  test('title', async () => {
    const wrapper = mount(BanguiAlert, {
      props: {
        title: 'Test Title',
      },
    });

    expect(wrapper.find(`.${alertClass.title}`).exists()).toBeFalsy();

    await wrapper.setProps({ withTitle: true });

    expect(wrapper.find(`.${alertClass.title}`).exists()).toBeTruthy();
  });

  test('icon', async () => {
    const wrapper = mount(BanguiAlert, {
      slots: {
        icon: h('span', {}, 'Icon'),
      },
    });

    expect(wrapper.find('span').exists()).toBeFalsy();

    await wrapper.setProps({ withIcon: true });

    expect(wrapper.find('span').exists()).toBeTruthy();
  });

  test('closable', async () => {
    const wrapper = mount(BanguiAlert, {
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

    await wrapper.setProps({ modelValue: false });

    expect(wrapper.find('div').exists()).toBeFalsy();

    await wrapper.setProps({
      modelValue: true,
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
    for (const colorName in alertClass.colors) {
      const wrapper = mount(BanguiAlert, {
        props: {
          color: colorName,
        },
      });

      expect(
        wrapper.find(`.${alertClass.colors[colorName]}`).exists()
      ).toBeTruthy();
    }
  });
});
