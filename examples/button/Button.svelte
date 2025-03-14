<script>
  import Button from '../../src/components/html5/Button.svelte';
  
  let clickCount = 0;
  
  function handleClick() {
    clickCount++;
  }
</script>

<div class="container">
  <h1>
    <img src="../../logo.svg" alt="Sans UI Logo" height="40" style="vertical-align: middle; margin-right: 10px;">
    Sans UI Button Example (Svelte)
  </h1>
  <p>This example demonstrates how to use the Sans UI Button component in a Svelte application.</p>
  
  <section class="demo-section">
    <h2>Basic Buttons</h2>
    <div class="component-row">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="danger">Danger</Button>
      <Button>Default</Button>
    </div>
    
    <pre><code>&lt;Button type="primary"&gt;Primary&lt;/Button&gt;
&lt;Button type="secondary"&gt;Secondary&lt;/Button&gt;
&lt;Button type="danger"&gt;Danger&lt;/Button&gt;
&lt;Button&gt;Default&lt;/Button&gt;</code></pre>
  </section>
  
  <section class="demo-section">
    <h2>Button Sizes</h2>
    <div class="component-row">
      <Button type="primary" size="small">Small</Button>
      <Button type="primary" size="medium">Medium</Button>
      <Button type="primary" size="large">Large</Button>
    </div>
    
    <pre><code>&lt;Button type="primary" size="small"&gt;Small&lt;/Button&gt;
&lt;Button type="primary" size="medium"&gt;Medium&lt;/Button&gt;
&lt;Button type="primary" size="large"&gt;Large&lt;/Button&gt;</code></pre>
  </section>
  
  <section class="demo-section">
    <h2>Disabled Button</h2>
    <div class="component-row">
      <Button type="primary" disabled>Disabled</Button>
    </div>
    
    <pre><code>&lt;Button type="primary" disabled&gt;Disabled&lt;/Button&gt;</code></pre>
  </section>
  
  <section class="demo-section">
    <h2>Full Width Button</h2>
    <div class="component-row">
      <Button type="primary" fullWidth>Full Width Button</Button>
    </div>
    
    <pre><code>&lt;Button type="primary" fullWidth&gt;Full Width Button&lt;/Button&gt;</code></pre>
  </section>
  
  <section class="demo-section">
    <h2>Event Handling</h2>
    <div class="component-row">
      <Button type="primary" onClick={handleClick}>Click Me ({clickCount})</Button>
    </div>
    
    <pre><code>&lt;script&gt;
  let clickCount = 0;
  
  function handleClick() {
    clickCount++;
  }
&lt;/script&gt;

&lt;Button type="primary" onClick={handleClick}&gt;
  Click Me ({clickCount})
&lt;/Button&gt;</code></pre>
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
</style>
