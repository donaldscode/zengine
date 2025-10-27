import { describe, it, expect, beforeEach } from 'vitest';
import { Scene } from './Scene';
import { Entity } from './Entity';
import { System } from './System';

interface TestComponent {
  entityId: number;
  value: string;
}

describe('Scene', () => {
  let scene: Scene;

  beforeEach(() => {
    Entity.reset();
    scene = new Scene();
  });

  describe('Entity Management', () => {
    it('should create entities', () => {
      const id1 = scene.createEntity();
      const id2 = scene.createEntity();

      expect(id1).toBe(0);
      expect(id2).toBe(1);
    });

    it('should remove entities and their components', () => {
      const id = scene.createEntity();

      const component: TestComponent = { entityId: id, value: 'test' };
      scene.registerComponent(component, 'Test');

      scene.removeEntity(id);

      expect(scene.hasComponent(id, 'Test')).toBe(false);
    });
  });

  describe('Component Management', () => {
    it('should register and retrieve components', () => {
      const id = scene.createEntity();
      const component: TestComponent = { entityId: id, value: 'test' };

      scene.registerComponent(component, 'Test');

      expect(scene.hasComponent(id, 'Test')).toBe(true);
      expect(scene.getComponent<TestComponent>(id, 'Test')).toEqual(component);
    });

    it('should handle multiple components of same type', () => {
      const id1 = scene.createEntity();
      const id2 = scene.createEntity();

      scene.registerComponent({ entityId: id1, value: 'first' }, 'Test');
      scene.registerComponent({ entityId: id2, value: 'second' }, 'Test');

      expect(scene.getComponent<TestComponent>(id1, 'Test')?.value).toBe(
        'first'
      );
      expect(scene.getComponent<TestComponent>(id2, 'Test')?.value).toBe(
        'second'
      );
    });

    it('should get all components of a type', () => {
      const id1 = scene.createEntity();
      const id2 = scene.createEntity();

      scene.registerComponent({ entityId: id1, value: 'first' }, 'Test');
      scene.registerComponent({ entityId: id2, value: 'second' }, 'Test');

      const components = scene.getComponents<TestComponent>('Test');
      expect(components.length).toBe(2);
    });

    it('should check if entity has component', () => {
      const id = scene.createEntity();

      expect(scene.hasComponent(id, 'Test')).toBe(false);

      scene.registerComponent({ entityId: id, value: 'test' }, 'Test');

      expect(scene.hasComponent(id, 'Test')).toBe(true);
    });
  });

  describe('System Management', () => {
    it('should add and remove systems', () => {
      let callCount = 0;

      class TestSystemHelper extends System {
        update(): void {
          callCount++;
        }
      }

      const system = new TestSystemHelper();

      scene.addSystem(system);
      scene.update(0.016);

      expect(callCount).toBe(1);

      scene.removeSystem(system);
      scene.update(0.016);

      expect(callCount).toBe(1);
    });
  });
});
