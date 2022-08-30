/* eslint-disable import/no-import-module-exports */
/* eslint-disable unicorn/prefer-module */
import { subsetFonts } from "@/plugin-common";
import type { Compiler } from "webpack";
import type { SubfontPluginOptions } from "@/plugin-options";

const PLUGIN_NAME = "SubfontWebpackPlugin";

interface SubfontPluginWebpackOptions extends SubfontPluginOptions {}

export default class SubfontWebpackPlugin {
	private readonly options: SubfontPluginWebpackOptions | undefined;

	/**
	 * Return a new instance of the plugin with user-set configuration options
	 * @param options
	 */
	constructor(options?: SubfontPluginWebpackOptions) {
		this.options = options;
	}

	apply(compiler: Compiler) {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		compiler.hooks.done.tapAsync(PLUGIN_NAME, async () => {
			await subsetFonts({
				outDir: compiler.options.output.path ?? "dist",
				...this.options,
			});
		});
	}
}

/**
 * Workaround so ES Build allows require() without require().default in consumer
 * See https://github.com/ajv-validator/ajv/issues/1381#issuecomment-798884865
 */
module.exports = SubfontWebpackPlugin;
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
module.exports.default = SubfontWebpackPlugin;
