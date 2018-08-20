<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-cells__title">轮播图区域</div>
      <div class="weui-cells weui-cells_after-title">
        <mp-uploader-base @onSelect="chooseSlider1" :file-list="sliderImages.slider1" title="图1上传" :max="max" />
        <div class="weui-cells__tips">建议图片大小：1280*450</div>
        <mp-field placeholder="请输入标题" type="text" label="图1标题" v-model.lazy="welcomeInfo.slider1Title" />
        <mp-field placeholder="请输入内容" type="text" label="图1内容" v-model.lazy="welcomeInfo.slider1Text" />
      </div>
      <div class="weui-cells weui-cells_after-title">
        <mp-uploader-base @onSelect="chooseSlider2" :file-list="sliderImages.slider2" title="图2上传" :max="max" />
        <div class="weui-cells__tips">建议图片大小：1280*450</div>
        <mp-field placeholder="请输入标题" type="text" label="图2标题" v-model.lazy="welcomeInfo.slider2Title" />
        <mp-field placeholder="请输入内容" type="text" label="图2内容" v-model.lazy="welcomeInfo.slider2Text" />
      </div>
      <div class="weui-cells weui-cells_after-title">
        <mp-uploader-base @onSelect="chooseSlider3" :file-list="sliderImages.slider3" title="图3上传" :max="max" />
        <div class="weui-cells__tips">建议图片大小：1280*450</div>
        <mp-field placeholder="请输入标题" type="text" label="图3标题" v-model.lazy="welcomeInfo.slider3Title" />
        <mp-field placeholder="请输入内容" type="text" label="图3内容" v-model.lazy="welcomeInfo.slider3Text" />
      </div>
      <div class="weui-cells weui-cells_after-title">
        <mp-uploader-base @onSelect="chooseSlider4" :file-list="sliderImages.slider4" title="图4上传" :max="max" />
        <div class="weui-cells__tips">建议图片大小：1280*450</div>
        <mp-field placeholder="请输入标题" type="text" label="图4标题" v-model.lazy="welcomeInfo.slider4Title" />
        <mp-field placeholder="请输入内容" type="text" label="图4内容" v-model.lazy="welcomeInfo.slider4Text" />
      </div>
      <div class="weui-cells__tips">图片上传哪张则修改哪张，不上传则不修改</div>
      <mp-field placeholder="请输入文字" type="text" label="大文字" v-model.lazy="welcomeInfo.title" />
      <mp-field placeholder="请输入文字" type="text" label="小文字" v-model.lazy="welcomeInfo.text" />
    </div>
    <mp-agree url-text="修改" v-model="isAgree" url="/abc" />
    <div class="weui-btn-area">
      <div v-show="isAgree" class="page__bd page__bd_spacing">
        <button class="weui-btn" type="primary" @click="welcomeModify">修改</button>
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
      welcomeInfo() {
        return this.$store.state.homepageInfo.welcome;
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
        sliderImages: {
          slider1: [],
          slider2: [],
          slider3: [],
          slider4: [],
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
      chooseSlider1() {
        wx.chooseImage({
          sizeType: ['original'],
          sourceType: ['album'],
          count: this.max,
          success: (res) => {
            this.sliderImages.slider1 = this.sliderImages.slider1.concat(res.tempFiles);
          },
        });
      },
      chooseSlider2() {
        wx.chooseImage({
          sizeType: ['original'],
          sourceType: ['album'],
          count: this.max,
          success: (res) => {
            this.sliderImages.slider2 = this.sliderImages.slider2.concat(res.tempFiles);
          },
        });
      },
      chooseSlider3() {
        wx.chooseImage({
          sizeType: ['original'],
          sourceType: ['album'],
          count: this.max,
          success: (res) => {
            this.sliderImages.slider3 = this.sliderImages.slider3.concat(res.tempFiles);
          },
        });
      },
      chooseSlider4() {
        wx.chooseImage({
          sizeType: ['original'],
          sourceType: ['album'],
          count: this.max,
          success: (res) => {
            this.sliderImages.slider4 = this.sliderImages.slider4.concat(res.tempFiles);
          },
        });
      },
      welcomeModify() {
        // 下面时上传表单
        this.$flyio
          .post("http://127.0.0.1:3000/homepages/weapp/welcomemodify", {
            slider1Title: this.welcomeInfo.slider1Title,
            slider1Text: this.welcomeInfo.slider1Text,
            slider2Title: this.welcomeInfo.slider2Title,
            slider2Text: this.welcomeInfo.slider2Text,
            slider3Title: this.welcomeInfo.slider3Title,
            slider3Text: this.welcomeInfo.slider3Text,
            slider4Title: this.welcomeInfo.slider4Title,
            slider4Text: this.welcomeInfo.slider4Text,
            title: this.welcomeInfo.title,
            text: this.welcomeInfo.text
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
        console.log(this.welcomeInfo);
        console.log(this.sliderImages);
        var sliderImages = this.sliderImages;
        var arr = [];
        // 剔除空值的对象
        Object.keys(sliderImages).forEach(key => {
          if (sliderImages[key][0]) {
            arr.push(key);
          }
        });

        // 新建一个promise数组,当非空时才能上传图片
        if (arr[0]) {
          var promiseArr = arr.map(key => {
            // return sliderImages[key][0];
            return new Promise((resolve, reject) => {
              wx.uploadFile({
                url: 'http://127.0.0.1:3000/files/weapp/uploadslider', //仅为示例，非真实的接口地址
                filePath: sliderImages[key][0].path,
                name: 'slider',
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
