import type { SubfontPluginOptions } from "@/plugin-options";
import { subsetFonts } from "@/plugin-common";
import type { AstroIntegration } from "astro";

const PLUGIN_NAME = "astro-plugin-subfont";

export interface AstroSubfontIntegrationOptions extends SubfontPluginOptions {}

/**
 * An Astro integration wrapped around
 * [`glyphhanger`](https://github.com/zachleat/glyphhanger) to generate font
 * subsets to reduce bundle size.
 *
 * ### Why?
 * `glyphhanger` works great, however, it has no ability to overwrite the font
 * files it encounters and writes to new ones instead. This makes it quite
 * unhelpful when using frameworks
 *
 * @param options
 * @returns
 */
export default function subfont(
	options?: AstroSubfontIntegrationOptions
): AstroIntegration {
	return {
		name: PLUGIN_NAME,
		hooks: {
			"astro:build:done": async ({ dir }) => {
				await subsetFonts({ outDir: dir.pathname, ...options });
			},
		},
	};
}
