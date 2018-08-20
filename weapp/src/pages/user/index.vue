<template>
  <div class="page">
    <div class="page__bd">

      <div class="weui-cells__title">成员管理</div>
      <div class="weui-cells weui-cells_after-title">
        <mp-cell v-for="user in usersInfo" :key="user._id" :content="user.name" :label="user.department" icon-src="../../static/tabbar-icon/avatar.png"
          :href="'./children/detail/main?id='+ user._id" />
        <!-- <mp-cell content="标题文字" label="说明文字" href="/aaa" /> -->
      </div>


    </div>
    <mp-footer :text="footer.text" :links="footer.links" fixed/>

  </div>
</template>

<script>
  import mpCell from 'mp-weui/packages/cell';
  import MpFooter from "mp-weui/packages/footer";

  export default {
    data() {
      return {
        usersInfo: [],
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
      mpCell,
      MpFooter

    },
    methods: {
      getUsersInfo() {
        // 获取所有用户信息
        this.$flyio.post("http://127.0.0.1:3000/users/weapp/getalluser", {})
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
            } else {
              this.usersInfo = res.result;
              console.log("成功");
            }
          })
          .catch(error => {
            console.log(error.status, error.message);
          });
      }
    },
    mounted() {
      this.getUsersInfo();
    }
  };

</script>
