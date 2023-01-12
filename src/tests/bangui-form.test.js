import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import { h } from 'vue';
import { BanguiButton, BanguiForm, BanguiInput } from '../components';
import formClass from '../helpers/form-class';

describe('form test', () => {
  test('component exists', async () => {
    expect(BanguiForm).toBeDefined();
  });

  test('default', async () => {
    const wrapper = mount(BanguiForm, {
      slots: {
        default: BanguiInput,
      },
    });

    expect(wrapper.find(`.${formClass.wrapper}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${formClass.header}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${formClass.content}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${formClass.message}`).exists()).toBeFalsy();

    expect(wrapper.findComponent(BanguiInput).exists()).toBeTruthy();
  });

  test('header label', async () => {
    const wrapper = mount(BanguiForm, {
      props: {
        label: 'Test Label',
      },
    });

    const labelWrapper = wrapper.find(`.${formClass.label}`);

    expect(labelWrapper.exists()).toBeTruthy();
    expect(labelWrapper.text()).toEqual('Test Label');
  });

  test('message', async () => {
    const wrapper = mount(BanguiForm, {
      props: {
        message: 'Test Message',
      },
    });

    const messageWrapper = wrapper.find(`.${formClass.message}`);

    expect(messageWrapper.exists()).toBeTruthy();
    expect(messageWrapper.text()).toEqual('Test Message');
  });

  test('collapse', async () => {
    const wrapper = mount(BanguiForm, {
      props: {
        message: 'Test Message',
        collapsable: true,
      },
      slots: {
        toggle: h(BanguiButton, { label: 'Toggle' }),
      },
    });

    const buttonToggleWrapper = wrapper.findComponent(BanguiButton);
    const headerWrapper = wrapper.find(`.${formClass.header}`);

    expect(buttonToggleWrapper.exists()).toBeTruthy();
    expect(wrapper.find(`.${formClass.content}`).exists()).toBeTruthy();

    await buttonToggleWrapper.trigger('click');

    expect(wrapper.find(`.${formClass.content}`).exists()).toBeFalsy();

    await headerWrapper.trigger('click');

    expect(wrapper.find(`.${formClass.content}`).exists()).toBeTruthy();
  });

  test('colors', async () => {
    for (const colorName in formClass.labelColors) {
      const wrapper = mount(BanguiForm, {
        props: {
          color: colorName,
        },
      });

      expect(
        wrapper.find(`.${formClass.labelColors[colorName]}`).exists()
      ).toBeTruthy();
    }

    for (const colorName in formClass.messageColors) {
      const wrapper = mount(BanguiForm, {
        props: {
          message: 'Test Message',
          color: colorName,
        },
      });

      expect(
        wrapper.find(`.${formClass.messageColors[colorName]}`).exists()
      ).toBeTruthy();
    }
  });
});
