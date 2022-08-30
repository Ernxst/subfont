import fs from "node:fs";
import { globby } from "globby";
import path from "node:path";
import type { FontFormat } from "@/plugin-options";

export const TMP_DIR_NAME = "subset-tmp";
// glyphhanger adds this to filenames when creating a copy
const GLYPHHANGER_SUFFIX = "-subset";

/**
 * Replace the font files in the build directory with the
 * subset versions in the temporary directory
 *
 * @param originalFiles
 * @param format
 * @param log
 */
export async function replaceFontFiles(
	originalFiles: string[],
	format: FontFormat,
	log: boolean
) {
	const processedFonts = await globby(`${TMP_DIR_NAME}/**/*.${format}`);

	for (const tempPath of processedFonts) {
		const relativePath = resolveFontPath(tempPath);
		const originalPath = guessOriginalFilePath(originalFiles, relativePath);

		if (originalPath) {
			if (log && fs.existsSync(originalPath)) {
				void logSizeSaving(tempPath, originalPath);
			}

			await fs.promises.cp(tempPath, originalPath);
		}
	}
}

function resolveFontPath(tempPath: string) {
	const { base } = path.parse(tempPath);
	return base.replace(GLYPHHANGER_SUFFIX, "").replace(TMP_DIR_NAME, "");
}

function guessOriginalFilePath(filePaths: string[], search: string) {
	return filePaths.find((s) => s.endsWith(search));
}

async function logSizeSaving(newFile: string, originalFile: string) {
	const sizeBefore = await getFileSize(originalFile);
	const sizeAfter = await getFileSize(newFile);
	const savings = Math.abs(sizeBefore - sizeAfter);
	const percentageDiff = (100 * savings) / ((sizeBefore + sizeAfter) / 2);

	console.log(
		`- Reduced "${originalFile.replace(process.cwd(), "")}" by ${round(
			savings
		)}kb (${round(percentageDiff)}%)!\n    - (before: ${round(
			sizeBefore
		)}kb -> after: ${round(sizeAfter)}kb)`
	);
}

async function getFileSize(filename: string) {
	// Size in bytes
	const { size } = await fs.promises.stat(filename);
	// Convert to KB
	return size / 1024;
}

function round(num: number) {
	return Math.round((num + Number.EPSILON) * 100) / 100;
}
