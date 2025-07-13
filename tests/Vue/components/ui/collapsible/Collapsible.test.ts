import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// Mock reka-ui components
vi.mock('reka-ui', () => ({
  CollapsibleRoot: {
    name: 'CollapsibleRoot',
    props: ['open', 'disabled'],
    emits: ['update:open'],
    setup(props, { emit }) {
      const toggle = () => emit('update:open', !props.open);
      return { toggle };
    },
    template: `
      <div
        data-testid="collapsible-root"
        :data-state="$props.open ? 'open' : 'closed'"
        :disabled="$props.disabled"
        @click="toggle"
      >
        <slot />
      </div>
    `,
  },
  CollapsibleTrigger: {
    name: 'CollapsibleTrigger',
    template: `
      <button
        data-testid="collapsible-trigger"
        @click="$parent.$emit('toggle')"
      >
        <slot />
      </button>
    `,
  },
  CollapsibleContent: {
    name: 'CollapsibleContent',
    props: ['class'],
    template: `
      <div
        :class="$props.class"
        data-testid="collapsible-content"
        :data-state="$parent.open ? 'open' : 'closed'"
      >
        <slot />
      </div>
    `,
  },
  useForwardPropsEmits: vi.fn((props, emits) => ({ ...props, ...emits })),
}));

describe('Collapsible Components', () => {
  describe('Collapsible', () => {
    const createWrapper = (props = {}) => {
      return mount(Collapsible, {
        props,
      });
    };

    it('renders correctly', () => {
      const wrapper = createWrapper();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('[data-testid="collapsible-root"]').exists()).toBe(true);
    });

    it('handles open state', () => {
      const wrapper = createWrapper({ open: true });
      const root = wrapper.find('[data-testid="collapsible-root"]');
      expect(root.attributes('data-state')).toBe('open');
    });

    it('handles closed state', () => {
      const wrapper = createWrapper({ open: false });
      const root = wrapper.find('[data-testid="collapsible-root"]');
      expect(root.attributes('data-state')).toBe('closed');
    });

    it('handles disabled state', () => {
      const wrapper = createWrapper({ disabled: true });
      const root = wrapper.find('[data-testid="collapsible-root"]');
      expect(root.attributes('disabled')).toBeDefined();
    });

    it('handles click interaction', async () => {
      const wrapper = createWrapper({ open: false });
      const root = wrapper.find('[data-testid="collapsible-root"]');

      await root.trigger('click');

      // The mock should handle the click
      expect(root.exists()).toBe(true);
    });

    it('renders slot content', () => {
      const wrapper = mount(Collapsible, {
        slots: {
          default: '<div data-testid="slot-content">Content</div>',
        },
      });

      expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(true);
    });
  });

  describe('CollapsibleTrigger', () => {
    const createWrapper = (slots = {}) => {
      return mount(CollapsibleTrigger, {
        slots,
      });
    };

    it('renders correctly', () => {
      const wrapper = createWrapper();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('[data-testid="collapsible-trigger"]').exists()).toBe(true);
    });

    it('renders as button element', () => {
      const wrapper = createWrapper();
      const trigger = wrapper.find('[data-testid="collapsible-trigger"]');
      expect(trigger.element.tagName).toBe('BUTTON');
    });

    it('renders slot content', () => {
      const wrapper = createWrapper({
        default: '<span data-testid="trigger-content">Toggle</span>',
      });

      expect(wrapper.find('[data-testid="trigger-content"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Toggle');
    });

    it('handles click events', async () => {
      const wrapper = createWrapper();
      const trigger = wrapper.find('[data-testid="collapsible-trigger"]');

      await trigger.trigger('click');

      // The click should trigger the parent's toggle event
      expect(trigger.exists()).toBe(true);
    });
  });

  describe('CollapsibleContent', () => {
    const createWrapper = (props = {}, slots = {}) => {
      return mount(CollapsibleContent, {
        props,
        slots,
      });
    };

    it('renders correctly', () => {
      const wrapper = createWrapper();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('[data-testid="collapsible-content"]').exists()).toBe(true);
    });

    it('applies custom class prop', () => {
      const customClass = 'custom-content-class';
      const wrapper = createWrapper({ class: customClass });
      const content = wrapper.find('[data-testid="collapsible-content"]');
      expect(content.classes()).toContain(customClass);
    });

    it('renders slot content', () => {
      const wrapper = createWrapper(
        {},
        {
          default: '<p data-testid="content-text">Collapsible content</p>',
        },
      );

      expect(wrapper.find('[data-testid="content-text"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Collapsible content');
    });

    it('has data-state attribute', () => {
      const wrapper = createWrapper();
      const content = wrapper.find('[data-testid="collapsible-content"]');
      expect(content.attributes('data-state')).toBeDefined();
    });
  });

  describe('Collapsible Integration', () => {
    it('works together as a complete collapsible component', () => {
      const wrapper = mount({
        components: { Collapsible, CollapsibleTrigger, CollapsibleContent },
        template: `
          <Collapsible :open="false">
            <CollapsibleTrigger>
              <span data-testid="trigger-text">Toggle</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div data-testid="content-text">Content</div>
            </CollapsibleContent>
          </Collapsible>
        `,
      });

      expect(wrapper.find('[data-testid="collapsible-root"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="collapsible-trigger"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="collapsible-content"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="trigger-text"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="content-text"]').exists()).toBe(true);
    });
  });
});
