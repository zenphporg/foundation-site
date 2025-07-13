import { describe, expect, it } from 'vitest';

describe('JavaScript Testing Setup', () => {
  it('can run basic tests', () => {
    expect(1 + 1).toBe(2);
  });

  it('can test async functions', async () => {
    const result = await Promise.resolve('hello');
    expect(result).toBe('hello');
  });

  it('can test objects', () => {
    const user = { name: 'John', email: 'john@example.com' };
    expect(user).toHaveProperty('name', 'John');
    expect(user).toHaveProperty('email', 'john@example.com');
  });

  it('can test arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
  });
});
