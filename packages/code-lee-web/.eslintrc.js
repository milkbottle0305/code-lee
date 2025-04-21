module.exports = {
  root: true,
  extends: [
    "next",
    "next/core-web-vitals",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "prettier",
    "react",
    "react-hooks",
    "import",
    "jsx-a11y",
    "unused-imports",
  ],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-unresolved": "error",
    "jsx-a11y/anchor-is-valid": "warn",
    "unused-imports/no-unused-imports": "error",
  },
};
