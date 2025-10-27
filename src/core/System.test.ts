import { describe, it, expect, vi } from 'vitest';
import { System, SystemManager } from './System';

class TestSystem extends System {
  public updateCallCount = 0;
  public initCallCount = 0;
  public destroyCallCount = 0;

  update(deltaTime: number): void {
    this.updateCallCount++;
  }

  onInit(): void {
    this.initCallCount++;
  }

  onDestroy(): void {
    this.destroyCallCount++;
  }
}

describe('System', () => {
  it('should call update method', () => {
    const system = new TestSystem();
    system.update(0.016);
    expect(system.updateCallCount).toBe(1);
  });
});

describe('SystemManager', () => {
  it('should add and execute systems', () => {
    const manager = new SystemManager();
    const system = new TestSystem();

    manager.add(system);
    manager.update(0.016);

    expect(system.updateCallCount).toBe(1);
    expect(system.initCallCount).toBe(1);
  });

  it('should call onDestroy when removing systems', () => {
    const manager = new SystemManager();
    const system = new TestSystem();

    manager.add(system);
    manager.remove(system);

    expect(system.destroyCallCount).toBe(1);
  });

  it('should update all systems', () => {
    const manager = new SystemManager();
    const system1 = new TestSystem();
    const system2 = new TestSystem();

    manager.add(system1);
    manager.add(system2);
    manager.update(0.016);

    expect(system1.updateCallCount).toBe(1);
    expect(system2.updateCallCount).toBe(1);
  });

  it('should handle systems without hooks gracefully', () => {
    class SimpleSystem extends System {
      update() {}
    }

    const manager = new SystemManager();
    const system = new SimpleSystem();

    expect(() => {
      manager.add(system);
      manager.update(0.016);
      manager.remove(system);
    }).not.toThrow();
  });
});

