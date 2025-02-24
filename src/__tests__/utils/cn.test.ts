import { cn } from '@/lib/utils';

describe('cn (className utility)', () => {
  it('should combine classes correctly', () => {
    const result = cn('class1', 'class2', { 'class3': true, 'class4': false });
    expect(result).toBe('class1 class2 class3');
  });

  it('should handle falsy values', () => {
    const result = cn('class1', null, undefined, false, 'class2');
    expect(result).toBe('class1 class2');
  });

  it('should handle conditional objects', () => {
    const isActive = true;
    const result = cn('base', { 'active': isActive, 'inactive': !isActive });
    expect(result).toBe('base active');
  });
});