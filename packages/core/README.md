# 🚀 Font Subsetter

A plugin (likely compatible with your build tool) allowing you to remove unused glyphs from your output font files to improve page-load and time-to-first-byte.

Uses [`glyphhanger`](https://github.com/zachleat/glyphhanger) under the hood but with the added functionality of overwriting the build output fonts, rather than creating new ones (and having to create links to/stylesheets for them).

## Installation

[`glyphhanger`](https://github.com/zachleat/glyphhanger) is also required as a peer dependency:

```bash
npm i --save-dev @ernxst/subfont glyphhanger

```

```bash
yarn add -D @ernxst/subfont glyphhanger
```

```bash
pnpm i -D @ernxst/subfont glyphhanger
```

## Usage

Note that this integration only works for static builds, it does nothing (rather than erroring) when SSR is enabled.

You may get unexpected results when using this plugin with dynamically generated content.

### Astro

 ```js
import { defineConfig } from "astro/config";
import subfont from "@ernxst/subfont/astro";

export default defineConfig({
  integrations: [subfont()],
})
```

### Vite

 ```js
import { defineConfig } from "vite";
import subfont from "@ernxst/subfont/vite";

export default defineConfig({
  plugins: [subfont()],
})
```

### Rollup

 ```js
import { defineConfig } from "rollup";
import subfont from "@ernxst/subfont/rollup";

export default defineConfig({
  plugins: [subfont()],
})
```

### esbuild

 ```js
import esbuild from "esbuild";
import subfont from "@ernxst/subfont/esbuild";

esbuild.build({
  plugins: [subfont()],
}).catch(() => process.exit(1));
```

### Webpack

In CommonJS form:

```js
const SubfontWebpackPlugin = require("@ernxst/subfont/webpack");

module.exports = {
  plugins: [new SubfontWebpackPlugin()],
}
```

## Configuration

- `log` - Whether to log to stdout.
  - default: `true`

## Contributing

To get started with development, you will need an editor (VS Code is recommended), a browser that runs JavaScript and some extra prerequisites:

- [Node.js (>= 16)](https://nodejs.org)
- [pnpm 7.5.2](https://pnpm.io/installation#using-corepack)

To get started with contributing to this project, first fork this git repository:

```sh
git clone https://github.com/Ernxst/subfont.git
```

Then, install dependencies and start coding.

### Submitting Improvements

If you have a suggestion that would make this app better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "`enhancement`".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
