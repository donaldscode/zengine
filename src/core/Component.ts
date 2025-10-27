import type { EntityId } from './Entity';

/**
 * Base interface for all components
 * Components store data, no behavior
 */
export interface Component {
  entityId: EntityId;
}

/**
 * Component storage with fast lookup
 */
export class ComponentManager<T extends Component> {
  private components = new Map<EntityId, T>();
  
  /**
   * Add or update a component for an entity
   */
  set(component: T): void {
    this.components.set(component.entityId, component);
  }
  
  /**
   * Get a component for an entity
   */
  get(entityId: EntityId): T | undefined {
    return this.components.get(entityId);
  }
  
  /**
   * Check if an entity has this component
   */
  has(entityId: EntityId): boolean {
    return this.components.has(entityId);
  }
  
  /**
   * Remove a component for an entity
   */
  remove(entityId: EntityId): void {
    this.components.delete(entityId);
  }
  
  /**
   * Get all components of this type
   */
  getAll(): T[] {
    return Array.from(this.components.values());
  }
  
  /**
   * Clear all components
   */
  clear(): void {
    this.components.clear();
  }
}

