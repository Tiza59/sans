/**
 * Sans UI Component Abstraction Layer
 * 
 * This module exports the component abstraction layer for Sans UI components,
 * making it easy to create and manage components across different platforms.
 */

import ComponentAdapter from './ComponentAdapter';
import ComponentFactory from './ComponentFactory';

// Export the component abstraction layer
export {
  ComponentAdapter,
  ComponentFactory
};

// Default export for convenience
export default ComponentFactory;
