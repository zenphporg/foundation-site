import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// Mock reka-ui components
vi.mock('reka-ui', () => {
  const { markRaw } = require('vue');
  return {
    DropdownMenuPortal: markRaw({
      name: 'DropdownMenuPortal',
      template: '<div data-slot="dropdown-portal"><slot /></div>',
    }),
    DropdownMenuContent: markRaw({
      name: 'DropdownMenuContent',
      props: ['class', 'sideOffset', 'alignOffset'],
      template: '<div :class="$props.class" data-slot="dropdown-menu-content"><slot /></div>',
    }),
    useForwardPropsEmits: vi.fn((props, emits) => ({ ...props, ...emits })),
  };
});

describe('DropdownMenuContent', () => {
  it('covers delegatedProps computed property with class prop', () => {
    const wrapper = mount(DropdownMenuContent, {
      props: {
        class: 'custom-dropdown-class',
        sideOffset: 4,
        alignOffset: 0,
      },
    });

    expect(wrapper.find('[data-slot="dropdown-menu-content"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="dropdown-menu-content"]').classes()).toContain('custom-dropdown-class');
  });

  it('renders with default structure', () => {
    const wrapper = mount(DropdownMenuContent);

    expect(wrapper.find('[data-slot="dropdown-portal"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="dropdown-menu-content"]').exists()).toBe(true);
  });
});
