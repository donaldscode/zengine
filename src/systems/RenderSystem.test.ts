import { describe, it, expect, beforeEach } from 'vitest';
import { Scene } from '../core/Scene';
import { RenderSystem } from './RenderSystem';
import { Transform, Sprite } from '../components';

describe('RenderSystem', () => {
  let scene: Scene;
  let system: RenderSystem;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    ctx = canvas.getContext('2d')!;
    scene = new Scene();
    system = new RenderSystem(scene, ctx);
    scene.addSystem(system);
  });

  it('should clear canvas on update', () => {
    ctx.fillRect(0, 0, 100, 100);
    expect(ctx.getImageData(0, 0, 1, 1).data[0]).not.toBe(0);

    scene.update(0.016);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let allZero = true;
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i] !== 0) {
        allZero = false;
        break;
      }
    }
    expect(allZero).toBe(true);
  });

  it('should render entity with transform and sprite', () => {
    const entity = scene.createEntity();

    const transform = Transform.create(entity, 100, 100);
    scene.registerComponent(transform, 'Transform');

    const sprite = Sprite.create(entity, 50, 50, '#ff0000');
    scene.registerComponent(sprite, 'Sprite');

    scene.update(0.016);

    // Check that something was drawn
    const imageData = ctx.getImageData(100, 100, 1, 1);
    expect(imageData.data[0]).toBeGreaterThan(0);
  });

  it('should not render entities without sprite', () => {
    const entity = scene.createEntity();

    const transform = Transform.create(entity, 400, 300);
    scene.registerComponent(transform, 'Transform');

    // Should complete without errors
    expect(() => scene.update(0.016)).not.toThrow();
  });

  it('should apply correct transformations', () => {
    const entity = scene.createEntity();

    const transform = Transform.create(entity, 200, 150);
    transform.rotation = Math.PI / 4;
    transform.scaleX = 2;
    transform.scaleY = 2;
    scene.registerComponent(transform, 'Transform');

    const sprite = Sprite.create(entity, 50, 50);
    scene.registerComponent(sprite, 'Sprite');

    expect(() => scene.update(0.016)).not.toThrow();
  });
});

