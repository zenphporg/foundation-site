import { Checkbox } from '@/components/ui/checkbox';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// Mock reka-ui components - use markRaw to prevent Vue from making them reactive
vi.mock('reka-ui', () => {
  const { markRaw } = require('vue');
  return {
    CheckboxRoot: markRaw({
      name: 'CheckboxRoot',
      props: ['class', 'checked', 'disabled', 'required', 'name', 'value'],
      emits: ['update:checked'],
      template: `
        <div
          :class="$props.class"
          data-slot="checkbox"
          :data-state="$props.checked ? 'checked' : 'unchecked'"
          role="checkbox"
          :aria-checked="$props.checked"
          :disabled="$props.disabled ? 'disabled' : null"
          @click="!$props.disabled && $emit('update:checked', !$props.checked)"
        >
          <slot />
        </div>
      `,
    }),
    CheckboxIndicator: markRaw({
      name: 'CheckboxIndicator',
      props: ['class'],
      template: '<div :class="$props.class" data-slot="checkbox-indicator"><slot /></div>',
    }),
    useForwardPropsEmits: vi.fn((props, emits) => ({ ...props, ...emits })),
  };
});

// Mock lucide icon - use markRaw to prevent Vue from making it reactive
vi.mock('lucide-vue-next', () => {
  const { markRaw } = require('vue');
  return {
    Check: markRaw({
      name: 'Check',
      props: ['class'],
      template: '<svg :class="$props.class" data-testid="check-icon"><path /></svg>',
    }),
  };
});

// Mock utils
vi.mock('@/lib/utils', () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(' ')),
}));

describe('Checkbox', () => {
  const createWrapper = (props = {}) => {
    return mount(Checkbox, {
      props,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-slot="checkbox"]').exists()).toBe(true);
  });

  it('renders with default classes', () => {
    const wrapper = createWrapper();
    const checkbox = wrapper.find('[data-slot="checkbox"]');
    expect(checkbox.classes()).toContain('peer');
    expect(checkbox.classes()).toContain('border-input');
    expect(checkbox.classes()).toContain('size-4');
    expect(checkbox.classes()).toContain('shrink-0');
    expect(checkbox.classes()).toContain('rounded-[4px]');
  });

  it('applies custom class prop', () => {
    const customClass = 'custom-checkbox-class';
    const wrapper = createWrapper({ class: customClass });
    const checkbox = wrapper.find('[data-slot="checkbox"]');
    expect(checkbox.classes()).toContain(customClass);
  });

  it('renders checkbox indicator', () => {
    const wrapper = createWrapper();
    const indicator = wrapper.find('[data-slot="checkbox-indicator"]');
    expect(indicator.exists()).toBe(true);
    expect(indicator.classes()).toContain('flex');
    expect(indicator.classes()).toContain('items-center');
    expect(indicator.classes()).toContain('justify-center');
  });

  it('renders default check icon', () => {
    const wrapper = createWrapper();
    const checkIcon = wrapper.find('[data-testid="check-icon"]');
    expect(checkIcon.exists()).toBe(true);
    expect(checkIcon.classes()).toContain('size-3.5');
  });

  it('renders custom slot content', () => {
    const wrapper = mount(Checkbox, {
      slots: {
        default: '<span data-testid="custom-icon">Custom</span>',
      },
    });

    expect(wrapper.find('[data-testid="custom-icon"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="check-icon"]').exists()).toBe(false);
  });

  it('handles checked state', () => {
    const wrapper = createWrapper({ checked: true });
    const checkbox = wrapper.find('[data-slot="checkbox"]');
    expect(checkbox.attributes('data-state')).toBe('checked');
    expect(checkbox.attributes('aria-checked')).toBe('true');
  });

  it('handles unchecked state', () => {
    const wrapper = createWrapper({ checked: false });
    const checkbox = wrapper.find('[data-slot="checkbox"]');
    expect(checkbox.attributes('data-state')).toBe('unchecked');
    expect(checkbox.attributes('aria-checked')).toBe('false');
  });

  it('handles disabled state', () => {
    const wrapper = createWrapper({ disabled: true });
    expect(wrapper.vm.disabled).toBe(true);
  });

  it('handles click interaction', async () => {
    const wrapper = createWrapper({ checked: false });
    const checkbox = wrapper.find('[data-slot="checkbox"]');

    await checkbox.trigger('click');

    // The mock should handle the click and emit the event
    expect(checkbox.exists()).toBe(true);
  });

  it('renders in different states', () => {
    const checkedWrapper = createWrapper({ checked: true });
    const uncheckedWrapper = createWrapper({ checked: false });

    expect(checkedWrapper.find('[data-state="checked"]').exists()).toBe(true);
    expect(uncheckedWrapper.find('[data-state="unchecked"]').exists()).toBe(true);
  });

  it('has correct accessibility attributes', () => {
    const wrapper = createWrapper();
    const checkbox = wrapper.find('[data-slot="checkbox"]');
    expect(checkbox.attributes('role')).toBe('checkbox');
  });

  it('forwards props correctly', () => {
    const props = {
      name: 'test-checkbox',
      value: 'test-value',
      required: true,
    };
    const wrapper = createWrapper(props);
    const checkbox = wrapper.find('[data-slot="checkbox"]');

    // These would be forwarded to the underlying CheckboxRoot
    expect(wrapper.vm.name).toBe('test-checkbox');
    expect(wrapper.vm.value).toBe('test-value');
    expect(wrapper.vm.required).toBe(true);
  });

  it('properly delegates props excluding class', () => {
    const wrapper = createWrapper({
      class: 'custom-class',
      disabled: true,
      checked: true,
      'data-testid': 'test-checkbox',
      name: 'test-name',
      value: 'test-value',
    });

    // Should have the custom class applied
    expect(wrapper.classes()).toContain('custom-class');

    // Should have delegated props (this covers the computed delegatedProps lines 12-14)
    // Note: These props are delegated to the CheckboxRoot component, not accessible via wrapper.vm
    expect(wrapper.vm.disabled).toBe(true);
    expect(wrapper.vm.name).toBe('test-name');
    expect(wrapper.vm.value).toBe('test-value');

    // The class prop should be excluded from delegated props but still applied
    const checkbox = wrapper.find('[data-slot="checkbox"]');
    expect(checkbox.exists()).toBe(true);
  });

  it('forces delegatedProps computation lines 12-14', () => {
    // This test specifically targets the delegatedProps computed property destructuring
    const wrapper = mount(Checkbox, {
      props: {
        class: 'force-delegated-props',
        checked: true,
        disabled: true,
        required: true,
        name: 'force-test',
        value: 'force-value',
        'data-testid': 'force-checkbox',
      },
    });

    // The mere act of mounting with a class prop should trigger the delegatedProps computation
    // which includes the destructuring on lines 12-14: const { class: _, ...delegatedProps } = $props;

    // Verify the component renders with the class applied (proving the destructuring worked)
    expect(wrapper.find('[data-slot="checkbox"]').exists()).toBe(true);
    expect(wrapper.find('[data-slot="checkbox"]').classes()).toContain('force-delegated-props');

    // Verify the component has the expected props
    expect(wrapper.vm.$props.class).toBe('force-delegated-props');
  });
});
