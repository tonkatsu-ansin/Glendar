module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
	"globals": {
		"ga":false
	},
    "extends": "eslint:recommended",
    "rules": {
        "indent": [2, 2],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off",
        "no-constant-condition": [
          "error", { "checkLoops": false }
        ],
        "no-var": "error"
    },
    "plugins": [
        "vue"
    ],
};
