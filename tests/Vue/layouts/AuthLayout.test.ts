import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AuthLayout from '@/layouts/AuthLayout.vue';

// Mock the AuthSplitLayout component
vi.mock('@/layouts/auth/AuthSplitLayout.vue', () => ({
  default: {
    name: 'AuthSplitLayout',
    props: ['title', 'description'],
    template: '<div data-testid="auth-split-layout" :data-title="title" :data-description="description"><slot /></div>',
  },
}));

describe('AuthLayout', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(AuthLayout, {
      props,
      slots,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="auth-split-layout"]').exists()).toBe(true);
  });

  it('passes title prop to AuthSplitLayout', () => {
    const title = 'Login to your account';
    const wrapper = createWrapper({ title });
    
    const splitLayout = wrapper.find('[data-testid="auth-split-layout"]');
    expect(splitLayout.attributes('data-title')).toBe(title);
  });

  it('passes description prop to AuthSplitLayout', () => {
    const description = 'Enter your credentials to access your account';
    const wrapper = createWrapper({ description });
    
    const splitLayout = wrapper.find('[data-testid="auth-split-layout"]');
    expect(splitLayout.attributes('data-description')).toBe(description);
  });

  it('passes both title and description props', () => {
    const title = 'Create an account';
    const description = 'Sign up to get started';
    const wrapper = createWrapper({ title, description });
    
    const splitLayout = wrapper.find('[data-testid="auth-split-layout"]');
    expect(splitLayout.attributes('data-title')).toBe(title);
    expect(splitLayout.attributes('data-description')).toBe(description);
  });

  it('handles undefined props gracefully', () => {
    const wrapper = createWrapper();
    
    const splitLayout = wrapper.find('[data-testid="auth-split-layout"]');
    expect(splitLayout.attributes('data-title')).toBeUndefined();
    expect(splitLayout.attributes('data-description')).toBeUndefined();
  });

  it('renders slot content', () => {
    const wrapper = createWrapper({}, {
      default: '<div data-testid="slot-content">Auth form content</div>',
    });
    
    expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Auth form content');
  });

  it('renders complex slot content', () => {
    const wrapper = createWrapper({}, {
      default: `
        <form data-testid="auth-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>
      `,
    });
    
    expect(wrapper.find('[data-testid="auth-form"]').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('handles empty slot content gracefully', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="auth-split-layout"]').exists()).toBe(true);
  });
});
