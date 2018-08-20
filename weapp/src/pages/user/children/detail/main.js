import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '用户具体信息',
    // navigationBarTextStyle: 'white',
    // enablePullDownRefresh: true,
    // backgroundTextStyle: 'light'
  }
}