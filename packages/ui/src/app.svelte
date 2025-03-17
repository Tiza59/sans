<script>
  import { onMount } from 'svelte';
  import { Button } from './components/html5/index.js';
  import { getPlatformInfo } from './index.js';
  
  let platformInfo = {};
  let clickCount = 0;
  
  function handleClick() {
    clickCount++;
  }
  
  onMount(() => {
    platformInfo = getPlatformInfo();
  });
</script>

<main>
  <h1>Sans UI - Native UI Architecture</h1>
  
  <section class="platform-info">
    <h2>Platform Information</h2>
    <pre>{JSON.stringify(platformInfo, null, 2)}</pre>
  </section>
  
  <section class="demo-section">
    <h2>Button Component Example</h2>
    <div class="component-row">
      <Button type="primary" onClick={handleClick}>Click Me ({clickCount})</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="danger">Danger</Button>
      <Button disabled>Disabled</Button>
    </div>
  </section>
  
  <section class="demo-section">
    <h2>Architecture Overview</h2>
    <p>
      This demo showcases the new Sans UI architecture that uses:
    </p>
    <ul>
      <li><strong>NodeGUI</strong> for desktop platforms (Windows, macOS, Linux)</li>
      <li><strong>NativeScript</strong> for mobile platforms (iOS, Android)</li>
      <li>Web Components and Svelte for the developer API</li>
    </ul>
    <p>
      The architecture automatically detects the current platform and uses the appropriate native UI renderer.
    </p>
  </section>
</main>

<style>
  main {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
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
  
  ul {
    line-height: 1.6;
  }
  
  li {
    margin-bottom: 8px;
  }
</style>