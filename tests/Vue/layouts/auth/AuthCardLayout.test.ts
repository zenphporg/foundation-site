import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AuthCardLayout from '@/layouts/auth/AuthCardLayout.vue';

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

// Mock UI components
vi.mock('@/components/ui/card', () => ({
  Card: {
    name: 'Card',
    template: '<div data-testid="card" :class="$attrs.class"><slot /></div>',
  },
  CardContent: {
    name: 'CardContent',
    template: '<div data-testid="card-content" :class="$attrs.class"><slot /></div>',
  },
  CardDescription: {
    name: 'CardDescription',
    template: '<div data-testid="card-description"><slot /></div>',
  },
  CardHeader: {
    name: 'CardHeader',
    template: '<div data-testid="card-header" :class="$attrs.class"><slot /></div>',
  },
  CardTitle: {
    name: 'CardTitle',
    template: '<h1 data-testid="card-title" :class="$attrs.class"><slot /></h1>',
  },
}));

describe('AuthCardLayout', () => {
  beforeEach(() => {
    mockRoute.mockReturnValue('/');
    global.route = mockRoute;
  });

  const createWrapper = (props = {}, slots = {}) => {
    return mount(AuthCardLayout, {
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
    expect(wrapper.find('[data-testid="card"]').exists()).toBe(true);
  });

  it('displays title when provided', () => {
    const title = 'Login to your account';
    const wrapper = createWrapper({ title });
    
    const cardTitle = wrapper.find('[data-testid="card-title"]');
    expect(cardTitle.exists()).toBe(true);
    expect(cardTitle.text()).toBe(title);
  });

  it('displays description when provided', () => {
    const description = 'Enter your credentials to access your account';
    const wrapper = createWrapper({ description });
    
    const cardDescription = wrapper.find('[data-testid="card-description"]');
    expect(cardDescription.exists()).toBe(true);
    expect(cardDescription.text()).toBe(description);
  });

  it('displays both title and description', () => {
    const title = 'Create an account';
    const description = 'Sign up to get started';
    const wrapper = createWrapper({ title, description });
    
    expect(wrapper.find('[data-testid="card-title"]').text()).toBe(title);
    expect(wrapper.find('[data-testid="card-description"]').text()).toBe(description);
  });

  it('does not display title when not provided', () => {
    const wrapper = createWrapper();
    const cardTitle = wrapper.find('[data-testid="card-title"]');
    expect(cardTitle.text()).toBe('');
  });

  it('does not display description when not provided', () => {
    const wrapper = createWrapper();
    const cardDescription = wrapper.find('[data-testid="card-description"]');
    expect(cardDescription.text()).toBe('');
  });

  it('renders slot content in card content', () => {
    const wrapper = createWrapper({}, {
      default: '<div data-testid="slot-content">Auth form content</div>',
    });
    
    const cardContent = wrapper.find('[data-testid="card-content"]');
    expect(cardContent.find('[data-testid="slot-content"]').exists()).toBe(true);
    expect(cardContent.text()).toContain('Auth form content');
  });

  it('applies correct CSS classes to logo icon', () => {
    const wrapper = createWrapper();
    const logoIcon = wrapper.find('[data-testid="app-logo-icon"]');
    expect(logoIcon.classes()).toContain('size-9');
    expect(logoIcon.classes()).toContain('fill-current');
    expect(logoIcon.classes()).toContain('text-black');
    expect(logoIcon.classes()).toContain('dark:text-white');
  });

  it('creates link to home route', () => {
    mockRoute.mockReturnValue('/home');
    const wrapper = createWrapper();
    
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('/home');
    expect(mockRoute).toHaveBeenCalledWith('home');
  });

  it('applies correct CSS classes to card', () => {
    const wrapper = createWrapper();
    const card = wrapper.find('[data-testid="card"]');
    expect(card.classes()).toContain('rounded-xl');
  });

  it('applies correct CSS classes to card header', () => {
    const wrapper = createWrapper();
    const cardHeader = wrapper.find('[data-testid="card-header"]');
    expect(cardHeader.classes()).toContain('px-10');
    expect(cardHeader.classes()).toContain('pt-8');
    expect(cardHeader.classes()).toContain('pb-0');
    expect(cardHeader.classes()).toContain('text-center');
  });

  it('applies correct CSS classes to card title', () => {
    const wrapper = createWrapper({ title: 'Test Title' });
    const cardTitle = wrapper.find('[data-testid="card-title"]');
    expect(cardTitle.classes()).toContain('text-xl');
  });

  it('applies correct CSS classes to card content', () => {
    const wrapper = createWrapper();
    const cardContent = wrapper.find('[data-testid="card-content"]');
    expect(cardContent.classes()).toContain('px-10');
    expect(cardContent.classes()).toContain('py-8');
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
    
    const cardContent = wrapper.find('[data-testid="card-content"]');
    expect(cardContent.find('[data-testid="auth-form"]').exists()).toBe(true);
    expect(cardContent.find('input[type="email"]').exists()).toBe(true);
    expect(cardContent.find('input[type="password"]').exists()).toBe(true);
    expect(cardContent.find('button[type="submit"]').exists()).toBe(true);
  });

  it('handles empty slot content gracefully', () => {
    const wrapper = createWrapper();
    const cardContent = wrapper.find('[data-testid="card-content"]');
    expect(cardContent.exists()).toBe(true);
  });
});
