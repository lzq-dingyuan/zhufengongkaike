import babel from 'rollup-plugin-babel'
export default {
  input: './index.js',
  output: {
    file: '../website/client/bundle.js',
    format: 'umd', //  统一模块化
  },
  watch: {
    exclude: "node_modules/**",
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [
        "@babel/preset-env"  // 将es6转为es5的包
      ]
    })
  ]
}