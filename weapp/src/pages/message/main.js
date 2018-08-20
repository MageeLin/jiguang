import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '团队留言板',
    // navigationBarTextStyle: 'white',
    // enablePullDownRefresh: true,
    // backgroundTextStyle: 'light',
    'onReachBottomDistance': 50
  }
}