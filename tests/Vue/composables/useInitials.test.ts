import { describe, expect, it } from 'vitest';
import { getInitials, useInitials } from '@/composables/useInitials';

describe('getInitials', () => {
  it('returns empty string for undefined input', () => {
    expect(getInitials(undefined)).toBe('');
  });

  it('returns empty string for empty string input', () => {
    expect(getInitials('')).toBe('');
  });

  it('returns empty string for whitespace-only input', () => {
    expect(getInitials('   ')).toBe('');
  });

  it('returns first letter uppercase for single name', () => {
    expect(getInitials('John')).toBe('J');
  });

  it('returns first letter uppercase for single name with lowercase', () => {
    expect(getInitials('john')).toBe('J');
  });

  it('returns first and last initials for two names', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('returns first and last initials for multiple names', () => {
    expect(getInitials('John Michael Doe')).toBe('JD');
  });

  it('returns first and last initials for many names', () => {
    expect(getInitials('John Michael Robert Smith Doe')).toBe('JD');
  });

  it('handles names with extra whitespace', () => {
    expect(getInitials('  John   Doe  ')).toBe('JD');
  });

  it('handles mixed case names', () => {
    expect(getInitials('john doe')).toBe('JD');
  });

  it('handles names with special characters', () => {
    expect(getInitials('Jean-Pierre Dupont')).toBe('JD');
  });

  it('handles single character names', () => {
    expect(getInitials('A B')).toBe('AB');
  });

  it('handles names with numbers', () => {
    expect(getInitials('John2 Doe3')).toBe('JD');
  });
});

describe('useInitials', () => {
  it('returns an object with getInitials function', () => {
    const { getInitials: getInitialsFromComposable } = useInitials();
    expect(typeof getInitialsFromComposable).toBe('function');
  });

  it('getInitials function works correctly', () => {
    const { getInitials: getInitialsFromComposable } = useInitials();
    expect(getInitialsFromComposable('John Doe')).toBe('JD');
  });

  it('getInitials function handles edge cases', () => {
    const { getInitials: getInitialsFromComposable } = useInitials();
    expect(getInitialsFromComposable('')).toBe('');
    expect(getInitialsFromComposable('Single')).toBe('S');
  });
});
