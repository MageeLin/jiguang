<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">吉光互联网工作室</div>
      <div class="page__title">后台管理系统</div>
    </div>
    <div class="page__bd">
      <div class="weui-toptips weui-toptips_warn" v-if="showTopTips" v-text="'错误提示'" />

      <div class="weui-cells__title">请登录</div>
      <div class="weui-cells weui-cells_after-title">
        <mp-field placeholder="请输入邮箱" @change="onEamilChange" type="email" label="邮箱" />
        <mp-field placeholder="请输入密码" @change="onPasswordChange" type="password" label="密码" />
      </div>
      <div class="weui-cells__tips">管理员账户才可登录</div>
      <div class="weui-btn-area">
        <div v-show="btnShow" class="page__bd page__bd_spacing">
          <button class="weui-btn" type="primary" @click="login">登录</button>
        </div>
      </div>
    </div>
    <mp-footer :text="footer.text" :links="footer.links" fixed/>
  </div>
</template>

<script>
  // Use Vuex
  // import store from '../../store'
  import MpField from "mp-weui/packages/field";
  import MpAgree from "mp-weui/packages/agree";
  import MpFooter from "mp-weui/packages/footer";
  export default {
    data() {
      return {
        loginInfo: {
          email: "",
          password: ""
        },
        footer: {
          text: "Copyright © 2016-2018 吉光互联网工作室",
          links: [{
            link: "../login/main",
            text: "Made by JingyiLin"
          }]
        }
      };
    },
    computed: {
      btnShow() {
        // 显示button
        return !this.loginInfo.email == "" && !this.loginInfo.password == "";
      }
    },
    components: {
      MpField,
      MpAgree,
      MpFooter
    },
    methods: {
      onEamilChange(value) {
        this.loginInfo.email = value;
      },
      onPasswordChange(value) {
        this.loginInfo.password = value;
      },
      // showErrToast() {
      //   wx.showToast({
      //     title: "登陆失败",
      //     icon: "none"
      //   });
      // },
      login() {
        this.$flyio
          .post("http://127.0.0.1:3000/users/weapp/getbylogin", {
            email: this.loginInfo.email,
            password: this.loginInfo.password
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
            } else {
              this.$store.commit("syncUserInfo", res.result);
              console.log("成功");
              if (res.result._id) {
                wx.setStorageSync("id", res.result._id);
                wx.reLaunch({
                  url: "../home/main"
                });
              }
            }
          })
          .catch(error => {
            console.log(error.status, error.message);
          });
      },
      loginById() {
        let id = wx.getStorageSync("id");
        if (id) {
          this.$flyio
            .post("http://127.0.0.1:3000/users/weapp/getbystorage", {
              id: id
            })
            .then(response => {
              let res = response.data;
              if (res.status == "1") {
                wx.showToast({
                  title: res.msg,
                  icon: "none"
                });
              } else {
                this.$store.commit("syncUserInfo", res.result);
                console.log("成功");
                if (res.result._id) {
                  wx.setStorageSync("id", res.result._id);
                  wx.reLaunch({
                    url: "../home/main"
                  });
                }
              }
            })
            .catch(error => {
              console.log(error.status, error.message);
            });
        }
      }
    },
    mounted() {
      this.loginById();
    }
  };

</script>
<style lang="less" scoped>
  .page__title {
    margin-top: 40rpx;
    text-align: center;
    font-size: 50rpx;
    font-weight: bold;
    color: #264653;
  }

  .page__hd,
  .page__bd {
    margin-top: 70rpx;
  }

  .page {
    /deep/ .weui-label {
      color: #264653;
    }
  }

  button[type="primary"] {
    background-color: #e9c46a;
  }

  button[type="primary"].button-hover {
    background-color: #f4a261;
  }

</style>
