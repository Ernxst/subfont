import type { FontFormat, SubfontPluginOptions } from "@/plugin-options";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { globby } from "globby";
import { replaceFontFiles, TMP_DIR_NAME } from "@/file";

const ALL_FONT_FORMATS: FontFormat[] = ["ttf", "woff", "woff2"];

interface SubsetFontOptions extends SubfontPluginOptions {
	/**
	 * Directory containing build artifacts
	 */
	outDir: string;
}

/**
 * Common function to all frameworks to subset all the fonts in the
 * given output directory
 *
 * @param options
 */
export async function subsetFonts(options: SubsetFontOptions) {
	// Create temporary working directory to generate font subsets to
	if (!fs.existsSync(TMP_DIR_NAME)) {
		await fs.promises.mkdir(TMP_DIR_NAME);
	}

	const { outDir, log = true } = options;
	const filesGlob = `${outDir}/**/*.html`;

	// Run in parallel
	await Promise.all(
		ALL_FONT_FORMATS.map(async (format) => {
			const fontsGlob = `${outDir}/**/*.${format}`;
			callGlyphhanger(filesGlob, fontsGlob, [format]);

			const originalFontFiles = await globby(fontsGlob, { absolute: false });
			await replaceFontFiles(originalFontFiles, format, log);
		})
	);

	/**
	 * Cleanup our temporary working directory
	 */
	if (fs.existsSync(TMP_DIR_NAME)) {
		await fs.promises.rm(TMP_DIR_NAME, { force: true, recursive: true });
	}
}

/**
 * Call glyphhanger CLI to build subsetted font files
 * @param filesGlob
 * @param fontsGlob
 * @param fontFormats
 */
function callGlyphhanger(
	filesGlob: string,
	fontsGlob: string,
	fontFormats: FontFormat[]
) {
	spawnSync(
		"glyphhanger",
		[
			filesGlob,
			`--subset=${fontsGlob}`,
			`--formats=${fontFormats.join(",")}`,
			// Write subset fonts to our temporary directory
			`--output`,
			TMP_DIR_NAME,
			// Use jsdom instead of puppeteer to increase build speed
			"--jsdom",
			// See https://github.com/zachleat/glyphhanger/issues/2#issuecomment-848026779
			"--whitelist=U+00A0",
		],
		{
			shell: true,
		}
	);
}
