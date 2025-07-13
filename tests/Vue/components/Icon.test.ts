import Icon from '@/Components/Icon.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// Mock the utils
vi.mock('@/lib/utils', () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(' ')),
}));

// Mock lucide-vue-next icons
vi.mock('lucide-vue-next', () => ({
  Home: {
    name: 'Home',
    props: ['class', 'size', 'strokeWidth', 'color'],
    template:
      '<svg :class="$props.class" :size="$props.size" :stroke-width="$props.strokeWidth" :color="$props.color" class="home-icon"><path /></svg>',
  },
  User: {
    name: 'User',
    props: ['class', 'size', 'strokeWidth', 'color'],
    template:
      '<svg :class="$props.class" :size="$props.size" :stroke-width="$props.strokeWidth" :color="$props.color" class="user-icon"><path /></svg>',
  },
  Settings: {
    name: 'Settings',
    props: ['class', 'size', 'strokeWidth', 'color'],
    template:
      '<svg :class="$props.class" :size="$props.size" :stroke-width="$props.strokeWidth" :color="$props.color" class="settings-icon"><path /></svg>',
  },
}));

describe('Icon', () => {
  it('renders correctly with icon name', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'home',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('capitalizes icon name correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'home',
      },
    });

    // Should render the Home component
    expect(wrapper.find('.home-icon').exists()).toBe(true);
  });

  it('applies default classes', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'user',
      },
    });

    expect(wrapper.classes()).toContain('h-4');
    expect(wrapper.classes()).toContain('w-4');
  });

  it('applies custom class', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'user',
        class: 'custom-class',
      },
    });

    expect(wrapper.classes()).toContain('h-4');
    expect(wrapper.classes()).toContain('w-4');
    expect(wrapper.classes()).toContain('custom-class');
  });

  it('passes size prop correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'settings',
        size: 24,
      },
    });

    expect(wrapper.attributes('size')).toBe('24');
  });

  it('passes string size prop correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'settings',
        size: '32',
      },
    });

    expect(wrapper.attributes('size')).toBe('32');
  });

  it('passes color prop correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'user',
        color: 'red',
      },
    });

    expect(wrapper.attributes('color')).toBe('red');
  });

  it('passes strokeWidth prop correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'home',
        strokeWidth: 3,
      },
    });

    expect(wrapper.attributes('stroke-width')).toBe('3');
  });

  it('passes string strokeWidth prop correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'home',
        strokeWidth: '1.5',
      },
    });

    expect(wrapper.attributes('stroke-width')).toBe('1.5');
  });

  it('uses default values when props not provided', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'user',
      },
    });

    expect(wrapper.attributes('size')).toBe('16');
    expect(wrapper.attributes('stroke-width')).toBe('2');
    expect(wrapper.attributes('color')).toBeUndefined();
  });

  it('handles multi-word icon names', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'settings',
      },
    });

    // Should render the Settings component
    expect(wrapper.find('.settings-icon').exists()).toBe(true);
  });

  it('combines multiple classes correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'home',
        class: 'text-red-500 hover:text-red-600',
      },
    });

    expect(wrapper.classes()).toContain('h-4');
    expect(wrapper.classes()).toContain('w-4');
    expect(wrapper.classes()).toContain('text-red-500');
    expect(wrapper.classes()).toContain('hover:text-red-600');
  });
});
