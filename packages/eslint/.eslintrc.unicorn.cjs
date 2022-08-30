const unicornNoAbbreviate = {};
const keys = [
	"e",
	"fn",
	"cb",
	"curr",
	"prev",
	"doc",
	"num",
	"dist",
	"evt",
	"dest",
	"prod",
	"dev",
	"arr",
	"src",
	"ref",
	"config",
	"prop",
	"el",
	"temp",
	"env",
	"ext",
	"ctx",
	"idx",
	"val",
	"msg",
	"func",
	"opt",
	"str",
	"db",
	"param",
	"obj",
	"err",
	"req",
	"res",
	"pkg",
	"arg",
	"dir",
	"lib",
];

for (const key of keys) {
	const upper = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
	unicornNoAbbreviate[key] = false;
	unicornNoAbbreviate[upper] = false;
	if (!key.endsWith("s") && key.length > 1) {
		unicornNoAbbreviate[`${key}s`] = false;
		unicornNoAbbreviate[`${upper}s`] = false;
	}
}

/**
 * @type {import("eslint").Linter.BaseConfig}
 */
module.exports = {
	extends: ["plugin:unicorn/all"],
	rules: {
		"unicorn/no-keyword-prefix": "off",
		"unicorn/filename-case": "off",
		"unicorn/no-null": ["off", {}],
		"unicorn/no-unused-properties": ["off", {}],
		"unicorn/custom-error-definition": [0],
		"unicorn/prefer-reflect-apply": ["off", {}],
		"unicorn/prefer-top-level-await": ["off", {}],
		"unicorn/prevent-abbreviations": [
			"error",
			{
				replacements: unicornNoAbbreviate,
			},
		],
		"unicorn/catch-error-name": [
			"error",
			{
				ignore: ["^error\\d*$", "^err", /^ignore/i],
			},
		],
	},
};
