import { System } from '../core/System';
import type { Scene } from '../core/Scene';
import type { TransformComponent } from '../components/Transform';
import type { SpriteComponent } from '../components/Sprite';

export class RenderSystem extends System {
  constructor(
    private scene: Scene,
    private ctx: CanvasRenderingContext2D
  ) {
    super();
  }
  
  update(_deltaTime: number): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
    const transforms = this.scene.getComponents<TransformComponent>('Transform');
    
    for (const transform of transforms) {
      const sprite = this.scene.getComponent<SpriteComponent>(
        transform.entityId,
        'Sprite'
      );
      
      if (sprite) {
        this.ctx.save();
        
        // Apply transform
        this.ctx.translate(transform.x, transform.y);
        this.ctx.rotate(transform.rotation);
        this.ctx.scale(transform.scaleX, transform.scaleY);
        
        // Set opacity
        this.ctx.globalAlpha = sprite.opacity;
        
        // Draw sprite
        this.ctx.fillStyle = sprite.color;
        this.ctx.fillRect(
          -sprite.width / 2,
          -sprite.height / 2,
          sprite.width,
          sprite.height
        );
        
        this.ctx.restore();
      }
    }
  }
}

