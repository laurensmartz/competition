# competition_manage_platform
中锐竞赛管理平台

# 名称解释
scorekeeper：统分员
competitor：选手
judge：裁判
jury：评委

# 文件作用

build/：存放webpack配置文件。
lib/：存放非模块化的插件库。
src/：存放项目的源文件。
.babelrc：babel配置文件。
.eslintignore：eslint忽略的文件。
.eslintrc.js：eslint配置文件。
.gitignore：git忽略的文件。
.stylelintrc.js：stylelint配置文件。
postcss.config.js：postcss配置文件。

# 目录结构

build/下有四个文件夹（scorekeeper、competitor、judge、jury），分别对应四个端的webpack配置文件。

src/：
component：组件目录。
css：css目录。
entry：入口文件。
images：图片目录。
js：js目录。
router：路由配置。
template：index.html模板目录。
view：页面。

# 环境安装

安装环境：在当前目录下运行npm install，安装npm包依赖。

# 项目运行

scorekeeper-dev：本地运行管理平台。
scorekeeper-build：将管理平台打包输出到dist/admin目录。

competitor-dev：本地运行选手端。
competitor-build：将选手端打包输出到dist/competitor目录。

例如：npm run scorekeeper-dev：启动项目并在本地webpack-server-dev上运行。

裁判端和评委端类似，不再赘述，详情可参看package.json文件。

# 发送ajax请求

ajax请求发送文件（公用）：src/js/common/ajax.js
接口配置文件：src/js/端目录/config/api_config.js
服务器配置文件：src/js/端目录/config/server_config.js
请求配置文件：src/js/端目录/request.js

在request.js文件里配置好请求的选项：
{
  url: <String>,  // 必填
  baseURL: <String>,  // 必填
  method: 'post' // 默认,
  responseType: 'json'  // 默认,
}

在request.js文件里封装好每个请求，在view页面直接调用，调用时传递请求参数，格式：
{
  [//] <发送请求时的data参数>
  data: {
    ...
  },
  [//] <发送请求时的params参数>
  params: {
    ...
  },
  [//] <请求成功的回调函数>
  successFun: (responseData) {
    ...
  },
  [//] <请求成功的回调函数>
  errorFun: (error) {
    ...
  }
}

# 组件
common/目录下：
countdown：倒计时 [props: timestamp, color]
  timestamp: 传入截止日期的时间戳（毫秒）。
  color: 传入想要显示的颜色（16进制值或者css标准色值）。

  例如：
  <countdown timestamp="1531186363000" color="red"></countdown>


login_form：登录面板 [event: @login]
  @login: 在父组件上监听此方法（将account、password传入父组件）
  例如：
  <login-form @login="login(account, password)"></login-form>

  methods: {
    login(account, password) {
      console.log(account)
      console.log(password);
    }
  },






