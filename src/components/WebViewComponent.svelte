<script>
  import { onMount } from 'svelte';
  import { createWebView } from '../lib/webview/WebViewAdapter';
  import Button from './Button.svelte';

  export let url = 'https://example.com';
  export let height = '500px';
  export let width = '100%';
  
  let webviewContainer;
  let webviewAdapter;
  let currentUrl = url;

  function navigateTo(newUrl) {
    if (webviewAdapter) {
      currentUrl = newUrl;
      webviewAdapter.navigate(newUrl);
    }
  }

  function reload() {
    if (webviewAdapter) {
      webviewAdapter.reload();
    }
  }

  onMount(() => {
    webviewAdapter = createWebView(url);
    webviewAdapter.initialize(webviewContainer);
    
    return () => {
      if (webviewAdapter) {
        webviewAdapter.destroy();
      }
    };
  });
</script>

<div class="webview-component">
  <div class="controls">
    <Button type="secondary" size="small" onClick={() => navigateTo(currentUrl)}>Refresh</Button>
    <Button type="secondary" size="small" onClick={() => navigateTo('https://example.com')}>Home</Button>
    <div class="url-display">{currentUrl}</div>
  </div>
  
  <div class="webview-container" bind:this={webviewContainer} style="height: {height}; width: {width};"></div>
</div>

<style>
  .webview-component {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .controls {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }
  
  .url-display {
    margin-left: 12px;
    font-size: 14px;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }
  
  .webview-container {
    width: 100%;
    height: 500px;
    overflow: hidden;
  }
</style>