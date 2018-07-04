module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
  },
  "extends": "airbnb",
  "rules": {
    "no-restricted-syntax": "off",
    // 生成环境下删除console
    "no-console": "off",
    // 变量声明后需要空一行
    "newline-after-var": ["error", "always"],
    // 使npm模块在devDependencies里不报错
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true,
      "optionalDependencies": false,
      "peerDependencies": false
    }],
    // 允许在任意位置使用require()
    "global-require": "off",
    // 允许require()第一个参数使用数组而非字符串
    "import/no-dynamic-require": "off",
  },
  "settings": {
    // 关联webpack配置文件，用于引入模块时解析alias
    // 依赖"eslint-import-resolver-webpack": "^0.8.4"
    "import/resolver": {
      "webpack": {
        "config": './build/competitor/webpack.base.conf.js',
      }
    },
  },
};
