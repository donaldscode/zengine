import { describe, it, expect } from 'vitest';
import { Transform } from './Transform';

describe('Transform', () => {
  it('should create transform with default values', () => {
    const transform = Transform.create(0);

    expect(transform.entityId).toBe(0);
    expect(transform.x).toBe(0);
    expect(transform.y).toBe(0);
    expect(transform.rotation).toBe(0);
    expect(transform.scaleX).toBe(1);
    expect(transform.scaleY).toBe(1);
  });

  it('should create transform with custom position', () => {
    const transform = Transform.create(1, 100, 200);

    expect(transform.entityId).toBe(1);
    expect(transform.x).toBe(100);
    expect(transform.y).toBe(200);
    expect(transform.rotation).toBe(0);
  });
});

