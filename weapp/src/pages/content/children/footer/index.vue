<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-btn-area">
        <div class="weui-cells__title">页脚区域</div>
        <div class="weui-cells weui-cells_after-title">
          <mp-field placeholder="请输入版权" type="text" label="版权" v-model.lazy="footerInfo.copyright" />
          <mp-field placeholder="请输入备案" type="text" label="备案" v-model.lazy="footerInfo.recordNumber" />
        </div>
        <mp-agree url-text="修改" v-model="isAgree" url="/abc" />
        <div v-show="isAgree" class="page__bd page__bd_spacing">
          <button class="weui-btn" type="primary" @click="footerModify">修改</button>
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
      footerInfo() {
        return this.$store.state.footerInfo;
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
      footerModify() {
        // 下面是上传表单
        this.$flyio
          .post("http://127.0.0.1:3000/footers/weapp/footermodify", {
            copyright: this.footerInfo.copyright,
            recordNumber: this.footerInfo.recordNumber,
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
