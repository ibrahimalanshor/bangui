import { h } from 'vue';
import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BanguiDropdown, BanguiButton } from '../components';
import dropdownClass from '../helpers/dropdown-class.js';

describe('dropdown test', () => {
  test('component exists', () => {
    expect(BanguiDropdown).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiDropdown);

    expect(wrapper.find(`.${dropdownClass.wrapper}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${dropdownClass.content}`).exists()).toBeFalsy();
  });

  test('toggle', async () => {
    const wrapper = mount(BanguiDropdown, {
      slots: {
        toggle: ({ toggle }) =>
          h(BanguiButton, { label: 'Toggle', onClick: toggle }),
      },
    });

    expect(wrapper.findComponent(BanguiButton).exists()).toBeTruthy();

    await wrapper.findComponent(BanguiButton).trigger('click');

    expect(wrapper.find(`.${dropdownClass.content}`).exists()).toBeTruthy();

    await wrapper.findComponent(BanguiButton).trigger('click');

    expect(wrapper.find(`.${dropdownClass.content}`).exists()).toBeFalsy();
  });

  test('item', async () => {
    const wrapper = mount(BanguiDropdown, {
      props: {
        items: [
          {
            key: 'option-1',
            value: 'Option 1',
          },
          {
            key: 'option-2',
            value: 'Option 2',
          },
          {
            key: 'option-3',
            value: 'Option 3',
          },
        ],
      },
      slots: {
        toggle: ({ toggle }) =>
          h(BanguiButton, { label: 'Toggle', onClick: toggle }),
      },
    });

    await wrapper.findComponent(BanguiButton).trigger('click');

    expect(wrapper.find('ul').exists()).toBeTruthy();
    expect(wrapper.findAll('li').length).toEqual(3);

    await wrapper.findAll('li')[1].trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click-item');
    expect(wrapper.emitted()['click-item'][0][0]).toEqual('Option 2');
  });

  test('custom content', async () => {
    const wrapper = mount(BanguiDropdown, {
      slots: {
        toggle: ({ toggle }) =>
          h(BanguiButton, { label: 'Toggle', onClick: toggle }),
        default: 'Custom Content',
      },
    });

    await wrapper.findComponent(BanguiButton).trigger('click');

    expect(wrapper.find(`.${dropdownClass.content}`).text()).toEqual(
      'Custom Content'
    );
  });
});
