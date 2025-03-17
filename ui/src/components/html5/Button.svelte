<script>
  /**
   * Button component for consistent UI elements
   */
  import { onMount, onDestroy } from 'svelte';
  import { createButton, getNativeUI } from '../../lib/components/ComponentFactory.js';
  
  export let type = 'primary'; // primary, secondary, danger, etc.
  export let size = 'medium'; // small, medium, large
  export let disabled = false;
  export let fullWidth = false;
  export let onClick = () => {};
  export let style = '';
  
  let buttonElement;
  let nativeUI = getNativeUI();
  
  onMount(() => {
    // Create the native button element
    buttonElement = createButton({
      label: '',  // Will be filled by the slot content
      type,
      size,
      disabled,
      fullWidth,
      style
    });
    
    // Set up event handler
    nativeUI.setEventHandler(buttonElement, 'click', onClick);
    
    // If we're in a web environment, the button needs to be added to the DOM
    if (typeof document !== 'undefined') {
      const container = document.getElementById('button-container');
      if (container && buttonElement) {
        container.appendChild(buttonElement);
      }
    }
    
    return () => {
      // Clean up
      if (typeof document !== 'undefined') {
        const container = document.getElementById('button-container');
        if (container && buttonElement && buttonElement.parentNode === container) {
          container.removeChild(buttonElement);
        }
      }
    };
  });
  
  // Update the button when props change
  $: if (buttonElement) {
    nativeUI.updateElement(buttonElement, {
      type,
      size,
      disabled,
      fullWidth,
      style
    });
  }
  
  // Handle slot content changes
  function updateButtonText() {
    if (buttonElement && typeof document !== 'undefined') {
      const container = document.getElementById('button-content');
      if (container) {
        const text = container.textContent || '';
        nativeUI.updateElement(buttonElement, { label: text.trim() });
      }
    }
  }
</script>

<div id="button-container" class="button-container"></div>

<!-- Hidden container to capture slot content -->
<div id="button-content" class="hidden-content" on:slotchange={updateButtonText}>
  <slot />
</div>

<style>
  .button-container {
    display: inline-block;
  }
  
  .hidden-content {
    display: none;
  }
  
  :global(.button-container button) {
    font-family: inherit;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s, transform 0.1s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  :global(.button-container button:hover:not(:disabled)) {
    filter: brightness(1.1);
  }
  
  :global(.button-container button:active:not(:disabled)) {
    transform: scale(0.98);
  }
  
  :global(.button-container button:disabled) {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Types */
  :global(.button-container button.primary) {
    background-color: #4a56e2;
    color: white;
  }
  
  :global(.button-container button.secondary) {
    background-color: #e2e8f0;
    color: #1a202c;
  }
  
  :global(.button-container button.danger) {
    background-color: #e53e3e;
    color: white;
  }
  
  /* Sizes */
  :global(.button-container button.small) {
    padding: 6px 12px;
    font-size: 0.875rem;
  }
  
  :global(.button-container button.medium) {
    padding: 8px 16px;
    font-size: 1rem;
  }
  
  :global(.button-container button.large) {
    padding: 12px 24px;
    font-size: 1.125rem;
  }
  
  :global(.button-container button.full-width) {
    width: 100%;
  }
</style>
