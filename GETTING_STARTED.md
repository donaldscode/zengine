# Getting Started with Zengine

## Current Status

You're currently on branch: `2025-10-27-x94x-02960`

This branch contains all the zengine improvements:
- ✅ Core ECS architecture
- ✅ Built-in components and systems
- ✅ Demo examples
- ✅ Full documentation

## Next Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

This will compile all TypeScript files to the `dist/` directory.

### 3. Run the Demo

```bash
npm run example
```

Then open your browser to see the interactive demo with bouncing shapes!

### 4. Try the Simple Example

Open `examples/simple.ts` to see a basic implementation with:
- A single bouncing square
- Collision detection with walls
- Velocity-based movement

### 5. Development

```bash
# Watch mode for development
npm run dev

# Type checking only
npm run type-check
```

## Branch Workflow

### Current Branch
- **Name**: `2025-10-27-x94x-02960`
- **Status**: Up to date with origin
- **Contains**: All zengine improvements

### What's New vs Main

Your branch has 21 new/modified files compared to `main`:
- Core architecture (Entity, Component, System, Scene)
- Built-in components (Transform, Sprite, Velocity)
- Built-in systems (MovementSystem, RenderSystem)
- Complete documentation (README, examples)
- Project configuration (tsconfig, vite, package.json)

### Merge Options

When you're ready to merge:

```bash
# Switch to main
git checkout main

# Merge your improvements
git merge 2025-10-27-x94x-02960

# Push to origin
git push origin main
```

## Project Structure

```
zengine/
├── src/
│   ├── core/              # ECS architecture
│   │   ├── Entity.ts      # Entity IDs
│   │   ├── Component.ts    # Component storage
│   │   ├── System.ts       # System management
│   │   └── Scene.ts        # Scene coordination
│   ├── components/        # Built-in components
│   │   ├── Transform.ts    # Position/rotation/scale
│   │   ├── Sprite.ts       # Visual rendering
│   │   └── Velocity.ts     # Movement speed
│   ├── systems/           # Built-in systems
│   │   ├── MovementSystem.ts  # Applies velocity
│   │   └── RenderSystem.ts    # Renders sprites
│   ├── Engine.ts          # Main engine class
│   └── index.ts           # Public API
├── examples/              # Example projects
│   ├── demo.html          # Interactive demo
│   └── simple.ts          # Simple example
└── [config files]
```

## Quick Example

```typescript
import { Engine, Transform, Sprite, Velocity, MovementSystem, RenderSystem } from 'zengine';

// Create engine
const canvas = document.querySelector('#gameCanvas');
const engine = new Engine(canvas);
const scene = engine.getScene();

// Add systems
scene.addSystem(new MovementSystem(scene));
scene.addSystem(new RenderSystem(scene, canvas.getContext('2d')));

// Create an entity
const entity = scene.createEntity();

// Add components
const transform = Transform.create(entity, 400, 300);
const sprite = Sprite.create(entity, 50, 50, '#ff6b6b');
const velocity = Velocity.create(entity, 50, 50);

scene.registerComponent(transform, 'Transform');
scene.registerComponent(sprite, 'Sprite');
scene.registerComponent(velocity, 'Velocity');

// Start!
engine.start();
```

## Tips

1. **Custom Components**: Create new components by extending the `Component` interface
2. **Custom Systems**: Extend the `System` class and implement `update(deltaTime)`
3. **Performance**: Systems are called every frame, so keep them optimized
4. **Modularity**: Each system should handle one responsibility

## Have Fun! 🎮

