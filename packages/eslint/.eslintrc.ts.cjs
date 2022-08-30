const path = require("path");
const projectRoot = path.resolve(__dirname, "..", "..");
const configPath = `${projectRoot}/packages/tsconfig`;

/**
 * @type {import("eslint").Linter.BaseConfig}
 */
module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
		tsconfigRootDir: configPath,
		project: [
			`${configPath}/tsconfig.base.json`,
			`${configPath}/tsconfig.eslint.json`,
		],
	},
	plugins: ["@typescript-eslint", "unused-imports"],
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:@typescript-eslint/strict",
	],
	rules: {
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{
				vars: "all",
				varsIgnorePattern: "^_",
				args: "after-used",
				argsIgnorePattern: "^_",
			},
		],
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			extends: [
				"plugin:@typescript-eslint/eslint-recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"prettier",
			],
			rules: {
				"@typescript-eslint/consistent-type-imports": ["error"],
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/no-empty-function": "off",
				"@typescript-eslint/no-floating-promises": "error",
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-empty-interface": "off",
				"no-unused-vars": "off",
			},
		},
	],
};
