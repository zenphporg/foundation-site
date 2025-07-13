import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock ziggy-js before importing
vi.mock('ziggy-js', () => ({
  route: vi.fn(),
}));

// Mock ziggy config
vi.mock('@/ziggy.js', () => ({
  Ziggy: {
    routes: {
      dashboard: { uri: 'dashboard', methods: ['GET'] },
      'profile.show': { uri: 'profile/{id}', methods: ['GET'] },
      'api.users.index': { uri: 'api/users', methods: ['GET'] },
    },
    url: `https://${process.env.VITE_APP_DOMAIN}`,
    port: null,
  },
}));

import useRoutes from '@/composables/useRoutes';
import { route } from 'ziggy-js';

describe('useRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls route function with correct parameters', () => {
    const mockRoute = vi.mocked(route);
    mockRoute.mockReturnValue('/dashboard');

    const result = useRoutes('dashboard');

    expect(mockRoute).toHaveBeenCalledWith('dashboard', undefined, true, expect.any(Object));
    expect(result).toBe('/dashboard');
  });

  it('passes params to route function', () => {
    const mockRoute = vi.mocked(route);
    mockRoute.mockReturnValue('/profile/123');
    const params = { id: 123 };

    const result = useRoutes('profile.show', params);

    expect(mockRoute).toHaveBeenCalledWith('profile.show', params, true, expect.any(Object));
    expect(result).toBe('/profile/123');
  });

  it('passes absolute parameter to route function', () => {
    const mockRoute = vi.mocked(route);
    mockRoute.mockReturnValue('dashboard');

    const result = useRoutes('dashboard', undefined, false);

    expect(mockRoute).toHaveBeenCalledWith('dashboard', undefined, false, expect.any(Object));
    expect(result).toBe('dashboard');
  });

  it('defaults absolute to true when not provided', () => {
    const mockRoute = vi.mocked(route);
    mockRoute.mockReturnValue('/dashboard');

    useRoutes('dashboard');

    expect(mockRoute).toHaveBeenCalledWith('dashboard', undefined, true, expect.any(Object));
  });

  it('handles complex route names', () => {
    const mockRoute = vi.mocked(route);
    mockRoute.mockReturnValue('/api/users');

    const result = useRoutes('api.users.index');

    expect(mockRoute).toHaveBeenCalledWith('api.users.index', undefined, true, expect.any(Object));
    expect(result).toBe('/api/users');
  });

  it('handles multiple parameters', () => {
    const mockRoute = vi.mocked(route);
    mockRoute.mockReturnValue('/users/123/posts/456');
    const params = { userId: 123, postId: 456 };

    const result = useRoutes('users.posts.show', params);

    expect(mockRoute).toHaveBeenCalledWith('users.posts.show', params, true, expect.any(Object));
    expect(result).toBe('/users/123/posts/456');
  });

  it('passes Ziggy config to route function', () => {
    const mockRoute = vi.mocked(route);
    mockRoute.mockReturnValue('/dashboard');

    useRoutes('dashboard');

    const expectedUrl = `https://${process.env.VITE_APP_DOMAIN || 'foundation.test'}`;
    expect(mockRoute).toHaveBeenCalledWith(
      'dashboard',
      undefined,
      true,
      expect.objectContaining({
        routes: expect.any(Object),
        url: expectedUrl,
        port: null,
      }),
    );
  });

  it('returns the result from route function', () => {
    const mockRoute = vi.mocked(route);
    const baseUrl = `https://${process.env.VITE_APP_DOMAIN || 'foundation.test'}`;
    const expectedUrl = `${baseUrl}/custom/path`;
    mockRoute.mockReturnValue(expectedUrl);

    const result = useRoutes('custom.route');

    expect(result).toBe(expectedUrl);
  });

  it('handles empty params object', () => {
    const mockRoute = vi.mocked(route);
    mockRoute.mockReturnValue('/dashboard');

    const result = useRoutes('dashboard', {});

    expect(mockRoute).toHaveBeenCalledWith('dashboard', {}, true, expect.any(Object));
    expect(result).toBe('/dashboard');
  });

  it('handles string parameters', () => {
    const mockRoute = vi.mocked(route);
    mockRoute.mockReturnValue('/users/john');
    const params = { username: 'john' };

    const result = useRoutes('users.show', params);

    expect(mockRoute).toHaveBeenCalledWith('users.show', params, true, expect.any(Object));
    expect(result).toBe('/users/john');
  });
});
