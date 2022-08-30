import type { SubfontPluginOptions } from "@/plugin-options";
import { subsetFonts } from "@/plugin-common";
import type { Plugin } from "vite";

const PLUGIN_NAME = "vite-plugin-subfont";

export interface SubfontPluginViteOptions extends SubfontPluginOptions {}

/**
 *
 * @param options
 * @returns
 */
export default function subfont(options?: SubfontPluginViteOptions): Plugin {
	let outDir: string;

	return {
		name: PLUGIN_NAME,
		configResolved({ build }) {
			// eslint-disable-next-line prefer-destructuring
			outDir = build.outDir;
		},
		async writeBundle() {
			await subsetFonts({
				outDir,
				...options,
			});
		},
	};
}
