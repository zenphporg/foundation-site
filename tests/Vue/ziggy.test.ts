import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('Ziggy Configuration', () => {
  let originalWindow: any;

  beforeEach(() => {
    originalWindow = global.window;
    global.window = {} as any;
  });

  afterEach(() => {
    global.window = originalWindow;
  });

  it('exports Ziggy configuration object', async () => {
    const { Ziggy } = await import('@/ziggy');
    expect(Ziggy).toBeDefined();
    expect(typeof Ziggy).toBe('object');
  });

  it('has correct base configuration', async () => {
    const { Ziggy } = await import('@/ziggy');
    const expectedUrl = `https://${process.env.VITE_APP_DOMAIN}`;
    expect(Ziggy.url).toBe(expectedUrl);
    expect(Ziggy.port).toBe(null);
    expect(Ziggy.defaults).toEqual({});
    expect(Ziggy.routes).toBeDefined();
    expect(typeof Ziggy.routes).toBe('object');
  });

  it('contains expected route definitions', async () => {
    const { Ziggy } = await import('@/ziggy');

    expect(Ziggy.routes.home).toEqual({
      uri: '/',
      methods: ['GET', 'HEAD'],
    });

    expect(Ziggy.routes.dashboard).toEqual({
      uri: 'dashboard',
      methods: ['GET', 'HEAD'],
    });

    expect(Ziggy.routes.login).toEqual({
      uri: 'login',
      methods: ['GET', 'HEAD'],
    });

    expect(Ziggy.routes.register).toEqual({
      uri: 'register',
      methods: ['GET', 'HEAD'],
    });
  });

  it('contains auth-related routes', async () => {
    const { Ziggy } = await import('@/ziggy');

    expect(Ziggy.routes['password.request']).toEqual({
      uri: 'forgot-password',
      methods: ['GET', 'HEAD'],
    });

    expect(Ziggy.routes['password.reset']).toEqual({
      uri: 'reset-password/{token}',
      methods: ['GET', 'HEAD'],
      parameters: ['token'],
    });

    expect(Ziggy.routes['verification.notice']).toEqual({
      uri: 'verify-email',
      methods: ['GET', 'HEAD'],
    });
  });

  it('contains profile and settings routes', async () => {
    const { Ziggy } = await import('@/ziggy');

    expect(Ziggy.routes['profile.edit']).toEqual({
      uri: 'settings/profile',
      methods: ['GET', 'HEAD'],
    });

    expect(Ziggy.routes['profile.update']).toEqual({
      uri: 'settings/profile',
      methods: ['PATCH'],
    });

    expect(Ziggy.routes['password.edit']).toEqual({
      uri: 'settings/password',
      methods: ['GET', 'HEAD'],
    });

    expect(Ziggy.routes.appearance).toEqual({
      uri: 'settings/appearance',
      methods: ['GET', 'HEAD'],
    });
  });

  it('contains CSRF and storage routes', async () => {
    const { Ziggy } = await import('@/ziggy');

    expect(Ziggy.routes['sanctum.csrf-cookie']).toEqual({
      uri: 'sanctum/csrf-cookie',
      methods: ['GET', 'HEAD'],
    });

    expect(Ziggy.routes['storage.local']).toEqual({
      uri: 'storage/{path}',
      methods: ['GET', 'HEAD'],
      wheres: { path: '.*' },
      parameters: ['path'],
    });
  });

  it('has correct route count', async () => {
    const { Ziggy } = await import('@/ziggy');
    const routeKeys = Object.keys(Ziggy.routes);
    expect(routeKeys.length).toBeGreaterThan(15);

    const expectedRoutes = ['home', 'dashboard', 'login', 'register', 'logout', 'profile.edit', 'password.edit', 'appearance'];

    expectedRoutes.forEach((route) => {
      expect(routeKeys).toContain(route);
    });
  });

  it('works when window.Ziggy is undefined', async () => {
    global.window = {} as any;
    const { Ziggy } = await import('@/ziggy');
    expect(Ziggy.routes.home).toBeDefined();
    expect(Ziggy.routes.dashboard).toBeDefined();
  });
});
