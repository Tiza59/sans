# Distributing Sans UI

This guide explains how to distribute the Sans UI library on npm, Bun, and Deno so that others can use the Svelte and Web Components in their projects.

## Table of Contents

- [npm Distribution](#npm-distribution)
- [Bun Distribution](#bun-distribution)
- [Deno Distribution](#deno-distribution)
- [Usage Examples](#usage-examples)

## npm Distribution

### Prerequisites

1. Make sure you have an npm account. If not, create one at [npmjs.com](https://www.npmjs.com/signup).
2. Log in to your npm account in the terminal:
   ```bash
   npm login
   ```

### Building and Publishing

1. Build the package:
   ```bash
   npm run build
   ```
   This will:
   - Compile Svelte components
   - Bundle web components
   - Generate TypeScript definitions
   - Create CommonJS and ESM versions

2. Publish to npm:
   ```bash
   npm publish
   ```
   
   Since we've configured the package with `"access": "public"` in the `publishConfig` section of `package.json`, it will be published as a public package.

### Versioning

To update the package version, use:

```bash
npm version [patch|minor|major]
```

This will automatically update the version in `package.json`.

## Bun Distribution

### Prerequisites

1. Install Bun if you haven't already:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. Log in to your npm account via Bun:
   ```bash
   bun login
   ```

### Building and Publishing

1. Build the package with Bun:
   ```bash
   bun run build
   ```

2. Publish to npm using Bun:
   ```bash
   bun publish
   ```

The `bunfig.toml` file we've created configures Bun-specific settings for building and publishing.

## Deno Distribution

### Prerequisites

1. If you plan to use the Deno package registry, create an account at [deno.land/x](https://deno.land/x).

### Building and Publishing

1. Build the Deno-compatible version:
   ```bash
   npm run deno:build
   ```

2. For GitHub-based distribution (recommended for Deno):
   - Push your repository to GitHub
   - Create a release/tag for each version
   - Users can then import directly from your GitHub repository

3. Alternatively, you can publish to the Deno package registry by following their guidelines at [deno.land/x](https://deno.land/x).

## Usage Examples

### npm/Bun Usage (JavaScript/TypeScript)

#### Installing the Package

```bash
# Using npm
npm install @profullstack/sans-ui

# Using Yarn
yarn add @profullstack/sans-ui

# Using Bun
bun add @profullstack/sans-ui
```

#### Using Svelte Components

```svelte
<script>
  import { Div, P, H1 } from '@profullstack/sans-ui';
  // Or import specific components
  import { Section, Article } from '@profullstack/sans-ui/html5';
</script>

<Div className="container">
  <H1>Hello, Sans UI!</H1>
  <P>This is a paragraph using Sans UI components.</P>
  
  <Section>
    <Article>
      <P>Content inside semantic HTML5 elements.</P>
    </Article>
  </Section>
</Div>
```

#### Using Web Components

```html
<script type="module">
  // Import and register all components
  import { registerAllComponents } from '@profullstack/sans-ui';
  registerAllComponents();
  
  // Or import individual components
  import { DivComponent, PComponent } from '@profullstack/sans-ui/html5';
  
  // Register manually if needed
  if (!customElements.get('sans-div')) {
    customElements.define('sans-div', DivComponent);
  }
</script>

<sans-div style="padding: 20px;">
  <sans-h1>Hello, Sans UI Web Components!</sans-h1>
  <sans-p>This is a paragraph using Sans UI web components.</sans-p>
</sans-div>
```

### Deno Usage

```typescript
// Import from GitHub (replace with your actual repository)
import { Div, P, H1, registerAllComponents } from 'https://raw.githubusercontent.com/profullstack/sans-ui/v1.0.0/deno/mod.ts';

// Or if published to deno.land/x
import { Div, P, H1 } from 'https://deno.land/x/sans_ui@v1.0.0/mod.ts';

// Register web components
registerAllComponents();

// Use in your Deno application
// ...
```

## CDN Usage

Once published to npm, users can also access the library via CDN:

```html
<!-- Using unpkg -->
<script type="module">
  import { registerAllComponents } from 'https://unpkg.com/@profullstack/sans-ui@1.0.0/dist/index.js';
  registerAllComponents();
</script>

<!-- Using jsDelivr -->
<script type="module">
  import { registerAllComponents } from 'https://cdn.jsdelivr.net/npm/@profullstack/sans-ui@1.0.0/dist/index.js';
  registerAllComponents();
</script>
```

## Troubleshooting

- If you encounter issues with Svelte component compilation, make sure you have the latest version of `@sveltejs/package` installed.
- For TypeScript definition issues, verify that your `tsconfig.json` is correctly configured.
- When distributing via Deno, ensure your import paths are correctly pointing to your repository or the Deno registry.
