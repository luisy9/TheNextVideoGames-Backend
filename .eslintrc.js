module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: ['standard', 'n/handle-callback-err'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-unused-vars': 'warn'
  }
}
