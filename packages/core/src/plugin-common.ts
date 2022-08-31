import type { FontFormat, SubfontPluginOptions } from "@/plugin-options";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { globby } from "globby";
import { replaceFontFiles, TMP_DIR_NAME, toRelativePath } from "@/file";
import path from "node:path";

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
	const { outDir, log = true } = options;

	// Create temporary working directory to generate font subsets to
	if (!fs.existsSync(TMP_DIR_NAME)) {
		if (log) console.log("\n- Preparing to subset fonts");
		await fs.promises.mkdir(TMP_DIR_NAME);
	}

	const filesGlob = path.join(outDir, "**", "*.html");

	if (log)
		console.log(
			`\n- Will start at ${toRelativePath(
				filesGlob
			)} and crawl pages that it links to`
		);

	// Run in parallel
	await Promise.all(
		ALL_FONT_FORMATS.map(async (format) => {
			const fontsGlob = path.join(outDir, "**", `*.${format}`);

			if (log)
				console.log(
					`\n- Analysing all font files matching ${toRelativePath(fontsGlob)}`
				);

			callGlyphhanger(filesGlob, fontsGlob, [format]);

			if (log) console.log(`\n- Built subsets of all .${format} files`);

			const originalFontFiles = await globby(fontsGlob);

			if (log) {
				const files = originalFontFiles
					.map((s) => toRelativePath(s))
					.join(",\n  ");
				console.log(`\n- Replacing font files: [\n  ${files}\n]`);
			}

			await replaceFontFiles(originalFontFiles, format, log);

			console.log(
				`\n- Optimised all fonts matching ${toRelativePath(fontsGlob)}`
			);
		})
	);

	/**
	 * Cleanup our temporary working directory
	 */
	if (fs.existsSync(TMP_DIR_NAME)) {
		if (log) console.log("\n- Cleaning up");
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
			// Show used characters as strings rather than utf codes
			"--string",
			// Maximum number of URLs gathered from the spider (0 to ignore)
			"spider-limit=0",
			// Do not spend more than 30s navigating a single URL
			"--timeout=30",
		],
		{ shell: true, stdio: "inherit" }
	);
}
