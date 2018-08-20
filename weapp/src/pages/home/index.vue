<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-cells__title">服务器状态</div>
      <div class="weui-cells weui-cells_after-title">
        <mp-cell v-if="systemInfo" v-for="item in systemInfo" :key="item.content" :content="item.content" :label="item.label" :icon-src="item['icon-src']"
        />
      </div>
      <!-- <mp-progress percent="60" show-info animate /> -->
    </div>
    <div class="weui-btn-area">
      <div class="page__bd page__bd_spacing">
        <button class="weui-btn" type="primary" @click="logout">退出账号</button>
      </div>
    </div>
    <mp-footer :text="footer.text" :links="footer.links" fixed/>
  </div>
</template>

<script>
  import MpCellGroup from 'mp-weui/packages/cell-group';
  import MpCell from 'mp-weui/packages/cell';
  import MpProgress from 'mp-weui/packages/progress';
  import MpFooter from "mp-weui/packages/footer";
  export default {
    data() {
      return {
        systemInfo: [],
        footer: {
          text: "Copyright © 2016-2018 吉光互联网工作室",
          links: [{
            link: "../login/main",
            text: "Made by JingyiLin"
          }]
        }
      };
    },
    components: {
      MpCellGroup,
      MpCell,
      MpProgress,
      MpFooter
    },
    methods: {
      getSystemInfo() {
        // 删除该留言

        this.$flyio
          .post("http://127.0.0.1:3000/systems/weapp/getsysteminfo", {})
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
            } else {
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
              this.systemInfo = res.result
              console.log("成功");
            }
          })
          .catch(error => {
            console.log(error.status, error.message);
          });
      },
      logout() {
        // 退出该账户
        wx.removeStorageSync('id')
        wx.reLaunch({
          url: "../login/main"
        });
      }
    },
    mounted() {
      this.getSystemInfo();
    }
  };

</script>

<style lang="less" scoped>
  button[type="primary"] {
    background-color: #e9c46a;
  }

  button[type="primary"].button-hover {
    background-color: #f4a261;
  }

</style>
