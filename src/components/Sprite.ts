import type { Component } from '../core/Component';

/**
 * Sprite component - visual representation
 */
export interface SpriteComponent extends Component {
  width: number;
  height: number;
  color: string;
  opacity: number;
}

export class Sprite {
  static create(
    entityId: number,
    width: number,
    height: number,
    color = '#ffffff'
  ): SpriteComponent {
    return {
      entityId,
      width,
      height,
      color,
      opacity: 1,
    };
  }
}

