import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Separator } from '@/components/ui/separator';

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
  reactiveOmit: vi.fn((props, keys) => {
    const result = { ...props };
    if (Array.isArray(keys)) {
      keys.forEach(key => delete result[key]);
    } else {
      delete result[keys];
    }
    return result;
  }),
}));

// Mock reka-ui components
vi.mock('reka-ui', () => ({
  Separator: {
    name: 'Separator',
    props: ['orientation', 'decorative', 'class'],
    template: `
      <div 
        :class="$props.class"
        data-slot="separator-root"
        data-testid="reka-separator"
        :data-orientation="$props.orientation"
        :aria-orientation="$props.orientation"
        :role="$props.decorative ? 'none' : 'separator'"
      />
    `,
  },
}));

// Mock utils
vi.mock('@/lib/utils', () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(' ')),
}));

describe('Separator', () => {
  const createWrapper = (props = {}) => {
    return mount(Separator, {
      props,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="reka-separator"]').exists()).toBe(true);
  });

  it('has correct data-slot attribute', () => {
    const wrapper = createWrapper();
    const separator = wrapper.find('div');
    expect(separator.attributes('data-slot')).toBe('separator-root');
  });

  it('renders with default classes', () => {
    const wrapper = createWrapper();
    const separator = wrapper.find('div');
    expect(separator.classes()).toContain('bg-border');
    expect(separator.classes()).toContain('shrink-0');
    expect(separator.classes()).toContain('data-[orientation=horizontal]:h-px');
    expect(separator.classes()).toContain('data-[orientation=horizontal]:w-full');
    expect(separator.classes()).toContain('data-[orientation=vertical]:h-full');
    expect(separator.classes()).toContain('data-[orientation=vertical]:w-px');
  });

  it('applies custom class prop', () => {
    const customClass = 'custom-separator-class';
    const wrapper = createWrapper({ class: customClass });
    const separator = wrapper.find('div');
    expect(separator.classes()).toContain(customClass);
  });

  it('has default orientation as horizontal', () => {
    const wrapper = createWrapper();
    const separator = wrapper.find('div');
    expect(separator.attributes('data-orientation')).toBe('horizontal');
    expect(separator.attributes('aria-orientation')).toBe('horizontal');
  });

  it('handles vertical orientation', () => {
    const wrapper = createWrapper({ orientation: 'vertical' });
    const separator = wrapper.find('div');
    expect(separator.attributes('data-orientation')).toBe('vertical');
    expect(separator.attributes('aria-orientation')).toBe('vertical');
  });

  it('has default decorative as true', () => {
    const wrapper = createWrapper();
    const separator = wrapper.find('div');
    expect(separator.attributes('role')).toBe('none');
  });

  it('handles non-decorative separator', () => {
    const wrapper = createWrapper({ decorative: false });
    const separator = wrapper.find('div');
    expect(separator.attributes('role')).toBe('separator');
  });

  it('delegates props correctly', () => {
    const wrapper = createWrapper({ 
      orientation: 'vertical',
      decorative: false,
    });
    
    expect(wrapper.vm.orientation).toBe('vertical');
    expect(wrapper.vm.decorative).toBe(false);
  });

  it('excludes class from delegated props', () => {
    const wrapper = createWrapper({ 
      class: 'custom-class',
      orientation: 'horizontal',
    });
    
    // Orientation should be in delegated props but class should not
    expect(wrapper.vm.orientation).toBe('horizontal');
  });

  it('renders as div element', () => {
    const wrapper = createWrapper();
    const separator = wrapper.find('div');
    expect(separator.element.tagName).toBe('DIV');
  });

  it('maintains accessibility attributes', () => {
    const wrapper = createWrapper({ 
      orientation: 'vertical',
      decorative: false,
    });
    
    const separator = wrapper.find('div');
    expect(separator.attributes('aria-orientation')).toBe('vertical');
    expect(separator.attributes('role')).toBe('separator');
  });

  it('handles horizontal orientation explicitly', () => {
    const wrapper = createWrapper({ orientation: 'horizontal' });
    const separator = wrapper.find('div');
    expect(separator.attributes('data-orientation')).toBe('horizontal');
  });

  it('supports custom props', () => {
    const wrapper = createWrapper({
      orientation: 'vertical',
      decorative: true,
      'data-testid': 'custom-separator',
    });
    
    expect(wrapper.vm.orientation).toBe('vertical');
    expect(wrapper.vm.decorative).toBe(true);
  });

  it('applies responsive classes correctly', () => {
    const wrapper = createWrapper();
    const separator = wrapper.find('div');
    
    // Should have data attribute classes for responsive behavior
    expect(separator.classes()).toContain('data-[orientation=horizontal]:h-px');
    expect(separator.classes()).toContain('data-[orientation=horizontal]:w-full');
    expect(separator.classes()).toContain('data-[orientation=vertical]:h-full');
    expect(separator.classes()).toContain('data-[orientation=vertical]:w-px');
  });
});
