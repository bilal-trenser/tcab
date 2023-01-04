module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  "rules": {
    "react/react-in-jsx-scope": "off",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal"],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "airbnb",
    'airbnb-base',
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
};
