import { mount } from '@vue/test-utils';
import { BanguiButton } from '../components';

const classes = {
  wrapper: '--bangui-button',
  colors: {
    primary: '--bangui-button-color-primary',
    secondary: '--bangui-button-color-primary',
    danger: '--bangui-button-color-danger',
    success: '--bangui-button-color-success',
    warning: '--bangui-button-color-warning',
    light: '--bangui-button-color-light',
    dark: '--bangui-button-color-light',
  },
  sizes: {
    xs: '--bangui-button-size-xs',
    sm: '--bangui-button-size-sm',
    md: '--bangui-button-size-md',
    lg: '--bangui-button-size-lg',
    xl: '--bangui-button-size-xl',
  },
  block: '--bangui-button-block',
  disabled: '--bangui-button-disabled',
  loading: '--bangui-button-loading',
};

describe('button test', () => {
  test('component exists', async () => {
    expect(BanguiButton).toBeTruthy();
  });

  // todo
  test('default class', async () => {
    const wrapper = mount(BanguiButton, {
      slots: {
        default: 'Test Button',
      },
    });

    expect(wrapper.text()).toContain('Test Button');
  });

  test('label from default slot', async () => {
    const wrapper = mount(BanguiButton, {
      slots: {
        default: 'Test Button',
      },
    });

    expect(wrapper.text()).toContain('Test Button');
  });

  test('label from props', async () => {
    const wrapper = mount(BanguiButton, {
      props: {
        label: 'Test Button',
      },
    });

    expect(wrapper.text()).toContain('Test Button');
  });

  // todo
  test('label from props', async () => {
    const wrapper = mount(BanguiButton, {
      props: {
        label: 'Test Button',
      },
    });

    expect(wrapper.text()).toContain('Test Button');
  });

  // todo
  test('label from props', async () => {
    const wrapper = mount(BanguiButton, {
      props: {
        label: 'Test Button',
      },
    });

    expect(wrapper.text()).toContain('Test Button');
  });
});
