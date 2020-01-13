module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: [
    'google',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'nuxt/no-cjs-in-config': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'camel-case': 'off',
  }
}
