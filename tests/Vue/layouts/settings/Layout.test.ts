import SettingsLayout from '@/layouts/settings/Layout.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// Mock Inertia
const mockUsePage = vi.fn();

vi.mock('@inertiajs/vue3', () => ({
  usePage: () => mockUsePage(),
  Link: {
    name: 'Link',
    props: ['href'],
    template: '<a :href="href"><slot /></a>',
  },
}));

// Mock components
vi.mock('@/components/Heading.vue', () => ({
  default: {
    name: 'Heading',
    props: ['title', 'description'],
    template: '<div data-testid="heading" :data-title="title" :data-description="description"></div>',
  },
}));

vi.mock('@/components/ui/button', () => ({
  Button: {
    name: 'Button',
    props: ['variant', 'asChild'],
    template: '<button data-testid="button" :data-variant="variant" :data-as-child="asChild" :class="$attrs.class"><slot /></button>',
  },
}));

vi.mock('@/components/ui/separator', () => ({
  Separator: {
    name: 'Separator',
    template: '<div data-testid="separator" :class="$attrs.class"></div>',
  },
}));

describe('SettingsLayout', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: {
        ziggy: {
          location: 'https://example.com/settings/profile',
        },
      },
    });
  });

  const createWrapper = (slots = {}) => {
    return mount(SettingsLayout, {
      slots,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="heading"]').exists()).toBe(true);
  });

  it('displays correct heading title and description', () => {
    const wrapper = createWrapper();
    const heading = wrapper.find('[data-testid="heading"]');
    expect(heading.attributes('data-title')).toBe('Settings');
    expect(heading.attributes('data-description')).toBe('Manage your profile and account settings');
  });

  it('renders all navigation items', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('[data-testid="button"]');
    expect(buttons).toHaveLength(3);

    const links = wrapper.findAll('a');
    expect(links).toHaveLength(3);
    expect(links[0].attributes('href')).toBe('/settings/profile');
    expect(links[1].attributes('href')).toBe('/settings/password');
    expect(links[2].attributes('href')).toBe('/settings/appearance');
  });

  it('displays correct navigation item titles', () => {
    const wrapper = createWrapper();
    const links = wrapper.findAll('a');
    expect(links[0].text()).toBe('Profile');
    expect(links[1].text()).toBe('Password');
    expect(links[2].text()).toBe('Appearance');
  });

  it('applies ghost variant to all buttons', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('[data-testid="button"]');
    buttons.forEach((button) => {
      expect(button.attributes('data-variant')).toBe('ghost');
    });
  });

  it('applies as-child prop to all buttons', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('[data-testid="button"]');
    buttons.forEach((button) => {
      expect(button.attributes('data-as-child')).toBe('');
    });
  });

  it('highlights active navigation item based on current path', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('[data-testid="button"]');

    // First button should be active (profile page)
    expect(buttons[0].classes()).toContain('bg-muted');
    expect(buttons[1].classes()).not.toContain('bg-muted');
    expect(buttons[2].classes()).not.toContain('bg-muted');
  });

  it('highlights different navigation item when path changes', () => {
    mockUsePage.mockReturnValue({
      props: {
        ziggy: {
          location: 'https://example.com/settings/password',
        },
      },
    });

    const wrapper = createWrapper();
    const buttons = wrapper.findAll('[data-testid="button"]');

    // Second button should be active (password page)
    expect(buttons[0].classes()).not.toContain('bg-muted');
    expect(buttons[1].classes()).toContain('bg-muted');
    expect(buttons[2].classes()).not.toContain('bg-muted');
  });

  it('handles missing ziggy location gracefully', () => {
    mockUsePage.mockReturnValue({
      props: {
        ziggy: null,
      },
    });

    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);

    const buttons = wrapper.findAll('[data-testid="button"]');
    buttons.forEach((button) => {
      expect(button.classes()).not.toContain('bg-muted');
    });
  });

  it('handles missing ziggy props gracefully', () => {
    mockUsePage.mockReturnValue({
      props: {},
    });

    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);

    const buttons = wrapper.findAll('[data-testid="button"]');
    buttons.forEach((button) => {
      expect(button.classes()).not.toContain('bg-muted');
    });
  });

  it('renders separator with correct classes', () => {
    const wrapper = createWrapper();
    const separator = wrapper.find('[data-testid="separator"]');
    expect(separator.exists()).toBe(true);
    expect(separator.classes()).toContain('my-6');
    expect(separator.classes()).toContain('md:hidden');
  });

  it('renders slot content', () => {
    const wrapper = createWrapper({
      default: '<div data-testid="slot-content">Settings content</div>',
    });

    expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Settings content');
  });

  it('applies correct CSS classes to navigation buttons', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('[data-testid="button"]');

    buttons.forEach((button) => {
      expect(button.classes()).toContain('w-full');
      expect(button.classes()).toContain('justify-start');
    });
  });

  it('renders complex slot content', () => {
    const wrapper = createWrapper({
      default: `
        <form data-testid="settings-form">
          <input type="text" placeholder="Name" />
          <button type="submit">Save</button>
        </form>
      `,
    });

    expect(wrapper.find('[data-testid="settings-form"]').exists()).toBe(true);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('handles empty slot content gracefully', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  it('maintains correct layout structure', () => {
    const wrapper = createWrapper();

    // Check main container
    const mainContainer = wrapper.find('.px-4.py-6');
    expect(mainContainer.exists()).toBe(true);

    // Check flex layout
    const flexContainer = wrapper.find('.flex.flex-col.space-y-8');
    expect(flexContainer.exists()).toBe(true);

    // Check aside navigation
    const aside = wrapper.find('aside');
    expect(aside.exists()).toBe(true);
    expect(aside.classes()).toContain('w-full');
    expect(aside.classes()).toContain('max-w-xl');
    expect(aside.classes()).toContain('lg:w-48');

    // Check content section
    const contentSection = wrapper.find('section');
    expect(contentSection.exists()).toBe(true);
    expect(contentSection.classes()).toContain('max-w-xl');
    expect(contentSection.classes()).toContain('space-y-12');
  });
});
