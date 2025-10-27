import { Entity } from './Entity';
import { ComponentManager } from './Component';
import { SystemManager } from './System';
import type { EntityId } from './Entity';
import type { Component } from './Component';
import type { System } from './System';

/**
 * Scene - the main container for entities, components, and systems
 */
export class Scene {
  private entityIds = new Set<EntityId>();
  private componentManagers = new Map<string, ComponentManager<any>>();
  private systemManager = new SystemManager();
  
  /**
   * Create a new entity in this scene
   */
  createEntity(): EntityId {
    const id = Entity.create();
    this.entityIds.add(id);
    return id;
  }
  
  /**
   * Remove an entity and all its components
   */
  removeEntity(entityId: EntityId): void {
    this.entityIds.delete(entityId);
    for (const manager of this.componentManagers.values()) {
      manager.remove(entityId);
    }
  }
  
  /**
   * Get the component manager for a specific component type
   */
  private getComponentManager<T extends Component>(
    componentName: string
  ): ComponentManager<T> {
    let manager = this.componentManagers.get(componentName);
    if (!manager) {
      manager = new ComponentManager<T>();
      this.componentManagers.set(componentName, manager);
    }
    return manager;
  }
  
  /**
   * Register a component with the scene
   */
  registerComponent<T extends Component>(component: T, type: string): void {
    const manager = this.getComponentManager<T>(type);
    manager.set(component);
  }
  
  /**
   * Get a component for an entity
   */
  getComponent<T extends Component>(entityId: EntityId, type: string): T | undefined {
    const manager = this.componentManagers.get(type);
    return manager?.get(entityId);
  }
  
  /**
   * Remove a component from an entity
   */
  removeComponent(entityId: EntityId, type: string): void {
    const manager = this.componentManagers.get(type);
    manager?.remove(entityId);
  }
  
  /**
   * Get all components of a specific type
   */
  getComponents<T extends Component>(type: string): T[] {
    const manager = this.componentManagers.get(type);
    return manager?.getAll() ?? [];
  }
  
  /**
   * Add a system to the scene
   */
  addSystem(system: System): void {
    this.systemManager.add(system);
  }
  
  /**
   * Remove a system from the scene
   */
  removeSystem(system: System): void {
    this.systemManager.remove(system);
  }
  
  /**
   * Update the scene (process all systems)
   */
  update(deltaTime: number): void {
    this.systemManager.update(deltaTime);
  }
  
  /**
   * Clear all entities, components, and systems
   */
  clear(): void {
    this.entityIds.clear();
    this.componentManagers.clear();
    this.systemManager.clear();
  }
  
  /**
   * Get all entity IDs in the scene
   */
  getEntities(): EntityId[] {
    return Array.from(this.entityIds);
  }
}

