<script>
  /**
   * Button component for consistent UI elements
   */
  export let type = 'primary'; // primary, secondary, danger, etc.
  export let size = 'medium'; // small, medium, large
  export let disabled = false;
  export let fullWidth = false;
  export let onClick = () => {};
  export let style = '';
</script>

<button
  class="btn {type} {size} {fullWidth ? 'full-width' : ''}"
  {disabled}
  on:click={onClick}
  style={style}
>
  <slot />
</button>

<style>
  .btn {
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
  
  .btn:hover:not(:disabled) {
    filter: brightness(1.1);
  }
  
  .btn:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Types */
  .primary {
    background-color: #4a56e2;
    color: white;
  }
  
  .secondary {
    background-color: #e2e8f0;
    color: #1a202c;
  }
  
  .danger {
    background-color: #e53e3e;
    color: white;
  }
  
  /* Sizes */
  .small {
    padding: 6px 12px;
    font-size: 0.875rem;
  }
  
  .medium {
    padding: 8px 16px;
    font-size: 1rem;
  }
  
  .large {
    padding: 12px 24px;
    font-size: 1.125rem;
  }
  
  .full-width {
    width: 100%;
  }
</style>
