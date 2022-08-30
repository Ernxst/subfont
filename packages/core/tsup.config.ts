import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		"astro/index": "src/frameworks/astro.ts",
		"esbuild/index": "src/frameworks/esbuild.ts",
		"rollup/index": "src/frameworks/rollup.ts",
		"webpack/index": "src/frameworks/webpack.ts",
		"vite/index": "src/frameworks/vite.ts",
	},
	format: ["esm", "cjs"],
	splitting: true,
	sourcemap: true,
	dts: true,
	treeshake: true,
	banner({ format }) {
		return {
			js:
				format === "esm"
					? `import { createRequire } from 'module';const require = createRequire(process.cwd());`
					: "",
		};
	},
});
