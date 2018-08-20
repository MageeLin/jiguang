<template>
  <div class="page">
    <div class="weui-cells__title">用户详细信息</div>
    <div class="page__bd" v-if="oneUserInfo">

      <div class="weui-cells__title">{{oneUserInfo.name}}</div>
      <div class="weui-cells weui-cells_after-title">
        <mp-field placeholder="请输入姓名" v-model="oneUserInfo.name" type="text" label="姓名" />
        <mp-field placeholder="请输入昵称" v-model="oneUserInfo.nickname" type="text" label="昵称" />
        <mp-field placeholder="请输入学院" v-model="oneUserInfo.institute" type="text" label="学院" />
        <mp-field placeholder="请输入专业" v-model="oneUserInfo.major" type="text" label="专业" />
        <mp-picker v-model="oneUserInfo.department" :range="departmentArray" range-key="label">
          <button type="primary">部门选择</button>
        </mp-picker>

        <mp-field placeholder="入学时间" v-model="oneUserInfo.enterSchool" type="text" label="入学时间" />
        <mp-field placeholder="毕业时间" v-model="oneUserInfo.leaveSchool" type="text" label="离校时间" />
        <mp-field placeholder="电话" v-model="oneUserInfo.phone" type="text" label="电话" />
        <mp-field placeholder="邮箱" v-model="oneUserInfo.email" type="text" label="邮箱" />
        <mp-picker v-model="oneUserInfo.avatar" :range="avatarArray" range-key="label">
          <button type="primary">头像选择</button>
        </mp-picker>

        <div class="weui-cells__title">权限管理</div>
        <div class="weui-cells weui-cells_after-title">
          <mp-switch title="是否管理员" v-model="oneUserInfo.isAdministrator" />
          <mp-switch title="是否测试账号" v-model="oneUserInfo.isGuest" />
        </div>
      </div>
      <mp-agree url-text="修改" v-model="isAgree" url="/abc" />
      <div class="weui-btn-area">
        <div v-show="isAgree" class="page__bd page__bd_spacing">
          <button class="weui-btn" type="primary" @click="oneUserInfoModify">修改</button>
          <mp-agree url-text="删除用户" v-model="deleteAgree" url="/abc" />
          <div v-show="deleteAgree" class="page__bd page__bd_spacing">
            <button class="weui-btn" type="primary" @click="oneUserInfoDelete">删除此用户</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import MpCell from 'mp-weui/packages/cell';
  import MpField from 'mp-weui/packages/field';
  import MpPicker from 'mp-weui/packages/picker';
  import MpSwitch from 'mp-weui/packages/switch';
  import MpAgree from 'mp-weui/packages/agree';
  export default {
    data() {
      return {
        isAgree: false,
        deleteAgree: false,
        oneUserInfo: '',
        departmentArray: [{
          value: "jsb",
          label: "技术部"
        }, {
          value: "sjb",
          label: "设计部"
        }, {
          value: "yxb",
          label: "营销部"
        }, {
          value: "else",
          label: "其他"
        }, ],
        avatarArray: [{
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
      MpCell,
      MpField,
      MpPicker,
      MpAgree,
      MpSwitch
    },
    methods: {
      getOneUsersInfo() {
        // 获取单个用户信息
        this.$flyio.post("http://127.0.0.1:3000/users/weapp/getoneuser", {
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
              this.oneUserInfo = res.result;
              console.log("成功");
            }
          })
          .catch(error => {
            console.log(error.status, error.message);
          });
      },
      oneUserInfoModify() {
        // 下面是上传表单
        this.$flyio
          .post("http://127.0.0.1:3000/users/weapp/oneusermodify", {
            id: this.$root.$mp.query.id,
            name: this.oneUserInfo.name,
            nickname: this.oneUserInfo.nickname,
            institute: this.oneUserInfo.institute,
            major: this.oneUserInfo.major,
            department: this.oneUserInfo.department,
            enterSchool: this.oneUserInfo.enterSchool,
            leaveSchool: this.oneUserInfo.leaveSchool,
            phone: this.oneUserInfo.phone,
            email: this.oneUserInfo.email,
            avatar: this.oneUserInfo.avatar,
            isAdministrator: this.oneUserInfo.isAdministrator,
            isGuest: this.oneUserInfo.isGuest
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
            } else {
              console.log("成功");
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
            }
          }).then(res => {
            // 修改完以后重新读取用户信息
            this.getOneUsersInfo();
          }).catch(error => {
            console.log(error.status, error.message);
          });
      },
      oneUserInfoDelete() {
        // 下面是上传表单
        this.$flyio
          .post("http://127.0.0.1:3000/users/weapp/oneuserDelete", {
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
              console.log("成功");
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
            }
          }).then(res => {
            // 修改完以后重新读取用户信息
            this.getOneUsersInfo();
          }).catch(error => {
            console.log(error.status, error.message);
          });
      }
    },
    onShow() {
      this.getOneUsersInfo();
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

  .weui-switch-cp__box {
    border-color: #e9c46a;
    background-color: #e9c46a;
  }

</style>
