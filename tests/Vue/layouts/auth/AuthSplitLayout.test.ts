import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AuthSplitLayout from '@/layouts/auth/AuthSplitLayout.vue';

// Mock Inertia
const mockUsePage = vi.fn();
const mockRoute = vi.fn();

vi.mock('@inertiajs/vue3', () => ({
  usePage: () => mockUsePage(),
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

describe('AuthSplitLayout', () => {
  beforeEach(() => {
    mockRoute.mockReturnValue('/');
    global.route = mockRoute;
    
    mockUsePage.mockReturnValue({
      props: {
        name: 'Test App',
        quote: {
          message: 'This is a test quote',
          author: 'Test Author',
        },
      },
    });
  });

  const createWrapper = (props = {}, slots = {}) => {
    return mount(AuthSplitLayout, {
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

  it('displays app name from page props', () => {
    const wrapper = createWrapper();
    const link = wrapper.find('a');
    expect(link.text()).toContain('Test App');
  });

  it('displays quote when provided', () => {
    const wrapper = createWrapper();
    const blockquote = wrapper.find('blockquote');
    expect(blockquote.exists()).toBe(true);
    expect(blockquote.text()).toContain('This is a test quote');
    expect(blockquote.text()).toContain('Test Author');
  });

  it('does not display quote when not provided', () => {
    mockUsePage.mockReturnValue({
      props: {
        name: 'Test App',
        quote: null,
      },
    });

    const wrapper = createWrapper();
    const blockquote = wrapper.find('blockquote');
    expect(blockquote.exists()).toBe(false);
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

  it('does not display title when not provided', () => {
    const wrapper = createWrapper();
    const titleElement = wrapper.find('h1');
    expect(titleElement.exists()).toBe(false);
  });

  it('does not display description when not provided', () => {
    const wrapper = createWrapper();
    const descriptionElement = wrapper.find('p.text-muted-foreground');
    expect(descriptionElement.exists()).toBe(false);
  });

  it('renders slot content', () => {
    const wrapper = createWrapper({}, {
      default: '<div data-testid="slot-content">Auth form content</div>',
    });
    
    expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Auth form content');
  });

  it('creates link to home route', () => {
    mockRoute.mockReturnValue('/home');
    const wrapper = createWrapper();
    
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('/home');
    expect(mockRoute).toHaveBeenCalledWith('home');
  });

  it('applies correct CSS classes to logo icon', () => {
    const wrapper = createWrapper();
    const logoIcon = wrapper.find('[data-testid="app-logo-icon"]');
    expect(logoIcon.classes()).toContain('mr-2');
    expect(logoIcon.classes()).toContain('size-8');
    expect(logoIcon.classes()).toContain('fill-current');
    expect(logoIcon.classes()).toContain('text-white');
  });

  it('maintains correct layout structure', () => {
    const wrapper = createWrapper();
    
    // Check main grid container
    const mainContainer = wrapper.find('.relative.grid.h-dvh');
    expect(mainContainer.exists()).toBe(true);
    
    // Check left panel (hidden on mobile)
    const leftPanel = wrapper.find('.bg-muted.relative.hidden');
    expect(leftPanel.exists()).toBe(true);
    
    // Check right panel
    const rightPanel = wrapper.find('.lg\\:p-8');
    expect(rightPanel.exists()).toBe(true);
  });
});
