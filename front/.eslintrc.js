module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    quotes: [2, 'single'], // 单引号
    semi: [2, 'never'], // 不使用分号
    'space-before-function-paren': [2, 'always'], // 函数前面加上空格
    indent: [2, 2] // 相同的缩进2
    // 'eqeqeq': 2, // 使用全等
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // console在生产模式不生效
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off" // debugger在生产模式不生效
  }
}
