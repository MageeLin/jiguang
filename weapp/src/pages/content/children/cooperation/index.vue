<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-btn-area">
        <div class="weui-cells__title">快捷联系区域</div>
        <div class="weui-cells weui-cells_after-title">
          <mp-field placeholder="请输入小文字" type="text" label="小文字" v-model.lazy="cooperationInfo.text" />
          <mp-field placeholder="请输入大文字" type="text" label="大文字" v-model.lazy="cooperationInfo.title" />
          <mp-field placeholder="请输入姓名" type="text" label="姓名" v-model.lazy="cooperationInfo.name" />
          <mp-field placeholder="请输入邮箱" type="text" label="邮箱" v-model.lazy="cooperationInfo.email" />
          <mp-field placeholder="请输入电话" type="text" label="电话" v-model.lazy="cooperationInfo.phone" />
          <mp-field placeholder="请输入位置" type="text" label="位置" v-model.lazy="cooperationInfo.position" />
        </div>
        <mp-agree url-text="修改" v-model="isAgree" url="/abc" />
        <div v-show="isAgree" class="page__bd page__bd_spacing">
          <button class="weui-btn" type="primary" @click="cooperationModify">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MpField from 'mp-weui/packages/field';
  import MpAgree from 'mp-weui/packages/agree';
  export default {
    computed: {
      cooperationInfo() {
        return this.$store.state.homepageInfo.cooperation;
      }
    },
    data() {
      return {
        isAgree: false,

      };
    },
    components: {
      MpField,
      MpAgree
    },
    methods: {
      cooperationModify() {
        // 下面是上传表单
        this.$flyio
          .post("http://127.0.0.1:3000/homepages/weapp/cooperationmodify", {
            text: this.cooperationInfo.text,
            title: this.cooperationInfo.title,
            name: this.cooperationInfo.name,
            email: this.cooperationInfo.email,
            phone: this.cooperationInfo.phone,
            position: this.cooperationInfo.position
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
            } else {
              // this.$store.commit("syncUserInfo", res.result);
              console.log("成功");
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
            }
          }).then(res => {
            // 修改完以后重新读取homepage和footer信息
            this.$store.dispatch('getHomepageInfo');
            this.$store.dispatch('getFooterInfo');
          }).catch(error => {
            console.log(error.status, error.message);
          });
      }
    },
  };

</script>

<style lang="less" scoped>
  page {
    background-color: #ffffff;
  }

  .weui-btn-area {
    picker {
      margin-bottom: 10px;
    }
  }

  button[type="primary"] {
    background-color: #e9c46a;
  }

  button[type="primary"].button-hover {
    background-color: #f4a261;
  }

</style>
