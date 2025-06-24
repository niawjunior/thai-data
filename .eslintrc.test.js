module.exports = {
  root: true, // important: disable all inherited config
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: null, // no type-checking
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: [], // <-- disables all ignore rules
};
