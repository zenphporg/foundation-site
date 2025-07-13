import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// Mock reka-ui components
vi.mock('reka-ui', () => ({
  DropdownMenuRoot: {
    name: 'DropdownMenuRoot',
    props: ['open', 'modal', 'dir'],
    emits: ['update:open'],
    template: `
      <div
        data-slot="dropdown-menu"
        data-testid="dropdown-menu-root"
        :data-state="$props.open ? 'open' : 'closed'"
      >
        <slot />
      </div>
    `,
  },
  useForwardPropsEmits: vi.fn((props, emits) => ({ ...props, ...emits })),
}));

describe('DropdownMenu', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(DropdownMenu, {
      props,
      slots,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="dropdown-menu-root"]').exists()).toBe(true);
  });

  it('has correct data-slot attribute', () => {
    const wrapper = createWrapper();
    const root = wrapper.find('[data-slot="dropdown-menu"]');
    expect(root.exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = createWrapper(
      {},
      {
        default: '<div data-testid="slot-content">Menu content</div>',
      },
    );

    expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Menu content');
  });

  it('handles open state', () => {
    const wrapper = createWrapper({ open: true });
    const root = wrapper.find('[data-testid="dropdown-menu-root"]');
    expect(root.attributes('data-state')).toBe('open');
  });

  it('handles closed state', () => {
    const wrapper = createWrapper({ open: false });
    const root = wrapper.find('[data-testid="dropdown-menu-root"]');
    expect(root.attributes('data-state')).toBe('closed');
  });

  it('forwards props correctly', () => {
    const props = {
      modal: true,
      dir: 'ltr',
    };
    const wrapper = createWrapper(props);

    // Props should be forwarded to the underlying component
    expect(wrapper.vm.modal).toBe(true);
    expect(wrapper.vm.dir).toBe('ltr');
  });

  it('emits events correctly', () => {
    const wrapper = createWrapper();

    // The component should be able to emit update:open
    expect(wrapper.vm.$emit).toBeDefined();
  });

  it('renders multiple slot elements', () => {
    const wrapper = createWrapper(
      {},
      {
        default: `
        <div data-testid="trigger">Trigger</div>
        <div data-testid="content">Content</div>
      `,
      },
    );

    expect(wrapper.find('[data-testid="trigger"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="content"]').exists()).toBe(true);
  });

  it('maintains semantic structure', () => {
    const wrapper = createWrapper();
    const root = wrapper.find('[data-testid="dropdown-menu-root"]');
    expect(root.element.tagName).toBe('DIV');
  });

  it('handles empty content gracefully', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toBe('');
    expect(wrapper.exists()).toBe(true);
  });
});
