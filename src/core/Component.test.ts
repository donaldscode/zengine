import { describe, it, expect } from 'vitest';
import { ComponentManager } from './Component';

interface TestComponent {
  entityId: number;
  value: number;
}

describe('ComponentManager', () => {
  it('should store and retrieve components', () => {
    const manager = new ComponentManager<TestComponent>();

    const component = { entityId: 0, value: 42 };
    manager.set(component);

    expect(manager.get(0)).toEqual(component);
    expect(manager.has(0)).toBe(true);
  });

  it('should check if entity has component', () => {
    const manager = new ComponentManager<TestComponent>();

    expect(manager.has(0)).toBe(false);

    manager.set({ entityId: 0, value: 42 });
    expect(manager.has(0)).toBe(true);
  });

  it('should remove components', () => {
    const manager = new ComponentManager<TestComponent>();

    manager.set({ entityId: 0, value: 42 });
    expect(manager.has(0)).toBe(true);

    manager.remove(0);
    expect(manager.has(0)).toBe(false);
    expect(manager.get(0)).toBeUndefined();
  });

  it('should get all components', () => {
    const manager = new ComponentManager<TestComponent>();

    manager.set({ entityId: 0, value: 42 });
    manager.set({ entityId: 1, value: 24 });

    const all = manager.getAll();
    expect(all).toHaveLength(2);
  });

  it('should clear all components', () => {
    const manager = new ComponentManager<TestComponent>();

    manager.set({ entityId: 0, value: 42 });
    manager.set({ entityId: 1, value: 24 });

    manager.clear();

    expect(manager.getAll()).toHaveLength(0);
  });
});

