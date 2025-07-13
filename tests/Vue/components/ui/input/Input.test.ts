import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { Input } from '@/components/ui/input';

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
  useVModel: vi.fn((props, key, emit, options) => {
    const { ref, computed } = require('vue');
    const value = ref(options?.defaultValue || props[key] || '');
    
    return computed({
      get: () => value.value,
      set: (newValue) => {
        value.value = newValue;
        emit(`update:${key}`, newValue);
      },
    });
  }),
}));

// Mock utils
vi.mock('@/lib/utils', () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(' ')),
}));

describe('Input', () => {
  const createWrapper = (props = {}) => {
    return mount(Input, {
      props,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('has correct data-slot attribute', () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');
    expect(input.attributes('data-slot')).toBe('input');
  });

  it('renders with default classes', () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');
    expect(input.classes()).toContain('flex');
    expect(input.classes()).toContain('h-9');
    expect(input.classes()).toContain('w-full');
    expect(input.classes()).toContain('rounded-md');
    expect(input.classes()).toContain('border');
  });

  it('applies custom class prop', () => {
    const customClass = 'custom-input-class';
    const wrapper = createWrapper({ class: customClass });
    const input = wrapper.find('input');
    expect(input.classes()).toContain(customClass);
  });

  it('handles modelValue prop', () => {
    const wrapper = createWrapper({ modelValue: 'test value' });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('test value');
  });

  it('handles defaultValue prop', () => {
    const wrapper = createWrapper({ defaultValue: 'default text' });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('default text');
  });

  it('emits update:modelValue when input changes', async () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');
    
    await input.setValue('new value');
    
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value']);
  });

  it('handles numeric values', () => {
    const wrapper = createWrapper({ modelValue: 123 });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('123');
  });

  it('emits numeric values when changed', async () => {
    const wrapper = createWrapper({ modelValue: 0 });
    const input = wrapper.find('input');
    
    await input.setValue('456');
    
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['456']);
  });

  it('handles disabled state', () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');
    
    // The disabled state is handled via CSS classes
    expect(input.classes()).toContain('disabled:pointer-events-none');
    expect(input.classes()).toContain('disabled:cursor-not-allowed');
    expect(input.classes()).toContain('disabled:opacity-50');
  });

  it('has focus styles', () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');
    
    expect(input.classes()).toContain('focus-visible:border-ring');
    expect(input.classes()).toContain('focus-visible:ring-ring/50');
    expect(input.classes()).toContain('focus-visible:ring-[3px]');
  });

  it('has validation styles', () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');
    
    expect(input.classes()).toContain('aria-invalid:ring-destructive/20');
    expect(input.classes()).toContain('dark:aria-invalid:ring-destructive/40');
    expect(input.classes()).toContain('aria-invalid:border-destructive');
  });

  it('has file input styles', () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');
    
    expect(input.classes()).toContain('file:text-foreground');
    expect(input.classes()).toContain('file:inline-flex');
    expect(input.classes()).toContain('file:h-7');
    expect(input.classes()).toContain('file:border-0');
    expect(input.classes()).toContain('file:bg-transparent');
  });

  it('has placeholder styles', () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');
    
    expect(input.classes()).toContain('placeholder:text-muted-foreground');
  });

  it('has selection styles', () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');
    
    expect(input.classes()).toContain('selection:bg-primary');
    expect(input.classes()).toContain('selection:text-primary-foreground');
  });

  it('handles v-model correctly', async () => {
    const wrapper = createWrapper({ modelValue: 'initial' });
    const input = wrapper.find('input');
    
    expect(input.element.value).toBe('initial');
    
    await input.setValue('updated');
    await nextTick();
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('maintains input element properties', () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');
    
    expect(input.element.tagName).toBe('INPUT');
    expect(input.attributes('data-slot')).toBe('input');
  });
});
