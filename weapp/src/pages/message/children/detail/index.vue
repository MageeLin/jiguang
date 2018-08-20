<template>
  <div class="page">

    <div class="weui-cells__title">留言具体内容</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="page__bd" v-if="messageArray">
        <mp-panel :data-source="messageArray" title="留言" type="text" />
      </div>
      <div class="page__bd" v-if="replysArray">
        <mp-panel :data-source="replysArray" title="回复" type="text" />
      </div>
    </div>
    <mp-agree url-text="删除留言" v-model="isAgree" url="/abc" />
    <div class="weui-btn-area">
      <div v-show="isAgree" class="page__bd page__bd_spacing">
        <button class="weui-btn" type="primary" @click="messageDelete">删除该留言</button>
      </div>
    </div>
  </div>
</template>

<script>
  function formatDate(time) {
    // 生成一个正规格式
    let date = new Date(time);
    let format =
      date.getFullYear() +
      "年" +
      (date.getMonth() + 1) +
      "月" +
      date.getDate() +
      "日";
    return format;
  }
  import MpPanel from "mp-weui/packages/panel";
  import MpAgree from 'mp-weui/packages/agree';
  export default {
    components: {
      MpPanel,
      MpAgree,
    },
    data() {
      return {
        isAgree: false,
        messageArray: [{
          title: "标题一",
          content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
          meta: [
            "文字来源",
            "时间",
            {
              value: "其它信息",
              divider: true
            }
          ]
        }],
        replysArray: [{
            title: "标题一",
            content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
            meta: [
              "文字来源",
              "时间",
              {
                value: "其它信息",
                divider: true
              }
            ]
          },
          {
            title: "标题一",
            content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
            meta: [
              "文字来源",
              "时间",
              {
                value: "其它信息",
                divider: true
              }
            ]
          }
        ]
      };
    },
    computed: {},
    methods: {
      getMessageDetail() {
        // 获取留言细节

        this.$flyio
          .post("http://127.0.0.1:3000/messageboards/weapp/getmessagedetail", {
            // 调用传递过来的id
            id: this.$root.$mp.query.id
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
            } else {
              let messageArray = [{
                title: res.result.creatorName,
                content: res.result.content,
                meta: [formatDate(res.result.time)]
              }];
              this.messageArray = messageArray;

              let replysArray = [];
              for (let i = 0; i < res.result.reply.length; i++) {
                let obj = {
                  title: res.result.reply[i].name,
                  content: res.result.reply[i].content,
                  meta: [formatDate(res.result.reply[i].time)]
                };

                replysArray.push(obj);
              }
              this.replysArray = replysArray;
              console.log("成功");
            }
          })
          .catch(error => {
            console.log(error.status, error.message);
          });
      },
      messageDelete() {
        // 删除该留言

        this.$flyio
          .post("http://127.0.0.1:3000/messageboards/weapp/messagedelete", {
            // 调用传递过来的id
            id: this.$root.$mp.query.id
          })
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
              this.getMessageDetail();
              console.log("成功");
            }
          })
          .catch(error => {
            console.log(error.status, error.message);
          });
      }
    },
    mounted() {
      this.getMessageDetail();
    }
  };

</script>
