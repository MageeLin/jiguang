<template>
  <div class="page">
    <div class="weui-cells__title">团队留言板</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="page__bd" v-if="messagesArray">
        <mp-panel :data-source="messagesArray" title="留言板" />
      </div>
    </div>
    <div v-show="show">
      <mp-cell content="标题文字" label="说明文字" />
    </div>
    <div v-show="!showEnd" class="weui-cells__tips">下滑加载更多</div>
    <mp-loadmore v-show="showEnd" />
  </div>
</template>

<script>
  import MpPanel from 'mp-weui/packages/panel';
  import MpLoadmore from 'mp-weui/packages/loadmore';
  import MpCell from 'mp-weui/packages/cell';

  export default {
    components: {
      MpPanel,
      MpLoadmore,
      MpCell
    },
    data() {
      return {
        // icon20: base64.icon20,
        show: false,
        times: 1,
        messagesArray: [],
        showEnd: false,
        // icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDczIDQ3MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDczIDQ3MzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBjbGFzcz0iIj48Zz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00MDMuNTgxLDY5LjNjLTQ0LjctNDQuNy0xMDQtNjkuMy0xNjcuMi02OS4zcy0xMjIuNSwyNC42LTE2Ny4yLDY5LjNjLTg2LjQsODYuNC05Mi40LDIyNC43LTE0LjksMzE4ICAgIGMtNy42LDE1LjMtMTkuOCwzMy4xLTM3LjksNDJjLTguNyw0LjMtMTMuNiwxMy42LTEyLjEsMjMuMnM4LjksMTcuMSwxOC41LDE4LjZjNC41LDAuNywxMC45LDEuNCwxOC43LDEuNCAgICBjMjAuOSwwLDUxLjctNC45LDgzLjItMjcuNmMzNS4xLDE4LjksNzMuNSwyOC4xLDExMS42LDI4LjFjNjEuMiwwLDEyMS44LTIzLjcsMTY3LjQtNjkuM2M0NC43LTQ0LjcsNjkuMy0xMDQsNjkuMy0xNjcuMiAgICBTNDQ4LjI4MSwxMTQsNDAzLjU4MSw2OS4zeiBNMzg0LjQ4MSwzODQuNmMtNjcuNSw2Ny41LTE3Miw4MC45LTI1NC4yLDMyLjZjLTUuNC0zLjItMTIuMS0yLjItMTYuNCwyLjFjLTAuNCwwLjItMC44LDAuNS0xLjEsMC44ICAgIGMtMjcuMSwyMS01My43LDI1LjQtNzEuMywyNS40aC0wLjFjMjAuMy0xNC44LDMzLjEtMzYuOCw0MC42LTUzLjljMS4yLTIuOSwxLjQtNS45LDAuNy04LjdjLTAuMy0yLjctMS40LTUuNC0zLjMtNy42ICAgIGMtNzMuMi04Mi43LTY5LjQtMjA4LjcsOC44LTI4Ni45YzgxLjctODEuNywyMTQuNi04MS43LDI5Ni4yLDBDNDY2LjE4MSwxNzAuMSw0NjYuMTgxLDMwMi45LDM4NC40ODEsMzg0LjZ6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMyNjQ2NTMiIGRhdGEtb2xkX2NvbG9yPSIjNEMzMjMyIj48L3BhdGg+CgkJPGNpcmNsZSBjeD0iMjM2LjM4MSIgY3k9IjIzNi41IiByPSIxNi42IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMyNjQ2NTMiIGRhdGEtb2xkX2NvbG9yPSIjNEMzMjMyIj48L2NpcmNsZT4KCQk8Y2lyY2xlIGN4PSIzMjEuOTgxIiBjeT0iMjM2LjUiIHI9IjE2LjYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzI2NDY1MyIgZGF0YS1vbGRfY29sb3I9IiM0QzMyMzIiPjwvY2lyY2xlPgoJCTxjaXJjbGUgY3g9IjE1MC43ODEiIGN5PSIyMzYuNSIgcj0iMTYuNiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMjY0NjUzIiBkYXRhLW9sZF9jb2xvcj0iIzRDMzIzMiI+PC9jaXJjbGU+Cgk8L2c+CjwvZz48L2c+IDwvc3ZnPg==',

      };
    },
    computed: {

    },
    methods: {
      getMessage() {
        // 分阶段获取留言
        // 设置limit与times
        let limit = 10;
        let times = this.times;
        this.$flyio.post("http://127.0.0.1:3000/messageboards/weapp/getmessage", {
            limit: limit,
            times: times
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
            } else {
              // let arr = [];
              this.times++;
              if (res.result.length < limit) {
                // 显示暂无数据
                this.showEnd = true;
              }
              // console.log(res.result);
              for (let i = 0; i < res.result.length; i++) {
                let obj = {};
                obj.id = res.result[i]._id;
                obj.title = '姓名：' + res.result[i].creatorName;
                obj.content = '内容：' + res.result[i].content;
                // obj.icon = this.icon;
                obj.icon = '../../static/avatar-icon/' + res.result[i].avatar + '.png';
                obj.url = './children/detail/main?id=' + res.result[i]._id;
                this.messagesArray.push(obj);
              }
              // console.log(this.messagesArray);
              // wx.showToast({
              //   title: '加载中',
              //   icon: "loading"
              // });
              console.log("成功");
            }
          })
          .catch(error => {
            console.log(error.status, error.message);
          });
      }
    },
    mounted() {
      this.getMessage();
    },
    onReachBottom() {
      this.getMessage();
    }
  };

</script>
