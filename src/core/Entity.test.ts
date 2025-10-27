import { describe, it, expect, beforeEach } from 'vitest';
import { Entity } from './Entity';

describe('Entity', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('should create unique entity IDs', () => {
    const id1 = Entity.create();
    const id2 = Entity.create();
    const id3 = Entity.create();

    expect(id1).toBe(0);
    expect(id2).toBe(1);
    expect(id3).toBe(2);
  });

  it('should generate sequential IDs', () => {
    const ids = Array.from({ length: 100 }, () => Entity.create());
    expect(ids).toEqual(Array.from({ length: 100 }, (_, i) => i));
  });

  it('should reset ID counter', () => {
    const id1 = Entity.create();
    const id2 = Entity.create();
    expect(id2).toBeGreaterThan(id1);

    Entity.reset();

    const id3 = Entity.create();
    expect(id3).toBe(0);
  });
});

