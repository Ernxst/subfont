/**
 * @type {import("eslint").Linter.BaseConfig}
 */
module.exports = {
	extends: ["airbnb-base", "airbnb-base/legacy"],
	rules: {
		"no-restricted-syntax": 0,
		"no-use-before-define": 0,
		"no-underscore-dangle": 0,
		"no-param-reassign": 0,
		"default-case": 0,
		"consistent-return": 0,
		"max-classes-per-file": 0,
		"no-loop-func": 0,
		"no-await-in-loop": 0,
		"no-void": 0,
	},
};
