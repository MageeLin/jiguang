<template>
  <b-navbar toggleable="md" fixed="top" toggle-breakpoint="md">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand tag="h1" to="/#">{{title}}</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav fill>
        <b-nav-item :class="{active:activeMenu == 'welcome'}" @click="scrollTo('welcome')">首页</b-nav-item>
        <b-nav-item :class="{active:activeMenu == 'collection'}" @click="scrollTo('collection')">作品集</b-nav-item>
        <b-nav-item :class="{active:activeMenu == 'member'}" @click="scrollTo('member')">成员</b-nav-item>
        <b-nav-item :class="{active:activeMenu == 'contact'}" @click="scrollTo('contact')">加入我们</b-nav-item>
        <b-nav-item :class="{active:activeMenu == 'cooperation'}" @click="scrollTo('cooperation')">社团合作</b-nav-item>
        <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" fill>

        <b-nav-item v-if="!userInfo" v-b-modal.modal-login right>登录</b-nav-item>
        <b-nav-item v-if="!userInfo" v-b-modal.modal-reg right>注册</b-nav-item>

        <b-nav-item-dropdown v-if="userInfo" right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <!-- <em >昵称XXX</em> -->
            <!-- <b-badge variant="light">4</b-badge> -->
            <em>{{userInfo.name}}</em>
            <b-badge variant="light">{{userInfo.promptNumber}}</b-badge>
          </template>
          <b-dropdown-item :class="{active:activeMenu == 'information'}" to="/information">个人信息</b-dropdown-item>
          <b-dropdown-item :class="{active:activeMenu == 'conte'}" to="/messageboard">团队留言板</b-dropdown-item>
          <!-- <b-dropdown-item role="separator" class="divider"></b-dropdown-item> -->
          <b-dropdown-item @click="logOut">退出</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
    <b-modal ref="modal" @ok="handleOk" id="modal-login" title="登录" cancel-title="取消" ok-title="登录" cancel-variant="primary"
      centered>
      <b-form>
        <b-form-group horizontal label="邮箱：" label-for="modal-login-email" label-class="text-md-right">
          <b-form-input v-model="loginInfo.email" id="modal-login-email" type="email"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="密码：" label-for="modal-login-password" label-class="text-md-right">
          <b-form-input v-model="loginInfo.password" id="modal-login-password" type="password"></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
    <b-modal ref="modal1" id="modal-reg" @ok="regHandleOk" title="注册" cancel-title="取消" ok-title="注册" cancel-variant="primary"
      centered>
      <b-form>
        <b-form-group horizontal label="姓名：" label-for="modal-reg-name" label-class="text-md-right">
          <b-form-input v-model="reg.name" id="modal-reg-name" type="text"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="昵称：" label-for="modal-reg-nickname" label-class="text-md-right">
          <b-form-input v-model="reg.nickname" id="modal-reg-nickname" type="text"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="邮箱：" label-for="modal-reg-email" label-class="text-md-right">
          <b-form-input v-model="reg.email" id="modal-reg-email" type="email"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="密码：" label-for="modal-reg-password" label-class="text-md-right">
          <b-form-input v-model="reg.password" id="modal-reg-password" type="password"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="手机号：" label-for="modal-reg-phone" label-class="text-md-right">
          <b-form-input v-model="reg.phone" id="modal-reg-phone" type="number"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="学院：" label-for="modal-reg-institute" label-class="text-md-right">
          <b-form-input v-model="reg.institute" id="modal-reg-institute" type="text"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="部门：" label-for="modal-reg-department" label-class="text-md-right">
          <b-form-select v-model="reg.department" id="modal-reg-department" :options="regDepartmentOpition"></b-form-select>
        </b-form-group>
        <b-form-group horizontal label="入学时间：" label-for="modal-reg-enterSchool" label-class="text-md-right">
          <b-form-input v-model="reg.enterSchool" id="modal-reg-enterSchool" type="month"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="毕业时间：" label-for="modal-reg-leaveSchool" label-class="text-md-right">
          <b-form-input v-model="reg.leaveSchool" id="modal-reg-leaveSchool" type="month"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="专业：" label-for="modal-reg-major" label-class="text-md-right">
          <b-form-input v-model="reg.major" id="modal-reg-major" type="text"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="头像：" label-for="modal-reg-avatar" label-class="text-md-right">
          <b-form-select v-model="reg.avatar" id="modal-reg-avatar" :options="regAvatarOpition"></b-form-select>
        </b-form-group>
        <b-form-group horizontal label="邀请码：" label-for="modal-reg-code" label-class="text-md-right">
          <b-form-input v-model="reg.code" id="modal-reg-code" type="text"></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </b-navbar>

  <!-- navbar-1.vue -->
</template>
<script>
  import scrollWatch from "vue-scrollwatch"
  export default {
    name: 'NavHead',
    data() {
      return {
        title: '吉光互联',
        regDepartmentOpition: [{
            value: null,
            text: '请选择部门',
            disabled: true
          },
          {
            value: 'jsb',
            text: '技术部'
          },
          {
            value: 'sjb',
            text: '设计部'
          },
          {
            value: 'yxb',
            text: '营销部'
          },
          {
            value: 'qt',
            text: '其他'
          },

        ],
        regAvatarOpition: [{
            value: null,
            text: "请选择头像",
            disabled: true
          },
          {
            value: "0",
            text: "兔子"
          },
          {
            value: "1",
            text: "老虎"
          },
          {
            value: "2",
            text: "驴子"
          },
          {
            value: "3",
            text: "浣熊"
          },
          {
            value: "4",
            text: "狐狸"
          },
          {
            value: "5",
            text: "绵羊"
          },
          {
            value: "6",
            text: "猪猪"
          },
          {
            value: "7",
            text: "熊猫"
          },
          {
            value: "8",
            text: "灰狼"
          },
          {
            value: "9",
            text: "猴子"
          },
          {
            value: "10",
            text: "青蛙"
          },
          {
            value: "11",
            text: "企鹅"
          },
          {
            value: "12",
            text: "狗子"
          },
          {
            value: "13",
            text: "喵喵"
          },
          {
            value: "14",
            text: "河马"
          },
          {
            value: "15",
            text: "考拉"
          }
        ],
        reg: {
          name: '',
          nickname: '',
          email: '',
          password: '',
          phone: '',
          institute: '',
          department: null,
          enterSchool: '',
          leaveSchool: '',
          major: '',
          avatar: null,
          code: '',
        },
        loginInfo: {
          email: '',
          password: ''
        }
      }
    },
    computed: {
      activeMenu() {
        // 用于滚动监听
        return this.$store.state.activeMenu;
      },
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    methods: {
      scrollTo(name) {
        // 用于滚动监听
        this.$router.push('/#' + name);
        scrollWatch.scrollTo(name)
      },
      handleOk(event) {
        event.preventDefault()
        // 这一步是在写登录的时候需要修改的地方
        this.$store.dispatch('getUserInfoByLogin', {
          // email: '736770223@qq.com',
          // password: '123456',
          email: this.loginInfo.email,
          password: this.loginInfo.password,
          // 把this对象传给vuex的此函数中
          _this: this
        });
      },
      logOut() {
        this.$store.dispatch('logOut');
      },
      regHandleOk(event) {
        event.preventDefault()
        this.$axios.post('/api/users/reg', this.reg).then(response => {
          let res = response.data;
          if (res.status == '1') {
            alert(res.msg);
          } else {
            alert('注册成功');
            this.$refs.modal1.hide();
          }
        }).catch((error) => {
          console.log('连接出错：' + error);
        });
      }
    },
    mounted() {


      //这一步是用cookie来登录 
      if (document.cookie) {
        this.$store.dispatch('getUserInfoByCookie');
      }

    }
  }

</script>
<style lang="less" scoped>
  /* 导航栏样式 */

  .navbar {
    background-color: #FFF;
    border: none;
    box-shadow: 0 8px 6px #66CCCC;
    padding-top: 0;
    padding-bottom: 0;
  }

  /* 限制导航栏高度 */

  @media screen and (max-width: 768px) {
    /*当屏幕尺寸小于768px时，应用下面的CSS样式*/
    .navbar .navbar-collapse {
      overflow-y: auto;
      max-height: 300px;
    }
  }

  /* 商标样式 */

  .navbar .navbar-brand {
    color: #66CCCC;
    font-size: 30px;
    font-weight: bold;
    height: 70px;
    line-height: 60px;
  }

  /* 商标样式 */

  .navbar .nav-link,
  .navbar .nav-link em {
    font-size: 15px;
    font-weight: bold;
    height: 70px;
    line-height: 50px;
    box-shadow: 0 1px 0px #66CCCC;
    text-decoration: none !important;
  }

  /* 导航栏中开启、选中和hover后的样式 */

  .navbar .nav-link:link,
  .navbar .nav-link:visited,
  .navbar .nav-link em:link,
  .navbar .nav-link em:visited,
  .navbar .dropdown .dropdown-item:link,
  .navbar .dropdown .dropdown-item:visited {
    color: rgba(0, 0, 0, 0.5);
  }

  .navbar .active a {
    color: #fff !important;
    background-color: #66CCCC;
    transition: background-color 0.3s;
  }

  .navbar .nav-link:hover,
  /* .navbar .nav-link:focus, */

  /* .navbar .nav-link:active, */

  .navbar .nav-link em:hover,
  .navbar .nav-link em:focus,
  .navbar .nav-link em:active,
  .navbar .dropdown:hover,
  .navbar .dropdown:focus,
  .navbar .dropdown:active,
  .navbar .dropdown .dropdown-item:hover,
  .navbar .dropdown .dropdown-item:focus,
  .navbar .dropdown .dropdown-item:active,
  .navbar .dropdown .dropdown-item.active {
    color: #fff !important;
    background-color: #66CCCC !important;
    transition: background-color 0.3s;
  }

  .navbar .b-nav-dropdown .dropdown-menu {
    border-color: #66CCCC;
    box-shadow: 0 6px 12px rgba(102, 204, 204, 0.175);
  }

  .navbar .dropdown-menu .divider {
    background-color: #66CCCC;
    transition: background-color 0.3s;
  }

  /* 导航栏中开启、选中和hover后的样式 */

  /* 缩小后导航按钮的样式 */

  .navbar .navbar-toggler {
    border-color: #66CCCC;
    background-color: #fff;
  }

  .navbar .navbar-toggler:hover,
  .navbar .navbar-toggler:active {
    background-color: rgb(82, 167, 167);
  }


  .navbar .navbar-toggler .icon-bar {
    background-color: #66CCCC;
  }

  /* 缩小后导航按钮的样式 */

  /* 导航栏样式 */

  /* modal样式 */

  /* 两条线 */

  .modal .modal-header {
    border-bottom-color: #66cccc;
    border-width: 2px;
  }

  .modal .modal-footer {
    border-top-color: #66cccc;
    border-width: 2px;
  }

  /* 两条线 */

  .modal .modal-header .close {
    color: #113030;
  }

  /* 按钮样式 */

  // .modal .modal-footer button {
  //   color: #fff;
  //   background: #66cccc;
  //   border-color: #66cccc;
  // }
  // .modal .modal-footer button:hover,
  // .modal .modal-footer button:focus {
  //   color: #66cccc;
  //   background: #fff;
  // }
  .navbar {
    /* 两条线 */
    /deep/ .modal .modal-header {
      border-bottom-color: #66cccc;
      border-width: 2px;
    }

    /deep/ .modal .modal-footer {
      border-top-color: #66cccc;
      border-width: 2px;
    }

    /* 两条线 */
    /deep/ .modal .modal-header .close {
      color: #113030;
    }
    /* 按钮样式 */
    /deep/ .modal .modal-footer button {
      color: #fff;
      background: #66cccc;
      border-color: #66cccc;
    }
    /deep/ .modal .modal-footer button:hover,
    /deep/ .modal .modal-footer button:focus {
      color: #66cccc;
      background: #fff;
    }
    /* 按钮样式 */
    /* 输入框样式 */
    /deep/ .modal .modal-body input,
    /deep/ .modal .modal-body select {
      margin-top: 10px;
      border-color: #66cccc;
    }

    /deep/ .modal .modal-body label,
    /deep/ .modal .modal-body select {
      margin-top: 10px;
    }

    /deep/ .modal .modal-body input:focus,
    /deep/ .modal .modal-body input:hover,
    /deep/ .modal .modal-body select:focus,
    /deep/ .modal .modal-body select:hover {
      border-color: #2f8b8b;
    }

    /* 输入框样式 */
  }

  /* 按钮样式 */

  /* 输入框样式 */

  .modal .modal-body input,
  .modal .modal-body select {
    margin-top: 10px;
    border-color: #66cccc;
  }

  .modal .modal-body label,
  .modal .modal-body select {
    margin-top: 10px;
  }

  .modal .modal-body input:focus,
  .modal .modal-body input:hover,
  .modal .modal-body select:focus,
  .modal .modal-body select:hover {
    border-color: #2f8b8b;
  }

  /* 输入框样式 */

  /* modal样式 */

</style>
