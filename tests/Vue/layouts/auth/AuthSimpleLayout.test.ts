import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AuthSimpleLayout from '@/layouts/auth/AuthSimpleLayout.vue';

// Mock Inertia
const mockRoute = vi.fn();

vi.mock('@inertiajs/vue3', () => ({
  Link: {
    name: 'Link',
    props: ['href'],
    template: '<a :href="href"><slot /></a>',
  },
}));

// Mock AppLogoIcon
vi.mock('@/components/AppLogoIcon.vue', () => ({
  default: {
    name: 'AppLogoIcon',
    template: '<div data-testid="app-logo-icon" :class="$attrs.class"></div>',
  },
}));

describe('AuthSimpleLayout', () => {
  beforeEach(() => {
    mockRoute.mockReturnValue('/');
    global.route = mockRoute;
  });

  const createWrapper = (props = {}, slots = {}) => {
    return mount(AuthSimpleLayout, {
      props,
      slots,
      global: {
        mocks: {
          route: mockRoute,
        },
      },
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-logo-icon"]').exists()).toBe(true);
  });

  it('displays title when provided', () => {
    const title = 'Login to your account';
    const wrapper = createWrapper({ title });
    
    const titleElement = wrapper.find('h1');
    expect(titleElement.exists()).toBe(true);
    expect(titleElement.text()).toBe(title);
  });

  it('displays description when provided', () => {
    const description = 'Enter your credentials to access your account';
    const wrapper = createWrapper({ description });
    
    const descriptionElement = wrapper.find('p.text-muted-foreground');
    expect(descriptionElement.exists()).toBe(true);
    expect(descriptionElement.text()).toBe(description);
  });

  it('displays both title and description', () => {
    const title = 'Create an account';
    const description = 'Sign up to get started';
    const wrapper = createWrapper({ title, description });
    
    expect(wrapper.find('h1').text()).toBe(title);
    expect(wrapper.find('p.text-muted-foreground').text()).toBe(description);
  });

  it('displays title in screen reader text', () => {
    const title = 'Login Form';
    const wrapper = createWrapper({ title });
    
    const srText = wrapper.find('.sr-only');
    expect(srText.exists()).toBe(true);
    expect(srText.text()).toBe(title);
  });

  it('does not display title when not provided', () => {
    const wrapper = createWrapper();
    const titleElement = wrapper.find('h1');
    expect(titleElement.text()).toBe('');
  });

  it('does not display description when not provided', () => {
    const wrapper = createWrapper();
    const descriptionElement = wrapper.find('p.text-muted-foreground');
    expect(descriptionElement.text()).toBe('');
  });

  it('renders slot content', () => {
    const wrapper = createWrapper({}, {
      default: '<div data-testid="slot-content">Auth form content</div>',
    });
    
    expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Auth form content');
  });

  it('applies correct CSS classes to logo icon', () => {
    const wrapper = createWrapper();
    const logoIcon = wrapper.find('[data-testid="app-logo-icon"]');
    expect(logoIcon.classes()).toContain('size-9');
    expect(logoIcon.classes()).toContain('fill-current');
    expect(logoIcon.classes()).toContain('text-[var(--foreground)]');
    expect(logoIcon.classes()).toContain('dark:text-white');
  });

  it('creates link to home route', () => {
    mockRoute.mockReturnValue('/home');
    const wrapper = createWrapper();
    
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('/home');
    expect(mockRoute).toHaveBeenCalledWith('home');
  });

  it('applies correct CSS classes to title', () => {
    const wrapper = createWrapper({ title: 'Test Title' });
    const titleElement = wrapper.find('h1');
    expect(titleElement.classes()).toContain('text-xl');
    expect(titleElement.classes()).toContain('font-medium');
  });

  it('applies correct CSS classes to description', () => {
    const wrapper = createWrapper({ description: 'Test Description' });
    const descriptionElement = wrapper.find('p.text-muted-foreground');
    expect(descriptionElement.classes()).toContain('text-muted-foreground');
    expect(descriptionElement.classes()).toContain('text-center');
    expect(descriptionElement.classes()).toContain('text-sm');
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
  });

  it('maintains correct layout structure', () => {
    const wrapper = createWrapper({ title: 'Test', description: 'Test desc' });
    
    // Check that logo, title, and description are in the correct container
    const container = wrapper.find('.w-full.max-w-sm');
    expect(container.exists()).toBe(true);
    
    const flexCol = container.find('.flex.flex-col.gap-8');
    expect(flexCol.exists()).toBe(true);
    
    const itemsCenter = flexCol.find('.flex.flex-col.items-center.gap-4');
    expect(itemsCenter.exists()).toBe(true);
  });

  it('handles undefined props gracefully', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('');
    expect(wrapper.find('p.text-muted-foreground').text()).toBe('');
    expect(wrapper.find('.sr-only').text()).toBe('');
  });
});
