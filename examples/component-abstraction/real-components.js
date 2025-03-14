/**
 * This file demonstrates how to use the Sans UI component abstraction layer
 * with the actual Sans UI components from the source directory.
 */

// Import the Svelte components directly
import Button from '../../src/components/html5/Button.svelte';
import Input from '../../src/components/html5/Input.svelte';
import Select from '../../src/components/html5/Select.svelte';

// Create a wrapper for Svelte components
class SvelteComponentWrapper {
  constructor(Component, props = {}) {
    this.Component = Component;
    this.props = props;
    this.instance = null;
    this.element = null;
  }

  create(target) {
    if (!target) {
      console.error('Target element is required');
      return null;
    }

    this.instance = new this.Component({
      target,
      props: this.props
    });

    // Store a reference to the component's DOM element
    this.element = target.querySelector(':scope > *:last-child');
    return this.element;
  }

  destroy() {
    if (this.instance) {
      this.instance.$destroy();
      this.instance = null;
      this.element = null;
    }
  }

  getElement() {
    return this.element;
  }

  setProps(props) {
    if (this.instance) {
      this.instance.$set(props);
    }
    Object.assign(this.props, props);
  }
}

// Export the components
export { Button, Input, Select, SvelteComponentWrapper };
