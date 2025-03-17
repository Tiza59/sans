<script>
  /**
   * Img component - An image element
   */
  export let id = undefined;
  export let className = undefined;
  export let style = undefined;
  export let src = '';
  export let alt = '';
  export let width = undefined;
  export let height = undefined;
  export let loading = undefined; // eager, lazy
  export let decoding = undefined; // sync, async, auto
  export let role = undefined;
  export let ariaLabel = undefined;
  export let dataTestid = undefined;
  export let onClick = () => {};
</script>

<img
  {id}
  class={className}
  {style}
  {src}
  {alt}
  {width}
  {height}
  {loading}
  {decoding}
  {role}
  aria-label={ariaLabel}
  data-testid={dataTestid}
  on:click={onClick}
  on:error
  on:load
/>
