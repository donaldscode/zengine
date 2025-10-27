import { Scene } from './core/Scene';

/**
 * Main engine class
 */
export class Engine {
  private scene: Scene;
  private isRunning = false;
  private lastTime = 0;
  private animationFrameId = 0;
  
  constructor(public canvas: HTMLCanvasElement) {
    this.scene = new Scene();
  }
  
  /**
   * Get the current scene
   */
  getScene(): Scene {
    return this.scene;
  }
  
  /**
   * Start the engine
   */
  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastTime = performance.now() / 1000;
    this.tick();
  }
  
  /**
   * Stop the engine
   */
  stop(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrameId);
  }
  
  /**
   * Main game loop
   */
  private tick = (): void => {
    const currentTime = performance.now() / 1000;
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Update scene
    this.scene.update(deltaTime);
    
    // Continue loop
    if (this.isRunning) {
      this.animationFrameId = requestAnimationFrame(this.tick);
    }
  };
  
  /**
   * Destroy the engine and clean up
   */
  destroy(): void {
    this.stop();
    this.scene.clear();
  }
}

