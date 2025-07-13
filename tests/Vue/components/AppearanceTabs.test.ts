import AppearanceTabs from '@/components/AppearanceTabs.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// Mock the composable
const mockUpdateAppearance = vi.fn();
vi.mock('@/composables/useAppearance', () => ({
  useAppearance: () => ({
    appearance: 'light',
    updateAppearance: mockUpdateAppearance,
  }),
}));

// Mock lucide icons - create non-reactive components
vi.mock('lucide-vue-next', () => {
  const { markRaw } = require('vue');
  return {
    Monitor: markRaw({
      name: 'Monitor',
      props: ['class'],
      template: '<svg :class="$props.class" data-testid="monitor-icon"><rect /></svg>',
    }),
    Moon: markRaw({
      name: 'Moon',
      props: ['class'],
      template: '<svg :class="$props.class" data-testid="moon-icon"><circle /></svg>',
    }),
    Sun: markRaw({
      name: 'Sun',
      props: ['class'],
      template: '<svg :class="$props.class" data-testid="sun-icon"><circle /></svg>',
    }),
  };
});

describe('AppearanceTabs', () => {
  const createWrapper = (props = {}) => {
    return mount(AppearanceTabs, {
      props,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
  });

  it('renders all three appearance tabs', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(3);
  });

  it('renders light tab with correct icon and label', () => {
    const wrapper = createWrapper();
    const lightButton = wrapper.findAll('button')[0];
    expect(lightButton.find('[data-testid="sun-icon"]').exists()).toBe(true);
    expect(lightButton.text()).toContain('Light');
  });

  it('renders dark tab with correct icon and label', () => {
    const wrapper = createWrapper();
    const darkButton = wrapper.findAll('button')[1];
    expect(darkButton.find('[data-testid="moon-icon"]').exists()).toBe(true);
    expect(darkButton.text()).toContain('Dark');
  });

  it('renders system tab with correct icon and label', () => {
    const wrapper = createWrapper();
    const systemButton = wrapper.findAll('button')[2];
    expect(systemButton.find('[data-testid="monitor-icon"]').exists()).toBe(true);
    expect(systemButton.text()).toContain('System');
  });

  it('applies container class prop', () => {
    const customClass = 'custom-class';
    const wrapper = createWrapper({ class: customClass });
    const container = wrapper.find('div');
    expect(container.classes()).toContain(customClass);
  });

  it('has default container classes', () => {
    const wrapper = createWrapper();
    const container = wrapper.find('div');
    expect(container.classes()).toContain('inline-flex');
    expect(container.classes()).toContain('gap-1');
    expect(container.classes()).toContain('rounded-lg');
    expect(container.classes()).toContain('bg-neutral-100');
    expect(container.classes()).toContain('p-1');
    expect(container.classes()).toContain('dark:bg-neutral-800');
  });

  it('calls updateAppearance when light button is clicked', async () => {
    const wrapper = createWrapper();
    const lightButton = wrapper.findAll('button')[0];
    await lightButton.trigger('click');
    expect(mockUpdateAppearance).toHaveBeenCalledWith('light');
  });

  it('calls updateAppearance when dark button is clicked', async () => {
    const wrapper = createWrapper();
    const darkButton = wrapper.findAll('button')[1];
    await darkButton.trigger('click');
    expect(mockUpdateAppearance).toHaveBeenCalledWith('dark');
  });

  it('calls updateAppearance when system button is clicked', async () => {
    const wrapper = createWrapper();
    const systemButton = wrapper.findAll('button')[2];
    await systemButton.trigger('click');
    expect(mockUpdateAppearance).toHaveBeenCalledWith('system');
  });

  it('applies active styles to current appearance', () => {
    const wrapper = createWrapper();
    const lightButton = wrapper.findAll('button')[0]; // light is active by default
    expect(lightButton.classes()).toContain('bg-white');
    expect(lightButton.classes()).toContain('shadow-xs');
    expect(lightButton.classes()).toContain('dark:bg-neutral-700');
  });

  it('applies inactive styles to non-current appearances', () => {
    const wrapper = createWrapper();
    const darkButton = wrapper.findAll('button')[1]; // dark is not active
    expect(darkButton.classes()).toContain('text-neutral-500');
    expect(darkButton.classes()).toContain('hover:bg-neutral-200/60');
    expect(darkButton.classes()).toContain('hover:text-black');
  });

  it('has correct button structure and classes', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll('button');

    buttons.forEach((button) => {
      expect(button.classes()).toContain('flex');
      expect(button.classes()).toContain('items-center');
      expect(button.classes()).toContain('rounded-md');
      expect(button.classes()).toContain('px-3.5');
      expect(button.classes()).toContain('py-1.5');
      expect(button.classes()).toContain('transition-colors');
    });
  });

  it('renders icons with correct classes', () => {
    const wrapper = createWrapper();
    const icons = wrapper.findAll('svg');

    icons.forEach((icon) => {
      expect(icon.classes()).toContain('-ml-1');
      expect(icon.classes()).toContain('h-4');
      expect(icon.classes()).toContain('w-4');
    });
  });

  it('renders labels with correct classes', () => {
    const wrapper = createWrapper();
    const labels = wrapper.findAll('span');

    labels.forEach((label) => {
      expect(label.classes()).toContain('ml-1.5');
      expect(label.classes()).toContain('text-sm');
    });
  });
});
