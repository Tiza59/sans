<script>
  /**
   * Paragraph component - A text paragraph element
   */
  export let id = undefined;
  export let className = undefined;
  export let style = undefined;
  export let role = undefined;
  export let tabindex = undefined;
  export let ariaLabel = undefined;
  export let dataTestid = undefined;
  export let onClick = () => {};
</script>

<p
  {id}
  class={className}
  {style}
  {role}
  tabindex={tabindex}
  aria-label={ariaLabel}
  data-testid={dataTestid}
  on:click={onClick}
>
  <slot />
</p>
