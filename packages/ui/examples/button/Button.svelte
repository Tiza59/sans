<script>
  import { onMount } from 'svelte';
  import { Button } from '../../src/components/html5/index.js';
  import { getPlatformInfo } from '../../src/index.js';
  
  let clickCount = 0;
  let platformInfo = {};
  
  function handleClick() {
    clickCount++;
  }
  
  onMount(() => {
    platformInfo = getPlatformInfo();
  });
</script>

<div class="container">
  <h1>
    <img src="../../logo.svg" alt="Sans UI Logo" height="40" style="vertical-align: middle; margin-right: 10px;">
    Sans UI Button Example (Svelte)
  </h1>
  <p>This example demonstrates how to use the Sans UI Button component with the new native UI architecture in a Svelte application.</p>
  
  <section class="platform-info">
    <h2>Platform Information</h2>
    <pre>{JSON.stringify(platformInfo, null, 2)}</pre>
  </section>
  
  <section class="demo-section">
    <h2>Basic Buttons</h2>
    <div class="component-row">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="danger">Danger</Button>
      <Button>Default</Button>
    </div>
  </section>
  
  <section class="demo-section">
    <h2>Button Sizes</h2>
    <div class="component-row">
      <Button type="primary" size="small">Small</Button>
      <Button type="primary" size="medium">Medium</Button>
      <Button type="primary" size="large">Large</Button>
    </div>
  </section>
  
  <section class="demo-section">
    <h2>Disabled Button</h2>
    <div class="component-row">
      <Button type="primary" disabled>Disabled</Button>
    </div>
  </section>
  
  <section class="demo-section">
    <h2>Full Width Button</h2>
    <div class="component-row">
      <Button type="primary" fullWidth>Full Width Button</Button>
    </div>
  </section>
  
  <section class="demo-section">
    <h2>Event Handling</h2>
    <div class="component-row">
      <Button type="primary" onClick={handleClick}>Click Me ({clickCount})</Button>
    </div>
  </section>
  
  <section class="demo-section">
    <h2>Native UI Architecture Benefits</h2>
    <ul>
      <li><strong>Cross-Platform:</strong> The same component works on Web, Desktop (NodeGUI), and Mobile (NativeScript)</li>
      <li><strong>Native Performance:</strong> Uses native UI widgets instead of WebView for better performance</li>
      <li><strong>Consistent API:</strong> Same Svelte component API across all platforms</li>
      <li><strong>Automatic Platform Detection:</strong> Adapts to the current platform automatically</li>
    </ul>
  </section>
</div>

<style>
  .container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    color: #333;
  }
  
  .platform-info {
    background-color: #e9f5ff;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
  }
  
  .demo-section {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
  }
  
  .component-row {
    display: flex;
    gap: 10px;
    margin: 10px 0;
    flex-wrap: wrap;
    align-items: center;
  }
  
  pre {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 4px;
    overflow: auto;
  }
  
  code {
    font-family: 'Courier New', Courier, monospace;
  }
  
  ul {
    line-height: 1.6;
  }
  
  li {
    margin-bottom: 8px;
  }
</style>
