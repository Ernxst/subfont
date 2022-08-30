/**
 * @param {string} type
 */
function load(type) {
	return `./../../packages/eslint/.eslintrc.${type}.cjs`;
}

const path = require("path");
const projectRoot = path.resolve(__dirname, "..", "..");

/**
 * @type {import("eslint").Linter.BaseConfig}
 */
module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true,
		node: true,
		worker: true,
		serviceworker: true,
	},
	plugins: ["prettier"],
	extends: [
		"eslint:recommended",
		load("airbnb"),
		load("sonar"),
		load("unicorn"),
		load("ts"),
		"plugin:import/recommended",
		"plugin:import/typescript",
		"prettier",
	],
	ignorePatterns: [
		"**/.turbo",
		"**/node_modules",
		"**/coverage",
		"**/dist",
		"**/build",
		"**/public",
		"**/*.cjs",
		"**/*.config.js",
		"**/*.config.ts",
		"**/*.config.cjs",
		"**/*.config.mjs",
	],
	rules: {
		// eslint
		"no-console": "off",
		"prefer-destructuring": ["error", { object: true, array: false }],
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
		"no-shadow": "error",
		// eslint-plugin-import
		"import/export": "off",
		"import/no-cycle": "off",
		"import/prefer-default-export": "off",
		"import/no-extraneous-dependencies": "off",
		"import/no-unresolved": "off",
		"import/order": "off",
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never",
			},
		],
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
				project: [
					`${projectRoot}/*/tsconfig.json`,
					`${projectRoot}/examples/*/tsconfig.json`,
					`${projectRoot}/apps/*/tsconfig.json`,
					`${projectRoot}/packages/*/tsconfig.json`,
				],
			},
			node: {
				project: [
					`${projectRoot}/*/tsconfig.json`,
					`${projectRoot}/examples/*/tsconfig.json`,
					`${projectRoot}/apps/*/tsconfig.json`,
					`${projectRoot}/packages/*/tsconfig.json`,
				],
			},
		},
	},
};
