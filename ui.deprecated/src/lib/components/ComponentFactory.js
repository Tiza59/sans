/**
 * ComponentFactory.js
 * 
 * A factory for creating component adapters for Sans UI components.
 * This provides a simplified API for creating and managing components.
 */

import ComponentAdapter from './ComponentAdapter';

class ComponentFactory {
  /**
   * Create a button component
   * @param {Object} props - Initial properties for the button
   * @returns {ComponentAdapter} The component adapter instance
   */
  static createButton(props = {}) {
    const adapter = new ComponentAdapter('button');
    if (props) {
      adapter.setProperties(props);
    }
    return adapter;
  }

  /**
   * Create an input component
   * @param {Object} props - Initial properties for the input
   * @returns {ComponentAdapter} The component adapter instance
   */
  static createInput(props = {}) {
    const adapter = new ComponentAdapter('input');
    if (props) {
      adapter.setProperties(props);
    }
    return adapter;
  }

  /**
   * Create a select component
   * @param {Object} props - Initial properties for the select
   * @returns {ComponentAdapter} The component adapter instance
   */
  static createSelect(props = {}) {
    const adapter = new ComponentAdapter('select');
    if (props) {
      adapter.setProperties(props);
    }
    return adapter;
  }

  /**
   * Create a form component
   * @param {Object} props - Initial properties for the form
   * @returns {ComponentAdapter} The component adapter instance
   */
  static createForm(props = {}) {
    const adapter = new ComponentAdapter('form');
    if (props) {
      adapter.setProperties(props);
    }
    return adapter;
  }
  
  /**
   * Create a label component
   * @param {Object} props - Initial properties for the label
   * @returns {ComponentAdapter} The component adapter instance
   */
  static createLabel(props = {}) {
    const adapter = new ComponentAdapter('label');
    if (props) {
      adapter.setProperties(props);
    }
    return adapter;
  }
  
  /**
   * Create a textarea component
   * @param {Object} props - Initial properties for the textarea
   * @returns {ComponentAdapter} The component adapter instance
   */
  static createTextarea(props = {}) {
    const adapter = new ComponentAdapter('textarea');
    if (props) {
      adapter.setProperties(props);
    }
    return adapter;
  }
  
  /**
   * Create an option component
   * @param {Object} props - Initial properties for the option
   * @returns {ComponentAdapter} The component adapter instance
   */
  static createOption(props = {}) {
    const adapter = new ComponentAdapter('option');
    if (props) {
      adapter.setProperties(props);
    }
    return adapter;
  }
  
  // Form component is already defined above

  /**
   * Create a card component
   * @param {Object} props - Initial properties for the card
   * @returns {ComponentAdapter} The component adapter instance
   */
  static createCard(props = {}) {
    const adapter = new ComponentAdapter('card');
    if (props) {
      adapter.setProperties(props);
    }
    return adapter;
  }

  /**
   * Create a modal component
   * @param {Object} props - Initial properties for the modal
   * @returns {ComponentAdapter} The component adapter instance
   */
  static createModal(props = {}) {
    const adapter = new ComponentAdapter('modal');
    if (props) {
      adapter.setProperties(props);
    }
    return adapter;
  }

  /**
   * Create any Sans UI component by type
   * @param {string} type - The component type
   * @param {Object} props - Initial properties for the component
   * @returns {ComponentAdapter} The component adapter instance
   */
  static create(type, props = {}) {
    const adapter = new ComponentAdapter(type);
    if (props) {
      adapter.setProperties(props);
    }
    return adapter;
  }
}

export default ComponentFactory;
