import type { Component } from '../core/Component';

/**
 * Transform component - position, rotation, scale
 */
export interface TransformComponent extends Component {
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
}

export class Transform {
  static create(entityId: number, x = 0, y = 0): TransformComponent {
    return {
      entityId,
      x,
      y,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    };
  }
}

