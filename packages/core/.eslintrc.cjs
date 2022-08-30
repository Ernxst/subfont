/**
 * @type {import("eslint").Linter.BaseConfig}
 */
module.exports = {
	extends: [require.resolve("@ernxst/eslint/eslintrc.cjs")],
	overrides: [
		{
			files: ["*.ts"],
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: ["./tsconfig.json"],
			},
		},
	],
};
