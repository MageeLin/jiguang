<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-cells__title">成员区域</div>
      <div class="weui-btn-area">
        <div class="weui-cells__title">指导教师1：</div>
        <div class="weui-cells weui-cells_after-title">
          <!-- <div class="weui-cells__tips">指导教师1：</div> -->
          <mp-field placeholder="请输入内容" type="text" label="教师1姓名" v-model.lazy="memberInfo.personTeacher[0].name" />
        </div>
        <p class="page__desc">当前头像：{{value}}</p>
        <mp-picker v-model="memberInfo.personTeacher[0].src" :range="srcArray" range-key="label">
          <button type="primary">教师1头像</button>
        </mp-picker>
        <!-- <div class="weui-cells__title">指导教师2：</div> -->
        <div class="weui-cells weui-cells_after-title">
          <div class="weui-cells__tips">指导教师2：</div>
          <mp-field placeholder="请输入内容" type="text" label="教师2姓名" v-model.lazy="memberInfo.personTeacher[1].name" />
        </div>
        <p class="page__desc">当前头像：{{memberInfo.personTeacher[1].src}}</p>
        <mp-picker v-model="memberInfo.personTeacher[1].src" :range="srcArray" range-key="label">
          <button type="primary">教师2头像</button>
        </mp-picker>
        <div class="weui-cells__title">指导教师3：</div>
        <div class="weui-cells weui-cells_after-title">

          <mp-field placeholder="请输入内容" type="text" label="教师3姓名" v-model.lazy="memberInfo.personTeacher[2].name" />
        </div>
        <p class="page__desc">当前头像：{{memberInfo.personTeacher[2].src}}</p>
        <mp-picker v-model="memberInfo.personTeacher[2].src" :range="srcArray" range-key="label">
          <button type="primary">教师3头像</button>
        </mp-picker>
        <div class="weui-cells__title">文字</div>
        <div class="weui-cells weui-cells_after-title">
          <mp-field placeholder="请输入文字" type="text" label="大文字" v-model.lazy="memberInfo.title" />
          <mp-field placeholder="请输入文字" type="text" label="小文字" v-model.lazy="memberInfo.text" />
        </div>
        <div class="weui-cells__tips">左侧文字</div>
        <mp-agree url-text="修改" v-model="isAgree" url="/abc" />
        <div v-show="isAgree" class="page__bd page__bd_spacing">
          <button class="weui-btn" type="primary" @click="memberModify">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MpField from 'mp-weui/packages/field';
  import MpPicker from 'mp-weui/packages/picker';
  import MpAgree from 'mp-weui/packages/agree';
  export default {
    computed: {
      memberInfo() {
        return this.$store.state.homepageInfo.member;
      }
    },
    data() {
      return {
        isAgree: false,
        srcArray: [{
            value: "0",
            label: "兔子"
          },
          {
            value: "1",
            label: "老虎"
          },
          {
            value: "2",
            label: "驴子"
          },
          {
            value: "3",
            label: "浣熊"
          },
          {
            value: "4",
            label: "狐狸"
          },
          {
            value: "5",
            label: "绵羊"
          },
          {
            value: "6",
            label: "猪猪"
          },
          {
            value: "7",
            label: "熊猫"
          },
          {
            value: "8",
            label: "灰狼"
          },
          {
            value: "9",
            label: "猴子"
          },
          {
            value: "10",
            label: "青蛙"
          },
          {
            value: "11",
            label: "企鹅"
          },
          {
            value: "12",
            label: "狗子"
          },
          {
            value: "13",
            label: "喵喵"
          },
          {
            value: "14",
            label: "河马"
          },
          {
            value: "15",
            label: "考拉"
          }
        ],
      };
    },
    components: {
      MpPicker,
      MpField,
      MpAgree
    },
    methods: {
      memberModify() {
        // 下面是上传表单
        this.$flyio
          .post("http://127.0.0.1:3000/homepages/weapp/membermodify", {
            personTeacher: this.memberInfo.personTeacher,
            title: this.memberInfo.title,
            text: this.memberInfo.text
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
