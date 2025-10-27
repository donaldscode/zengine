# Zengine

A lightweight, high-performance game engine built with TypeScript for modern web applications. Zengine uses an Entity-Component-System (ECS) architecture for flexible and scalable game development.

## Features

- 🚀 **Zero Configuration** - Get started in seconds
- 🎯 **ECS Architecture** - Clean separation of data and logic
- ⚡ **High Performance** - Optimized for 60+ FPS
- 💪 **Type-Safe** - Full TypeScript support
- 🎨 **Canvas Rendering** - Built-in 2D rendering system
- 🔧 **Extensible** - Easy to add custom components and systems
- ✅ **Well Tested** - Comprehensive test coverage
- 🛠️ **Developer Friendly** - ESLint, Prettier, and CI/CD configured

## Installation

```bash
npm install
```

## Quick Start

```typescript
import {
  Engine,
  Scene,
  Transform,
  Sprite,
  Velocity,
  MovementSystem,
  RenderSystem,
} from 'zengine';

// Get canvas element
const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

// Create engine and scene
const engine = new Engine(canvas);
const scene = engine.getScene();

// Add systems
scene.addSystem(new MovementSystem(scene));
scene.addSystem(new RenderSystem(scene, ctx));

// Create an entity
const entity = scene.createEntity();

// Add components
const transform = Transform.create(entity, 400, 300);
const sprite = Sprite.create(entity, 50, 50, '#ff6b6b');
const velocity = Velocity.create(entity, 50, 50);

scene.registerComponent(transform, 'Transform');
scene.registerComponent(sprite, 'Sprite');
scene.registerComponent(velocity, 'Velocity');

// Start the engine
engine.start();
```

## Core Concepts

### Entities

Entities are simple IDs that tie together components. They have no data or behavior.

```typescript
const entity = scene.createEntity();
```

### Components

Components store data only, no behavior.

```typescript
import { Transform, Sprite } from 'zengine';

const transform = Transform.create(entityId, x, y);
const sprite = Sprite.create(entityId, width, height, color);
```

### Systems

Systems contain behavior and process entities with specific components.

```typescript
import { System } from 'zengine';

class CustomSystem extends System {
  constructor(private scene: Scene) {
    super();
  }

  update(deltaTime: number): void {
    // Process entities
  }
}
```

### Scene

The scene manages entities, components, and systems.

```typescript
const scene = engine.getScene();
scene.addSystem(new CustomSystem(scene));
scene.registerComponent(component, 'ComponentType');
```

## Built-in Components

### Transform

Position, rotation, and scale.

```typescript
const transform = Transform.create(entityId, x, y);
transform.rotation = Math.PI / 4;
transform.scaleX = 2;
transform.scaleY = 2;
```

### Sprite

Visual representation.

```typescript
const sprite = Sprite.create(entityId, 50, 50, '#ff6b6b');
sprite.opacity = 0.5;
```

### Velocity

Movement speed.

```typescript
const velocity = Velocity.create(entityId, 100, -50);
```

## Built-in Systems

### MovementSystem

Applies velocity to transform components.

### RenderSystem

Renders all entities with Transform and Sprite components.

## Custom Components and Systems

### Creating a Custom Component

```typescript
import type { Component } from 'zengine';

export interface HealthComponent extends Component {
  maxHealth: number;
  currentHealth: number;
}

export class Health {
  static create(entityId: number, maxHealth: number): HealthComponent {
    return {
      entityId,
      maxHealth,
      currentHealth: maxHealth,
    };
  }
}
```

### Creating a Custom System

```typescript
import { System } from 'zengine';

export class DamageSystem extends System {
  constructor(private scene: Scene) {
    super();
  }

  update(deltaTime: number): void {
    const healthComponents = this.scene.getComponents('Health');
    for (const health of healthComponents) {
      if (health.currentHealth <= 0) {
        this.scene.removeEntity(health.entityId);
      }
    }
  }
}
```

## Examples

### Interactive Demo

Run the main demo:

```bash
npm run example
```

Then open the browser to see a live demo with bouncing colored rectangles.

### Available Examples

- **demo.html** - Interactive demo with bouncing shapes
- **platformer.html** - Simple platformer game with keyboard controls
- **particles.html** - Particle system with click-to-spawn effects
- **simple.ts** - Basic implementation example

## Project Structure

```
zengine/
├── src/
│   ├── core/           # Core ECS architecture
│   │   ├── Entity.ts
│   │   ├── Component.ts
│   │   ├── System.ts
│   │   └── Scene.ts
│   ├── components/     # Built-in components
│   │   ├── Transform.ts
│   │   ├── Sprite.ts
│   │   └── Velocity.ts
│   ├── systems/        # Built-in systems
│   │   ├── MovementSystem.ts
│   │   └── RenderSystem.ts
│   ├── Engine.ts       # Main engine class
│   └── index.ts        # Public API
├── examples/           # Example projects
└── dist/              # Compiled output
```

## Building

```bash
npm run build
```

This will compile TypeScript to JavaScript in the `dist/` directory.

## Development

```bash
# Build in watch mode
npm run dev

# Type checking
npm run type-check

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

## Testing

Zengine includes comprehensive test coverage using Vitest:

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Code Quality

The project uses ESLint and Prettier for code quality and consistency:

```bash
# Check for linting issues
npm run lint

# Fix linting issues
npm run lint:fix

# Check code formatting
npm run format:check

# Format code
npm run format
```

## API Documentation

### Engine

#### `constructor(canvas: HTMLCanvasElement)`

Creates a new engine instance with the given canvas.

#### `getScene(): Scene`

Returns the current scene.

#### `start(): void`

Starts the engine's game loop.

#### `stop(): void`

Stops the engine.

#### `destroy(): void`

Destroys the engine and cleans up resources.

### Scene

#### `createEntity(): EntityId`

Creates a new entity.

#### `removeEntity(entityId: EntityId): void`

Removes an entity and all its components.

#### `registerComponent<T>(component: T, type: string): void`

Registers a component.

#### `getComponent<T>(entityId: EntityId, type: string): T | undefined`

Gets a component for an entity.

#### `getComponents<T>(type: string): T[]`

Gets all components of a type.

#### `addSystem(system: System): void`

Adds a system to the scene.

#### `removeSystem(system: System): void`

Removes a system from the scene.

#### `update(deltaTime: number): void`

Updates all systems.

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.
