<script>
  import WebViewComponent from './components/WebViewComponent.svelte';
  import Button from './components/Button.svelte';
  
  let currentUrl = 'https://example.com';
  
  function changeUrl(newUrl) {
    currentUrl = newUrl;
  }
</script>

<main>
  <h1>Svelte 4 WebView with Platform Abstraction</h1>
  
  <div class="demo-controls">
    <Button onClick={() => changeUrl('https://svelte.dev')}>Svelte</Button>
    <Button type="secondary" onClick={() => changeUrl('https://github.com')}>GitHub</Button>
    <Button type="danger" onClick={() => changeUrl('https://example.com')}>Reset</Button>
  </div>
  
  <div class="webview-wrapper">
    <WebViewComponent url={currentUrl} height="600px" />
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h1 {
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .demo-controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .webview-wrapper {
    margin-top: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
</style>