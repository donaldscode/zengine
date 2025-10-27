import { Engine, Transform, Sprite, Velocity, MovementSystem, RenderSystem } from '../src/index';

/**
 * Simple example demonstrating basic usage of Zengine
 */
export function createSimpleExample(canvas: HTMLCanvasElement): Engine {
  const engine = new Engine(canvas);
  const scene = engine.getScene();
  const ctx = canvas.getContext('2d')!;

  // Add core systems
  scene.addSystem(new MovementSystem(scene));
  scene.addSystem(new RenderSystem(scene, ctx));

  // Create a bouncing square
  const square = scene.createEntity();
  
  const transform = Transform.create(square, canvas.width / 2, canvas.height / 2);
  scene.registerComponent(transform, 'Transform');

  const sprite = Sprite.create(square, 50, 50, '#4ecdc4');
  scene.registerComponent(sprite, 'Sprite');

  const velocity = Velocity.create(square, 100, 100);
  scene.registerComponent(velocity, 'Velocity');

  // Add wall collision system
  scene.addSystem({
    update(deltaTime: number) {
      const transforms = scene.getComponents('Transform');
      const velocities = scene.getComponents('Velocity');

      for (const transform of transforms) {
        const sprite = scene.getComponent(transform.entityId, 'Sprite');
        const velocity = scene.getComponent(transform.entityId, 'Velocity');

        if (sprite && velocity) {
          // Bounce off walls
          if (transform.x <= sprite.width / 2 || transform.x >= canvas.width - sprite.width / 2) {
            velocity.vx *= -1;
          }
          if (transform.y <= sprite.height / 2 || transform.y >= canvas.height - sprite.height / 2) {
            velocity.vy *= -1;
          }

          // Keep in bounds
          transform.x = Math.max(
            sprite.width / 2,
            Math.min(canvas.width - sprite.width / 2, transform.x)
          );
          transform.y = Math.max(
            sprite.height / 2,
            Math.min(canvas.height - sprite.height / 2, transform.y)
          );
        }
      }
    },
  });

  return engine;
}

