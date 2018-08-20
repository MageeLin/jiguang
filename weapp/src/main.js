import Vue from 'vue'
import App from './App'
// 全局引入Vuex
import store from './store'
Vue.prototype.$store = store;

// 全局引入flyio
var Fly = require("flyio/dist/npm/wx")
var fly = new Fly
Vue.prototype.$flyio = fly //将fly实例挂在vue原型上



Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main',
      'pages/index/main',
      '^pages/login/main',
      'pages/home/main',
      'pages/content/main',
      'pages/user/main',
      'pages/message/main',
      'pages/content/children/collection/main',
      'pages/content/children/contact/main',
      'pages/content/children/cooperation/main',
      'pages/content/children/footer/main',
      'pages/content/children/member/main',
      'pages/content/children/welcome/main',
      'pages/content/children/article/main',
      'pages/user/children/detail/main',
      'pages/message/children/detail/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#E9C46A',
      navigationBarTitleText: '吉光互联CMS',
      navigationBarTextStyle: 'white',
      backgroundColor: '#E9C46A'

    },
    tabBar: {
      color: "#264653",
      selectedColor: "#E9C46A",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/home/main",
        text: "首页",
        iconPath: "./static/tabbar-icon/house.png",
        selectedIconPath: "./static/tabbar-icon/house-tap.png"
      }, {
        pagePath: "pages/content/main",
        text: "内容",
        iconPath: "./static/tabbar-icon/edit.png",
        selectedIconPath: "./static/tabbar-icon/edit-tap.png"
      }, {
        pagePath: "pages/user/main",
        text: "成员",
        iconPath: "./static/tabbar-icon/avatar.png",
        selectedIconPath: "./static/tabbar-icon/avatar-tap.png"
      }, {
        pagePath: "pages/message/main",
        text: "留言",
        iconPath: "./static/tabbar-icon/chat.png",
        selectedIconPath: "./static/tabbar-icon/chat-tap.png"
      }, ]
    }
  }
}
