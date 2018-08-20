<template>
  <div>
    <div class="page">
      <div class="page__bd">
        <div class="weui-cells__title">作品集区域</div>
        <div class="weui-cells weui-cells_after-title">
          <mp-uploader-base @onSelect="chooseCollection1" :file-list="collectionImages.collection1" title="图1上传" :max="max" />
          <div class="weui-cells__tips">建议图片大小：250*250</div>
          <mp-field placeholder="请输入标题" type="text" label="作品1标题" v-model.lazy="collectionInfo.collection1Name" />
          <mp-field placeholder="请输入内容" type="text" label="作品1链接" v-model.lazy="collectionInfo.collection1Url" />
        </div>
        <div class="weui-cells weui-cells_after-title">
          <mp-uploader-base @onSelect="chooseCollection2" :file-list="collectionImages.collection2" title="图2上传" :max="max" />
          <div class="weui-cells__tips">建议图片大小：250*250</div>
          <mp-field placeholder="请输入标题" type="text" label="作品2标题" v-model.lazy="collectionInfo.collection2Name" />
          <mp-field placeholder="请输入内容" type="text" label="作品2链接" v-model.lazy="collectionInfo.collection2Url" />
        </div>
        <div class="weui-cells weui-cells_after-title">
          <mp-uploader-base @onSelect="chooseCollection3" :file-list="collectionImages.collection3" title="图3上传" :max="max" />
          <div class="weui-cells__tips">建议图片大小：250*250</div>
          <mp-field placeholder="请输入标题" type="text" label="作品3标题" v-model.lazy="collectionInfo.collection3Name" />
          <mp-field placeholder="请输入内容" type="text" label="作品3链接" v-model.lazy="collectionInfo.collection3Url" />
        </div>
        <div class="weui-cells__tips">图片上传哪张则修改哪张，不上传则不修改</div>
        <mp-field placeholder="请输入文字" type="text" label="大文字" v-model.lazy="collectionInfo.title" />
        <mp-field placeholder="请输入文字" type="text" label="小文字" v-model.lazy="collectionInfo.text" />
      </div>
      <mp-agree url-text="修改" v-model="isAgree" url="/abc" />
      <div class="weui-btn-area">
        <div v-show="isAgree" class="page__bd page__bd_spacing">
          <button class="weui-btn" type="primary" @click="collectionModify">修改</button>
        </div>
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
      collectionInfo() {
        return this.$store.state.homepageInfo.artwork;
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
        collectionImages: {
          collection1: [],
          collection2: [],
          collection3: [],
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
      chooseCollection1() {
        wx.chooseImage({
          sizeType: ['original'],
          sourceType: ['album'],
          count: this.max,
          success: (res) => {
            this.collectionImages.collection1 = this.collectionImages.collection1.concat(res.tempFiles);
          },
        });
      },
      chooseCollection2() {
        wx.chooseImage({
          sizeType: ['original'],
          sourceType: ['album'],
          count: this.max,
          success: (res) => {
            this.collectionImages.collection2 = this.collectionImages.collection2.concat(res.tempFiles);
          },
        });
      },
      chooseCollection3() {
        wx.chooseImage({
          sizeType: ['original'],
          sourceType: ['album'],
          count: this.max,
          success: (res) => {
            this.collectionImages.collection3 = this.collectionImages.collection3.concat(res.tempFiles);
          },
        });
      },
      collectionModify() {
        // 下面时上传表单
        this.$flyio
          .post("http://127.0.0.1:3000/homepages/weapp/collectionmodify", {
            collection1Name: this.collectionInfo.collection1Name,
            collection1Url: this.collectionInfo.collection1Url,
            collection2Name: this.collectionInfo.collection2Name,
            collection2Url: this.collectionInfo.collection2Url,
            collection3Name: this.collectionInfo.collection3Name,
            collection3Url: this.collectionInfo.collection3Url,
            title: this.collectionInfo.title,
            text: this.collectionInfo.text
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
        console.log(this.collectionInfo);
        console.log(this.collectionImages);
        var collectionImages = this.collectionImages;
        var arr = [];
        // 剔除空值的对象
        Object.keys(collectionImages).forEach(key => {
          if (collectionImages[key][0]) {
            arr.push(key);
          }
        });

        // 新建一个promise数组,当非空时才能上传图片
        if (arr[0]) {
          var promiseArr = arr.map(key => {
            // return sliderImages[key][0];
            return new Promise((resolve, reject) => {
              wx.uploadFile({
                url: 'http://127.0.0.1:3000/files/weapp/uploadcollection',
                filePath: collectionImages[key][0].path,
                name: 'collection',
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
