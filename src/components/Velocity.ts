import type { Component } from '../core/Component';

/**
 * Velocity component - movement speed
 */
export interface VelocityComponent extends Component {
  vx: number;
  vy: number;
}

export class Velocity {
  static create(entityId: number, vx = 0, vy = 0): VelocityComponent {
    return {
      entityId,
      vx,
      vy,
    };
  }
}

