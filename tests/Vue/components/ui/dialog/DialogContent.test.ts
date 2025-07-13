import { DialogContent } from '@/components/ui/dialog';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// Mock reka-ui components
vi.mock('reka-ui', () => {
  const { markRaw } = require('vue');
  return {
    DialogPortal: markRaw({
      name: 'DialogPortal',
      template: '<div data-slot="dialog-portal"><slot /></div>',
    }),
    DialogOverlay: markRaw({
      name: 'DialogOverlay',
      template: '<div data-slot="dialog-overlay" />',
    }),
    DialogContent: markRaw({
      name: 'DialogContent',
      props: ['class'],
      template: '<div :class="$props.class" data-slot="dialog-content"><slot /></div>',
    }),
    DialogClose: markRaw({
      name: 'DialogClose',
      props: ['class'],
      template: '<button :class="$props.class" data-slot="dialog-close"><slot /></button>',
    }),
    useForwardPropsEmits: vi.fn((props, emits) => ({ ...props, ...emits })),
  };
});

// Mock lucide icon
vi.mock('lucide-vue-next', () => {
  const { markRaw } = require('vue');
  return {
    X: markRaw({
      name: 'X',
      template: '<svg data-testid="x-icon"><path /></svg>',
    }),
  };
});

describe('DialogContent', () => {
  it('covers delegatedProps computed property with class prop', () => {
    const wrapper = mount(DialogContent, {
      props: {
        class: 'custom-dialog-class',
      },
    });

    expect(wrapper.find('[data-slot="dialog-content"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="dialog-content"]').classes()).toContain('custom-dialog-class');
  });

  it('covers delegatedProps destructuring lines 12-14', () => {
    const wrapper = mount(DialogContent, {
      props: {
        class: 'test-destructuring-class',
        'data-testid': 'test-dialog',
      },
    });

    // This test specifically ensures the destructuring in lines 12-14 is executed
    expect(wrapper.find('[data-slot="dialog-content"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="dialog-content"]').classes()).toContain('test-destructuring-class');

    // Verify the component has the class prop
    expect(wrapper.vm.$props.class).toBe('test-destructuring-class');
  });

  it('renders with default structure', () => {
    const wrapper = mount(DialogContent);

    expect(wrapper.find('[data-slot="dialog-portal"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="dialog-overlay"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="dialog-content"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="dialog-close"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="x-icon"]').exists()).toBe(true);
  });
});
