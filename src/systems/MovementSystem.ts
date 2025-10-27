import { System } from '../core/System';
import type { Scene } from '../core/Scene';
import type { TransformComponent } from '../components/Transform';
import type { VelocityComponent } from '../components/Velocity';

export class MovementSystem extends System {
  constructor(private scene: Scene) {
    super();
  }
  
  update(deltaTime: number): void {
    const transforms = this.scene.getComponents<TransformComponent>('Transform');
    
    for (const transform of transforms) {
      const velocity = this.scene.getComponent<VelocityComponent>(
        transform.entityId,
        'Velocity'
      );
      
      if (velocity) {
        transform.x += velocity.vx * deltaTime;
        transform.y += velocity.vy * deltaTime;
      }
    }
  }
}

