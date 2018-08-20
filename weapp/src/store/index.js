// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
// 统一管理状态
import Vue from 'vue'
import Vuex from 'vuex'
// 引入flyio 不必挂载了
var Fly = require("flyio/dist/npm/wx");
var flyio = new Fly;

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: '',
    homepageInfo: '',
    footerInfo: ''
  },
  mutations: {
    syncUserInfo(state, userInfo) {
      // 登录时同步用户信息
      state.userInfo = userInfo;
    },
    syncHomepageInfo(state, homepageInfo) {
      // 同步主页信息
      state.homepageInfo = homepageInfo;
    },
    syncFooterInfo(state, footerInfo) {
      // 同步页脚信息
      state.footerInfo = footerInfo;
    }
  },
  actions: {
    getHomepageInfo(store) {
      // 异步获取主页信息
      flyio.post("http://127.0.0.1:3000/homepages/weapp/get", {})
        .then(response => {
          let res = response.data;
          if (res.status == "1") {
            wx.showToast({
              title: res.msg,
              icon: "none"
            });
          } else {
            store.commit("syncHomepageInfo", res.result);
            console.log("成功");
          }
        })
        .catch(error => {
          console.log(error.status, error.message);
        });
    },
    getFooterInfo(store) {
      // 异步获取主页信息
      flyio.post("http://127.0.0.1:3000/footers/weapp/get", {})
        .then(response => {
          let res = response.data;
          if (res.status == "1") {
            wx.showToast({
              title: res.msg,
              icon: "none"
            });
          } else {
            store.commit("syncFooterInfo", res.result);
            console.log("成功");
          }
        })
        .catch(error => {
          console.log(error.status, error.message);
        });
    },
  }
})

export default store
