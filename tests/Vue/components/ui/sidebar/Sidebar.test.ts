import { Sidebar } from '@/components/ui/sidebar';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// Create a controllable mock state
let mockSidebarState = {
  state: 'expanded',
  open: true,
  setOpen: vi.fn(),
  openMobile: false,
  setOpenMobile: vi.fn(),
  isMobile: false,
  toggleSidebar: vi.fn(),
};

// Mock the composables
vi.mock('@/components/ui/sidebar/utils', () => ({
  useSidebar: () => mockSidebarState,
  SIDEBAR_WIDTH_MOBILE: '18rem',
}));

// Mock reka-ui Dialog components to avoid context injection errors
vi.mock('reka-ui', () => ({
  DialogRoot: {
    name: 'DialogRoot',
    template: '<div data-testid="dialog-root"><slot /></div>',
    props: ['open', 'modal'],
    emits: ['update:open'],
    setup() {
      const { provide } = require('vue');
      provide('DialogRootContext', {
        open: ref(false),
        modal: ref(true),
        onOpenChange: vi.fn(),
      });
      return {};
    },
  },
  DialogPortal: {
    name: 'DialogPortal',
    template: '<div data-testid="dialog-portal"><slot /></div>',
  },
  DialogOverlay: {
    name: 'DialogOverlay',
    template: '<div data-testid="dialog-overlay"></div>',
  },
  DialogContent: {
    name: 'DialogContent',
    template: '<div data-testid="dialog-content"><slot /></div>',
    props: ['class'],
  },
  DialogTitle: {
    name: 'DialogTitle',
    template: '<div data-testid="dialog-title"><slot /></div>',
  },
  DialogDescription: {
    name: 'DialogDescription',
    template: '<div data-testid="dialog-description"><slot /></div>',
  },
  DialogClose: {
    name: 'DialogClose',
    template: '<button data-testid="dialog-close"><slot /></button>',
  },
}));

// Mock Sheet components
vi.mock('@/components/ui/sheet', () => ({
  Sheet: {
    name: 'Sheet',
    template: '<div data-testid="sheet"><slot /></div>',
    props: ['open'],
    emits: ['update:open'],
  },
  SheetContent: {
    name: 'SheetContent',
    template: '<div data-testid="sheet-content"><slot /></div>',
    props: ['side', 'class', 'style'],
  },
  SheetHeader: {
    name: 'SheetHeader',
    template: '<div data-testid="sheet-header"><slot /></div>',
    props: ['class'],
  },
  SheetTitle: {
    name: 'SheetTitle',
    template: '<div data-testid="sheet-title"><slot /></div>',
  },
  SheetDescription: {
    name: 'SheetDescription',
    template: '<div data-testid="sheet-description"><slot /></div>',
  },
}));

describe('Sidebar', () => {
  beforeEach(() => {
    // Reset mock state before each test
    mockSidebarState = {
      state: 'expanded',
      open: true,
      setOpen: vi.fn(),
      openMobile: false,
      setOpenMobile: vi.fn(),
      isMobile: false,
      toggleSidebar: vi.fn(),
    };
  });

  it('renders correctly', () => {
    const wrapper = mount(Sidebar, {
      props: {
        side: 'left',
        variant: 'sidebar',
        collapsible: 'offcanvas',
      },
      slots: {
        default: '<div>Sidebar content</div>',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Sidebar content');
  });

  it('applies correct CSS classes', () => {
    const wrapper = mount(Sidebar, {
      props: {
        side: 'left',
        variant: 'sidebar',
        collapsible: 'offcanvas',
      },
    });

    expect(wrapper.classes()).toContain('group');
  });

  it('handles different side props', () => {
    const wrapper = mount(Sidebar, {
      props: {
        side: 'right',
        variant: 'sidebar',
        collapsible: 'offcanvas',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('handles different variant props', () => {
    const wrapper = mount(Sidebar, {
      props: {
        side: 'left',
        variant: 'floating',
        collapsible: 'offcanvas',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('handles different collapsible props', () => {
    const wrapper = mount(Sidebar, {
      props: {
        side: 'left',
        variant: 'sidebar',
        collapsible: 'icon',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('renders non-collapsible sidebar when collapsible is none', () => {
    const wrapper = mount(Sidebar, {
      props: {
        collapsible: 'none',
        side: 'left',
        variant: 'sidebar',
      },
    });

    const sidebarDiv = wrapper.find('[data-slot="sidebar"]');
    expect(sidebarDiv.exists()).toBe(true);
    expect(sidebarDiv.classes()).toContain('bg-sidebar');
    expect(sidebarDiv.classes()).toContain('text-sidebar-foreground');
  });

  it('renders mobile sheet when isMobile is true', () => {
    // Set mobile state to trigger Sheet rendering (lines 34-54)
    mockSidebarState.isMobile = true;
    mockSidebarState.openMobile = true;

    const wrapper = mount(Sidebar, {
      props: {
        collapsible: 'icon',
        side: 'left',
        variant: 'sidebar',
      },
      slots: {
        default: '<div>Mobile sidebar content</div>',
      },
    });

    // Should render Sheet components (lines 34-54)
    expect(wrapper.findComponent({ name: 'Sheet' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'SheetContent' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'SheetHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'SheetTitle' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'SheetDescription' }).exists()).toBe(true);

    // Should contain the slot content
    expect(wrapper.text()).toContain('Mobile sidebar content');
  });

  it('renders desktop sidebar when not mobile', () => {
    // Set desktop state (default)
    mockSidebarState.isMobile = false;
    mockSidebarState.state = 'expanded';

    const wrapper = mount(Sidebar, {
      props: {
        collapsible: 'icon',
        side: 'left',
        variant: 'sidebar',
      },
      slots: {
        default: '<div>Desktop sidebar content</div>',
      },
    });

    // Should render desktop sidebar structure (lines 55+)
    const desktopSidebar = wrapper.find('.group.peer');
    expect(desktopSidebar.exists()).toBe(true);
    expect(desktopSidebar.attributes('data-state')).toBe('expanded');
    expect(desktopSidebar.attributes('data-side')).toBe('left');
    expect(desktopSidebar.attributes('data-variant')).toBe('sidebar');

    // Should contain the slot content
    expect(wrapper.text()).toContain('Desktop sidebar content');
  });

  it('handles collapsed state correctly', () => {
    // Set collapsed state
    mockSidebarState.isMobile = false;
    mockSidebarState.state = 'collapsed';
    mockSidebarState.open = false;

    const wrapper = mount(Sidebar, {
      props: {
        collapsible: 'icon',
        side: 'left',
        variant: 'sidebar',
      },
    });

    const desktopSidebar = wrapper.find('.group.peer');
    expect(desktopSidebar.attributes('data-state')).toBe('collapsed');
    expect(desktopSidebar.attributes('data-collapsible')).toBe('icon');
  });
});
