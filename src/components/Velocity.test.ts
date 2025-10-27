import { describe, it, expect } from 'vitest';
import { Velocity } from './Velocity';

describe('Velocity', () => {
  it('should create velocity with default values', () => {
    const velocity = Velocity.create(0);

    expect(velocity.entityId).toBe(0);
    expect(velocity.vx).toBe(0);
    expect(velocity.vy).toBe(0);
  });

  it('should create velocity with custom speed', () => {
    const velocity = Velocity.create(1, 100, -50);

    expect(velocity.entityId).toBe(1);
    expect(velocity.vx).toBe(100);
    expect(velocity.vy).toBe(-50);
  });
});

