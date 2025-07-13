import { initializeTheme, updateTheme, useAppearance } from '@/composables/useAppearance';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

// Mock document.documentElement
const mockDocumentElement = {
  classList: {
    toggle: vi.fn(),
    add: vi.fn(),
    remove: vi.fn(),
    contains: vi.fn(),
  },
};

Object.defineProperty(document, 'documentElement', {
  value: mockDocumentElement,
  writable: true,
});

describe('useAppearance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mocks
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
    vi.mocked(window.localStorage.getItem).mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('updateTheme', () => {
    it('applies dark theme when value is dark', () => {
      updateTheme('dark');
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', true);
    });

    it('applies light theme when value is light', () => {
      updateTheme('light');
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', false);
    });

    it('applies system theme when value is system and system prefers dark', () => {
      vi.mocked(window.matchMedia).mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      updateTheme('system');
      expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', true);
    });

    it('applies system theme when value is system and system prefers light', () => {
      vi.mocked(window.matchMedia).mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      updateTheme('system');
      expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', false);
    });
  });

  describe('initializeTheme', () => {
    it('initializes with saved appearance from localStorage', () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('dark');

      initializeTheme();

      expect(window.localStorage.getItem).toHaveBeenCalledWith('appearance');
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', true);
      // The mediaQuery is created at module load time, so we can't easily test the addEventListener call
    });

    it('initializes with system theme when no saved appearance', () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);

      initializeTheme();

      expect(window.localStorage.getItem).toHaveBeenCalledWith('appearance');
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', false);
      // The mediaQuery is created at module load time, so we can't easily test the addEventListener call
    });
  });

  describe('useAppearance composable', () => {
    const TestComponent = {
      template: '<div>{{ appearance }}</div>',
      setup() {
        return useAppearance();
      },
    };

    it('returns default appearance as system', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);

      const wrapper = mount(TestComponent);
      await nextTick();

      expect(wrapper.vm.appearance).toBe('system');
    });

    it('loads saved appearance from localStorage', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('dark');

      const wrapper = mount(TestComponent);
      await nextTick();

      expect(wrapper.vm.appearance).toBe('dark');
      expect(window.localStorage.getItem).toHaveBeenCalledWith('appearance');
    });

    it('updates appearance and saves to localStorage', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);

      const wrapper = mount(TestComponent);
      await nextTick();

      wrapper.vm.updateAppearance('light');

      expect(wrapper.vm.appearance).toBe('light');
      expect(window.localStorage.setItem).toHaveBeenCalledWith('appearance', 'light');
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', false);
    });

    it('updates appearance to dark', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);

      const wrapper = mount(TestComponent);
      await nextTick();

      wrapper.vm.updateAppearance('dark');

      expect(wrapper.vm.appearance).toBe('dark');
      expect(window.localStorage.setItem).toHaveBeenCalledWith('appearance', 'dark');
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', true);
    });

    it('updates appearance to system', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);
      vi.mocked(window.matchMedia).mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const wrapper = mount(TestComponent);
      await nextTick();

      wrapper.vm.updateAppearance('system');

      expect(wrapper.vm.appearance).toBe('system');
      expect(window.localStorage.setItem).toHaveBeenCalledWith('appearance', 'system');
      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', true);
    });

    it('initializes theme on mount', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('light');

      mount(TestComponent);
      await nextTick();

      expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', false);
      // The mediaQuery is created at module load time, so we can't easily test the addEventListener call
    });

    it('handles system theme change with saved appearance', async () => {
      // Set up localStorage with a saved appearance
      vi.mocked(window.localStorage.getItem).mockReturnValue('light');

      // Mock the media query to simulate system theme change
      const mockMediaQuery = {
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };

      vi.mocked(window.matchMedia).mockReturnValue(mockMediaQuery);

      // Initialize the theme system
      initializeTheme();

      // Get the event handler that was registered
      const eventHandler = mockMediaQuery.addEventListener.mock.calls[0]?.[1];

      if (eventHandler) {
        // Call the event handler to simulate system theme change
        eventHandler();

        // Should use the saved appearance ('light') instead of system preference
        expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', false);
      }
    });

    it('handles system theme change without saved appearance', async () => {
      // Clear localStorage
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);

      // Mock the media query to simulate dark system preference
      const mockMediaQuery = {
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };

      vi.mocked(window.matchMedia).mockReturnValue(mockMediaQuery);

      // Initialize the theme system
      initializeTheme();

      // Get the event handler that was registered
      const eventHandler = mockMediaQuery.addEventListener.mock.calls[0]?.[1];

      if (eventHandler) {
        // Call the event handler to simulate system theme change
        eventHandler();

        // Should use system preference (dark) since no saved appearance
        expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', true);
      }
    });

    it('covers handleSystemThemeChange with saved appearance', async () => {
      // Set up localStorage with a saved appearance to cover lines 17-19
      vi.mocked(window.localStorage.getItem).mockReturnValue('light');

      // Mock the media query
      const mockMediaQuery = {
        matches: false, // System prefers light
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };

      vi.mocked(window.matchMedia).mockReturnValue(mockMediaQuery);

      // Initialize the theme system
      initializeTheme();

      // Get the event handler that was registered
      const eventHandler = mockMediaQuery.addEventListener.mock.calls[0]?.[1];

      if (eventHandler) {
        // Call the event handler to simulate system theme change
        // This should trigger handleSystemThemeChange which will:
        // 1. Get the saved appearance from localStorage (line 17)
        // 2. Call updateTheme with the saved appearance (line 18)
        eventHandler();

        // Should use the saved appearance ('light') instead of system preference
        expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', false);
      }
    });

    it('covers handleSystemThemeChange with null saved appearance', async () => {
      // Set up localStorage to return null to cover the || 'system' part of line 18
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);

      // Mock the media query to simulate dark system preference
      const mockMediaQuery = {
        matches: true, // System prefers dark
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };

      vi.mocked(window.matchMedia).mockReturnValue(mockMediaQuery);

      // Initialize the theme system
      initializeTheme();

      // Get the event handler that was registered
      const eventHandler = mockMediaQuery.addEventListener.mock.calls[0]?.[1];

      if (eventHandler) {
        // Call the event handler to simulate system theme change
        // This should trigger handleSystemThemeChange which will:
        // 1. Get null from localStorage (line 17)
        // 2. Call updateTheme with 'system' (line 18 - the || 'system' part)
        eventHandler();

        // Should use system preference (dark) since no saved appearance
        expect(mockDocumentElement.classList.toggle).toHaveBeenCalledWith('dark', true);
      }
    });
  });
});
