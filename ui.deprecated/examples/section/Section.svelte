<script>
  import Section from '../../src/components/html5/Section.svelte';
  
  let clickCount = 0;
  
  function handleClick() {
    clickCount++;
  }
</script>

<div class="container">
  <h1>
    <img src="../../logo.svg" alt="Sans UI Logo" height="40" style="vertical-align: middle; margin-right: 10px;">
    Sans UI Section Example (Svelte)
  </h1>
  <p>This example demonstrates how to use the Sans UI Section component in a Svelte application.</p>
  
  <div class="demo-section">
    <h2>Basic Section</h2>
    <Section className="content-section light-theme">
      <h3>Light Theme Section</h3>
      <p>This is a basic Sans UI Section component with light theme styling.</p>
    </Section>
    
    <pre><code>&lt;Section className="content-section light-theme"&gt;
  &lt;h3&gt;Light Theme Section&lt;/h3&gt;
  &lt;p&gt;This is a basic Sans UI Section component with light theme styling.&lt;/p&gt;
&lt;/Section&gt;</code></pre>
  </div>
  
  <div class="demo-section">
    <h2>Section with Custom Attributes</h2>
    <Section 
      id="custom-section" 
      className="content-section dark-theme" 
      role="region" 
      ariaLabel="Dark theme section"
    >
      <h3>Dark Theme Section</h3>
      <p>This section has a custom ID, class, role, and aria-label.</p>
    </Section>
    
    <pre><code>&lt;Section 
  id="custom-section" 
  className="content-section dark-theme" 
  role="region" 
  ariaLabel="Dark theme section"
&gt;
  &lt;h3&gt;Dark Theme Section&lt;/h3&gt;
  &lt;p&gt;This section has a custom ID, class, role, and aria-label.&lt;/p&gt;
&lt;/Section&gt;</code></pre>
  </div>
  
  <div class="demo-section">
    <h2>Nested Sections</h2>
    <Section className="content-section light-theme">
      <h3>Parent Section</h3>
      <p>This is a parent section that contains a nested section.</p>
      
      <Section className="content-section accent-theme">
        <h3>Nested Section</h3>
        <p>This is a nested section with accent styling.</p>
      </Section>
    </Section>
    
    <pre><code>&lt;Section className="content-section light-theme"&gt;
  &lt;h3&gt;Parent Section&lt;/h3&gt;
  &lt;p&gt;This is a parent section that contains a nested section.&lt;/p&gt;
  
  &lt;Section className="content-section accent-theme"&gt;
    &lt;h3&gt;Nested Section&lt;/h3&gt;
    &lt;p&gt;This is a nested section with accent styling.&lt;/p&gt;
  &lt;/Section&gt;
&lt;/Section&gt;</code></pre>
  </div>
  
  <div class="demo-section">
    <h2>Event Handling</h2>
    <Section 
      className="content-section accent-theme" 
      style="cursor: pointer;" 
      onClick={handleClick}
    >
      <h3>Interactive Section</h3>
      <p>Click me to see an event in action. (Clicked {clickCount} times)</p>
    </Section>
    
    <pre><code>&lt;script&gt;
  let clickCount = 0;
  
  function handleClick() {
    clickCount++;
  }
&lt;/script&gt;

&lt;Section 
  className="content-section accent-theme" 
  style="cursor: pointer;" 
  onClick={handleClick}
&gt;
  &lt;h3&gt;Interactive Section&lt;/h3&gt;
  &lt;p&gt;Click me to see an event in action. (Clicked {clickCount} times)&lt;/p&gt;
&lt;/Section&gt;</code></pre>
  </div>
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
  
  pre {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 4px;
    overflow: auto;
  }
  
  code {
    font-family: 'Courier New', Courier, monospace;
  }
  
  /* Custom styles for demo */
  .content-section {
    padding: 20px;
    margin: 10px 0;
    border-radius: 8px;
  }
  
  .light-theme {
    background-color: #f8f9fa;
    color: #212529;
    border: 1px solid #dee2e6;
  }
  
  .dark-theme {
    background-color: #343a40;
    color: #f8f9fa;
    border: 1px solid #495057;
  }
  
  .accent-theme {
    background-color: #e9ecef;
    color: #495057;
    border-left: 4px solid #4a56e2;
  }
</style>
