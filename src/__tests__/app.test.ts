import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { cn } from '../lib/utils';

describe('Environment & Tooling Verification', () => {
  it('should successfully merge class names', () => {
    expect(cn('bg-background', 'text-foreground')).toBe('bg-background text-foreground');
  });

  it('should successfully validate schema with Zod', () => {
    const TestSchema = z.object({
      status: z.string(),
      active: z.boolean(),
    });

    const parsed = TestSchema.safeParse({ status: 'ready', active: true });
    expect(parsed.success).toBe(true);
  });
});
