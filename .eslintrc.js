module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: "babel-eslint",
	},
	extends: [
		//"eslint:recommended",
		//"plugin:vue/recommended",
		"plugin:vue/essential",
		"plugin:prettier/recommended",
	],
	// required to lint *.vue files
	plugins: ["vue", "progress"],
	// add your custom rules here
	rules: {
		semi: [2, "never"],
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"vue/max-attributes-per-line": "off",
		"prettier/prettier": ["error", { semi: false }],
		"progress/activate": 1,
	},
}
