<script>
  import Div from '../../src/components/html5/Div.svelte';
  
  let clickCount = 0;
  
  function handleClick() {
    clickCount++;
  }
</script>

<div class="container">
  <h1>
    <img src="../../logo.svg" alt="Sans UI Logo" height="40" style="vertical-align: middle; margin-right: 10px;">
    Sans UI Div Example (Svelte)
  </h1>
  <p>This example demonstrates how to use the Sans UI Div component in a Svelte application.</p>
  
  <section class="demo-section">
    <h2>Basic Div</h2>
    <Div className="box primary-bg">
      This is a basic Sans UI Div component with custom styling
    </Div>
    
    <pre><code>&lt;Div className="box primary-bg"&gt;
  This is a basic Sans UI Div component with custom styling
&lt;/Div&gt;</code></pre>
  </section>
  
  <section class="demo-section">
    <h2>Div with ID and Attributes</h2>
    <Div id="custom-div" className="box secondary-bg" role="region" ariaLabel="Example region">
      This div has a custom ID, class, role, and aria-label
    </Div>
    
    <pre><code>&lt;Div 
  id="custom-div" 
  className="box secondary-bg" 
  role="region" 
  ariaLabel="Example region"
&gt;
  This div has a custom ID, class, role, and aria-label
&lt;/Div&gt;</code></pre>
  </section>
  
  <section class="demo-section">
    <h2>Nested Divs</h2>
    <Div className="flex-container">
      <Div className="flex-item">Item 1</Div>
      <Div className="flex-item">Item 2</Div>
      <Div className="flex-item">Item 3</Div>
    </Div>
    
    <pre><code>&lt;Div className="flex-container"&gt;
  &lt;Div className="flex-item"&gt;Item 1&lt;/Div&gt;
  &lt;Div className="flex-item"&gt;Item 2&lt;/Div&gt;
  &lt;Div className="flex-item"&gt;Item 3&lt;/Div&gt;
&lt;/Div&gt;</code></pre>
  </section>
  
  <section class="demo-section">
    <h2>Event Handling</h2>
    <Div className="box secondary-bg" style="cursor: pointer;" onClick={handleClick}>
      Click me to see an event in action (Clicked {clickCount} times)
    </Div>
    
    <pre><code>&lt;script&gt;
  let clickCount = 0;
  
  function handleClick() {
    clickCount++;
  }
&lt;/script&gt;

&lt;Div 
  className="box secondary-bg" 
  style="cursor: pointer;" 
  onClick={handleClick}
&gt;
  Click me to see an event in action (Clicked {clickCount} times)
&lt;/Div&gt;</code></pre>
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
  
  /* Custom styles for demo */
  .box {
    padding: 20px;
    border-radius: 8px;
    margin: 10px 0;
  }
  
  .primary-bg {
    background-color: #4a56e2;
    color: white;
  }
  
  .secondary-bg {
    background-color: #e2e8f0;
    color: #1a202c;
  }
  
  .flex-container {
    display: flex;
    gap: 10px;
  }
  
  .flex-item {
    flex: 1;
    padding: 15px;
    background-color: #e2e8f0;
    border-radius: 4px;
    text-align: center;
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
