/**
 * @type {import("eslint").Linter.BaseConfig}
 */
module.exports = {
	plugins: ["sonarjs"],
	extends: ["plugin:sonarjs/recommended"],
	rules: {
		complexity: ["error", { max: 10 }],
		"sonarjs/no-inverted-boolean-check": ["error"],
	},
};
