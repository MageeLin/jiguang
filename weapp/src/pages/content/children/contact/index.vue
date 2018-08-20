<template>
  <div class="page">
    <div class="weui-cells__title">联系我们区域</div>
    <div class="page__bd">
      <div class="weui-cells__title">文字区域：</div>
      <div class="weui-cells weui-cells_after-title">
        <mp-field placeholder="请输入文字" type="text" label="文字" v-model.lazy="contactInfo.title" />
        <mp-field placeholder="请输入电话" type="text" label="电话" v-model.lazy="contactInfo.phone" />
        <mp-field placeholder="请输入qq号" type="text" label="qq" v-model.lazy="contactInfo.qq" />
      </div>
      <div class="weui-cells__title">二维码区域：</div>
      <div class="weui-cells weui-cells_after-title">
        <mp-uploader-base @onSelect="chooseWechat" :file-list="qrcodeImages.wechat" title="微信二维码上传" :max="max" />
        <mp-uploader-base @onSelect="chooseWeibo" :file-list="qrcodeImages.weibo" title="微博二维码上传" :max="max" />
      </div>
    </div>
    <mp-agree url-text="修改" v-model="isAgree" url="/abc" />
    <div class="weui-btn-area">
      <div v-show="isAgree" class="page__bd page__bd_spacing">
        <button class="weui-btn" type="primary" @click="contactModify">修改</button>
      </div>
    </div>
  </div>
</template>

<script>
  // Use Vuex
  // import store from '../../../../store'
  import MpField from 'mp-weui/packages/field';
  import MpAgree from 'mp-weui/packages/agree';
  import MpUploaderBase from 'mp-weui/packages/uploader-base'

  export default {
    computed: {
      contactInfo() {
        return this.$store.state.homepageInfo.contact;
      }
    },
    data() {
      return {
        // welcomeInfo: {
        //   slider1Title: '',
        //   slider1Text: '',
        //   slider2Title: '',
        //   slider2Text: '',
        //   slider3Title: '',
        //   slider3Text: '',
        //   slider4Title: '',
        //   slider4Text: '',
        //   title: '',
        //   text: '',
        // },
        isAgree: false,
        qrcodeImages: {
          wechat: [],
          weibo: [],
        },
        max: 1
      };
    },
    components: {
      MpField,
      MpAgree,
      MpUploaderBase
    },
    methods: {
      chooseWechat() {
        wx.chooseImage({
          sizeType: ['original'],
          sourceType: ['album'],
          count: this.max,
          success: (res) => {
            this.qrcodeImages.wechat = this.qrcodeImages.wechat.concat(res.tempFiles);
          },
        });
      },
      chooseWeibo() {
        wx.chooseImage({
          sizeType: ['original'],
          sourceType: ['album'],
          count: this.max,
          success: (res) => {
            this.qrcodeImages.weibo = this.qrcodeImages.weibo.concat(res.tempFiles);
          },
        });
      },
      contactModify() {
        // 下面时上传表单
        this.$flyio
          .post("http://127.0.0.1:3000/homepages/weapp/contactmodify", {
            title: this.contactInfo.title,
            phone: this.contactInfo.phone,
            qq: this.contactInfo.qq
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

        // 下面是上传文件
        var id = wx.getStorageSync("id");
        console.log(this.contactInfo);
        console.log(this.qrcodeImages);
        var qrcodeImages = this.qrcodeImages;
        var arr = [];
        // 剔除空值的对象
        Object.keys(qrcodeImages).forEach(key => {
          if (qrcodeImages[key][0]) {
            arr.push(key);
          }
        });

        // 新建一个promise数组,当非空时才能上传图片
        if (arr[0]) {
          var promiseArr = arr.map(key => {
            // return sliderImages[key][0];
            return new Promise((resolve, reject) => {
              wx.uploadFile({
                url: 'http://127.0.0.1:3000/files/weapp/uploadcontact', //仅为示例，非真实的接口地址
                filePath: qrcodeImages[key][0].path,
                name: 'qrcode',
                formData: {
                  'id': id,
                  'key': key

                },
                success: function (res) {
                  resolve(res.data);
                },
                fail: function (err) {
                  reject(new Error('上传图片失败'));
                }
              })
            });
          });
          // 进行PromiseALL统一管理上传
          Promise.all(promiseArr).then(res => {
            console.log(res);
            wx.showToast({
              title: res.msg,
              icon: "none"
            });
            return ''
          }).then(res => {
            // 修改完以后重新读取homepage和footer信息
            this.$store.dispatch('getHomepageInfo');
            this.$store.dispatch('getFooterInfo');
          }).catch(err => {
            console.log(err);
          });
        }

      }
    },
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
