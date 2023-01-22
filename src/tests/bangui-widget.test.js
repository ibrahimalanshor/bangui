import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BanguiWidget } from '../components';
import widgetClass from '../helpers/widget-class.js';

describe('widget test', () => {
  test('component exists', () => {
    expect(BanguiWidget).toBeDefined();
  });

  test('default', () => {
    const wrapper = mount(BanguiWidget, {
      props: {
        title: 'Test Title',
      },
      slots: {
        default: 'Test Content',
      },
    });

    expect(wrapper.find(`.${widgetClass.wrapper}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${widgetClass.title}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${widgetClass.title}`).text()).toEqual('Test Title');
    expect(wrapper.find(`.${widgetClass.content}`).exists()).toBeTruthy();
    expect(wrapper.find(`.${widgetClass.content}`).text()).toEqual(
      'Test Content'
    );
  });
});
