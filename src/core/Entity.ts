/**
 * Unique identifier for an entity in the engine
 */
export type EntityId = number;

/**
 * Entity - a simple identifier in an ECS architecture
 * Entities are just IDs that tie together Components
 */
export class Entity {
  private static nextId = 0;
  
  /**
   * Generate a new unique entity ID
   */
  static create(): EntityId {
    return Entity.nextId++;
  }
  
  /**
   * Reset entity ID counter (useful for testing)
   */
  static reset(): void {
    Entity.nextId = 0;
  }
}

