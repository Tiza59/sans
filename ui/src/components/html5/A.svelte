<script>
  /**
   * A component - An anchor element for creating hyperlinks
   */
  export let id = undefined;
  export let className = undefined;
  export let style = undefined;
  export let href = undefined;
  export let target = undefined;
  export let rel = undefined;
  export let download = undefined;
  export let role = undefined;
  export let tabindex = undefined;
  export let ariaLabel = undefined;
  export let dataTestid = undefined;
  export let onClick = () => {};
</script>

<a
  {id}
  class={className}
  {style}
  {href}
  {target}
  {rel}
  {download}
  {role}
  tabindex={tabindex}
  aria-label={ariaLabel}
  data-testid={dataTestid}
  on:click={onClick}
>
  <slot />
</a>
