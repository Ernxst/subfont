import { defineConfig } from "vitest/config";
import paths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		// https://github.com/aleclarson/vite-tsconfig-paths
		paths(),
	],

	// https://github.com/vitest-dev/vitest
	test: {
		watch: false,
		passWithNoTests: true,
		outputTruncateLength: 120,
		outputDiffLines: 24,
		coverage: {
			enabled: true,
			all: true,
			reporter: ["html", "text-summary", "json"],
			include: ["src/**/*"],
			exclude: [
				"src/**/__tests__",
				"src/**/__test__",
				"src/@types/**/*.ts",
				"src/**/@types/**/*.ts",
			],
		},
	},
});
