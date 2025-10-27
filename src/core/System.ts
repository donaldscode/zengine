import type { EntityId } from './Entity';

/**
 * Base interface for all systems
 * Systems process entities with specific components
 */
export abstract class System {
  /**
   * Update the system - called each frame
   * @param deltaTime Time since last frame in seconds
   */
  abstract update(deltaTime: number): void;
  
  /**
   * Called when the system is registered
   */
  onInit?(): void;
  
  /**
   * Called when the system is removed
   */
  onDestroy?(): void;
}

/**
 * System manager handles registration and execution of systems
 */
export class SystemManager {
  private systems: System[] = [];
  
  /**
   * Register a system
   */
  add(system: System): void {
    this.systems.push(system);
    system.onInit?.();
  }
  
  /**
   * Remove a system
   */
  remove(system: System): void {
    const index = this.systems.indexOf(system);
    if (index !== -1) {
      this.systems[index].onDestroy?.();
      this.systems.splice(index, 1);
    }
  }
  
  /**
   * Update all systems
   */
  update(deltaTime: number): void {
    for (const system of this.systems) {
      system.update(deltaTime);
    }
  }
  
  /**
   * Clear all systems
   */
  clear(): void {
    this.systems.forEach(system => system.onDestroy?.());
    this.systems = [];
  }
}

