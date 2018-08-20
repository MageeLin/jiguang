import Vue from 'vue'
import Vuex from 'vuex'
// 引入axios
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeMenu: 'welcome',
    userInfo: ''
  },
  mutations: {
    changeActiveMenu(state, str) {
      // 改变activeMenu的class状态
      state.activeMenu = str;
    },
    syncUserInfo(state, info) {
      // 同步个人信息数据到state
      state.userInfo = info;
    },
    logOut(state) {
      // 把个人信息变为空，并清理cookies
      state.userInfo = '';
      document.cookie = 'id=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
  },
  actions: {
    getUserInfoByLogin(store, params) {
      // 异步获取个人信息数据
      // 利用params将vue对象传到了此函数中，以便隐藏modal
      axios.post('/api/users/getbylogin', {
        email: params.email,
        password: params.password
      }).then((response) => {
        let res = response.data;
        if (res.status == '1') {
          console.log('数据库出错');
        } else {
          store.commit('syncUserInfo', res.result);
        }
      }).then(response => {
        if (!store.state.userInfo) {
          alert('邮箱或密码错误!');
        } else {
          // 关键性一步
          params._this.$refs.modal.hide();
        }
      }).catch((error) => {
        console.log('连接出错：' + error);
      });
    },
    getUserInfoByCookie(store) {
      // 异步获取个人信息数据
      axios.post('/api/users/getbycookie').then((response) => {
        let res = response.data;
        if (res.status == '1') {
          console.log('数据库出错');
        } else {
          store.commit('syncUserInfo', res.result);
        }
      }).catch((error) => {
        console.log('连接出错：' + error);
      });
    },
    logOut(store) {
      store.commit('logOut');
    }
  }
})
