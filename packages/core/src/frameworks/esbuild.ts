import type { SubfontPluginOptions } from "@/plugin-options";
import { subsetFonts } from "@/plugin-common";
import type { Plugin } from "esbuild";

const PLUGIN_NAME = "esbuild-plugin-subfont";

export interface SubfontPluginESBuildOptions extends SubfontPluginOptions {}

/**
 *
 * @param options
 * @returns
 */
export default function subfont(options?: SubfontPluginESBuildOptions): Plugin {
	return {
		name: PLUGIN_NAME,
		setup({ onEnd, initialOptions }) {
			onEnd(async () => {
				await subsetFonts({
					outDir: initialOptions.outdir ?? "dist",
					...options,
				});
			});
		},
	};
}
