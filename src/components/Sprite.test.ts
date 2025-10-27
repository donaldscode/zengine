import { describe, it, expect } from 'vitest';
import { Sprite } from './Sprite';

describe('Sprite', () => {
  it('should create sprite with default values', () => {
    const sprite = Sprite.create(0, 50, 50);

    expect(sprite.entityId).toBe(0);
    expect(sprite.width).toBe(50);
    expect(sprite.height).toBe(50);
    expect(sprite.color).toBe('#ffffff');
    expect(sprite.opacity).toBe(1);
  });

  it('should create sprite with custom color', () => {
    const sprite = Sprite.create(1, 100, 75, '#ff0000');

    expect(sprite.entityId).toBe(1);
    expect(sprite.width).toBe(100);
    expect(sprite.height).toBe(75);
    expect(sprite.color).toBe('#ff0000');
    expect(sprite.opacity).toBe(1);
  });
});

