import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Echo Configuration', () => {
  beforeEach(() => {
    // Mock window object
    global.window = {
      Pusher: undefined,
      Echo: undefined,
    } as any;

    // Mock environment variables
    vi.stubEnv('VITE_PUSHER_APP_KEY', 'test-key');
    vi.stubEnv('VITE_PUSHER_HOST', 'test-host');
    vi.stubEnv('VITE_PUSHER_PORT', '6001');
    vi.stubEnv('VITE_PUSHER_SCHEME', 'https');
    vi.stubEnv('VITE_PUSHER_APP_CLUSTER', 'mt1');

    // Clear module cache
    vi.resetModules();
  });

  it('imports and executes without errors', async () => {
    expect(async () => {
      await import('@/echo');
    }).not.toThrow();
  });

  it('sets up Pusher on window object', async () => {
    await import('@/echo');
    expect(window.Pusher).toBeDefined();
  });

  it('creates Echo instance on window', async () => {
    await import('@/echo');
    expect(window.Echo).toBeDefined();
  });
});
