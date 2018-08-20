<template>
  <div id="information">
    <b-container>
      <nav-bread :bread="breadItems"></nav-bread>
      <b-form>
        <b-form-group horizontal label="姓名：" label-for="personalInfo-name" label-class="text-md-right">
          <b-form-input v-model="personalInfo.name" id="personalInfo-name" type="text"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="昵称：" label-for="personalInfo-nickname" label-class="text-md-right">
          <b-form-input v-model="personalInfo.nickname" id="personalInfo-nickname" type="text"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="邮箱：" label-for="personalInfo-email" label-class="text-md-right">
          <b-form-input v-model="personalInfo.email" id="personalInfo-email" type="email"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="密码：" label-for="personalInfo-password" label-class="text-md-right">
          <b-form-input v-model="personalInfo.password" id="personalInfo-password" type="password"></b-form-input>
        </b-form-group>
        <!-- <b-form-group horizontal label="确认密码：" label-for="personalInfo-ppassword" label-class="text-md-right">
          <b-form-input v-model="personalInfo.ppassword" id="personalInfo-ppassword" type="password"></b-form-input>
        </b-form-group> -->
        <b-form-group horizontal label="手机号：" label-for="personalInfo-phone" label-class="text-md-right">
          <b-form-input v-model="personalInfo.phone" id="personalInfo-phone" type="number"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="部门：" label-for="personalInfo-department" label-class="text-md-right">
          <b-form-select v-model="personalInfo.department" id="personalInfo-department" :options="personalDepartmentOpition"></b-form-select>
        </b-form-group>
        <b-form-group horizontal label="学院：" label-for="personalInfo-institute" label-class="text-md-right">
          <b-form-input v-model="personalInfo.institute" id="personalInfo-institute" type="text"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="入学时间：" label-for="personalInfo-enterSchool" label-class="text-md-right">
          <b-form-input v-model="personalInfo.enterSchool" id="personalInfo-enterSchool" type="month"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="毕业时间：" label-for="personalInfo-leaveSchool" label-class="text-md-right">
          <b-form-input v-model="personalInfo.leaveSchool" id="personalInfo-leaveSchool" type="month"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="专业：" label-for="personalInfo-major" label-class="text-md-right">
          <b-form-input v-model="personalInfo.major" id="personalInfo-major" type="text"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="头像：" label-for="personalInfo-avatar" label-class="text-md-right">
          <b-form-select v-model="personalInfo.avatar" id="personalInfo-avatar" :options="personalAvatarOpition"></b-form-select>
        </b-form-group>

        <b-form-group horizontal label="" label-for="personalInfo-confirmModify" label-class="text-md-right">
          <b-form-checkbox value=true v-model="personalInfo.confirmModify" id="personalInfo-confirmModify">我同意修改个人资料</b-form-checkbox>
        </b-form-group>
        <b-form-group horizontal label="" label-for="personalInfo-code" label-class="text-md-right">
          <b-button @click="uploadPersonnalInfo" :disabled="!personalInfo.confirmModify" variant="primary" class="form-control">修改</b-button>
        </b-form-group>
      </b-form>
    </b-container>
  </div>
</template>
<script>
  import NavBread from "@/components/NavBread";
  export default {
    name: "Information",
    mounted() {
      // 把个人信息设为active标签
      this.$store.commit("changeActiveMenu", "information");
    },
    data() {
      return {
        breadItems: [{
            text: "主页",
            to: "/"
          },
          {
            text: "个人信息",
            active: true
          }
        ],
        personalDepartmentOpition: [{
            value: null,
            text: "请选择部门",
            disabled: true
          },
          {
            value: "jsb",
            text: "技术部"
          },
          {
            value: "sjb",
            text: "设计部"
          },
          {
            value: "yxb",
            text: "营销部"
          },
          {
            value: "else",
            text: "其他"
          }
        ],
        personalAvatarOpition: [{
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
        // personalInfo: {
        //   name: "",
        //   nickname: "",
        //   email: "",
        //   password: "",
        //   ppassword: "",
        //   phone: "",
        //   department: null,
        //   institute: "",
        //   enterSchool: "",
        //   leaveSchool: "",
        //   major: "",
        //   avatar: "1",
        //   confirmModify: false
        // }
      };
    },
    computed: {
      personalInfo() {
        return this.$store.state.userInfo;
      }
    },
    methods: {
      uploadPersonnalInfo() {
        // 上传修改后的个人信息

        this.$axios.post('/api/users/modifybycookie', {
          personalInfo: this.personalInfo
        }).then(response => {
          let res = response.data;
          if (res.status == '1') {
            console.log('数据库出错');
            alert(res.msg);
          } else {
            console.log('个人信息修改成功');
            alert('修改成功');
            if (document.cookie) {
              // 修改完以后重新读取一遍个人信息
              this.$store.dispatch('getUserInfoByCookie');
            }
          }
        }).catch((error) => {
          console.log('连接出错：' + error);
          alert('修改失败');
        });
      }
    },
    components: {
      NavBread
    }
  };

</script>
<style scoped>
  #information {
    background: url(../assets/images/grey.png);
    padding-top: 100px;
  }

  /* 个人信息表单样式 */

  #information .form-control:hover,
  #information .form-control:focus {
    border-color: #66cccc;
  }

  #information .btn-primary {
    color: #fff;
    font-weight: bold;
    background: #66cccc;
    border-color: #66cccc;
  }

  #information .btn-primary:hover,
  #information .btn-primary:focus {
    color: #66cccc;
    background: #fff;
  }

  /* 个人信息表单样式 */

</style>
