import { describe, it, expect, beforeEach } from 'vitest';
import { Scene } from '../core/Scene';
import { MovementSystem } from './MovementSystem';
import { Transform, Velocity } from '../components';

describe('MovementSystem', () => {
  let scene: Scene;
  let system: MovementSystem;

  beforeEach(() => {
    scene = new Scene();
    system = new MovementSystem(scene);
    scene.addSystem(system);
  });

  it('should move entity based on velocity', () => {
    const entity = scene.createEntity();

    const transform = Transform.create(entity, 0, 0);
    scene.registerComponent(transform, 'Transform');

    const velocity = Velocity.create(entity, 10, 20);
    scene.registerComponent(velocity, 'Velocity');

    scene.update(1.0); // 1 second

    expect(transform.x).toBe(10);
    expect(transform.y).toBe(20);
  });

  it('should move entity over multiple frames', () => {
    const entity = scene.createEntity();

    const transform = Transform.create(entity, 0, 0);
    scene.registerComponent(transform, 'Transform');

    const velocity = Velocity.create(entity, 5, 10);
    scene.registerComponent(velocity, 'Velocity');

    scene.update(0.016); // ~1/60 second
    expect(transform.x).toBeCloseTo(0.08);
    expect(transform.y).toBeCloseTo(0.16);

    scene.update(0.016);
    expect(transform.x).toBeCloseTo(0.16);
    expect(transform.y).toBeCloseTo(0.32);
  });

  it('should only affect entities with both transform and velocity', () => {
    const entity1 = scene.createEntity();
    const entity2 = scene.createEntity();

    const transform1 = Transform.create(entity1, 100, 100);
    scene.registerComponent(transform1, 'Transform');
    scene.registerComponent(Velocity.create(entity1, 10, 10), 'Velocity');

    const transform2 = Transform.create(entity2, 200, 200);
    scene.registerComponent(transform2, 'Transform');

    scene.update(1.0);

    expect(transform1.x).toBe(110);
    expect(transform2.x).toBe(200);
  });

  it('should handle zero velocity correctly', () => {
    const entity = scene.createEntity();

    const transform = Transform.create(entity, 50, 50);
    scene.registerComponent(transform, 'Transform');
    scene.registerComponent(Velocity.create(entity, 0, 0), 'Velocity');

    scene.update(1.0);

    expect(transform.x).toBe(50);
    expect(transform.y).toBe(50);
  });
});

