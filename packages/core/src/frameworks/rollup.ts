import type { SubfontPluginOptions } from "@/plugin-options";
import { subsetFonts } from "@/plugin-common";
import type { Plugin } from "rollup";

const PLUGIN_NAME = "esbuild-plugin-subfont";

export interface SubfontPluginRollupOptions extends SubfontPluginOptions {}

/**
 *
 * @param options
 * @returns
 */
export default function subfont(options?: SubfontPluginRollupOptions): Plugin {
	return {
		name: PLUGIN_NAME,
		async writeBundle(config) {
			await subsetFonts({
				outDir: config.dir ?? "dist",
				...options,
			});
		},
	};
}
