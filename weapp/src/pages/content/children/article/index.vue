<template>
  <div class="page">
    <!-- <template is="topTip" data="{{showMsg: showTopTips, msg: topTipMsg}}" /> -->
    <div class="page__bd sbox">
      <div class="weui-cells__title">文章编辑</div>
      <div class="weui-cells weui-cells_after-title">
        <mp-picker v-model="articleChoose" :range="articleArray" range-key="label">
          <button type="primary">文章选择</button>
        </mp-picker>
        <mp-field placeholder="请输入文章题目" v-model.lazy="title" type="text" label="文章题目" />
      </div>
      <form>
        <!-- diy 模块 -->
        <div class="block">
          <block v-for="(item,index) in blocks" :key="item.o">
            <div class="weui-cells weui-cells_form block__item">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <block v-if="item.type">
                    <div class="block__toolbox">
                      <div @click="handBlockUp(index)" class="icon icon-up"></div>
                      <div @click="handBlockDown(index)" class="icon icon-down"></div>
                      <div @click="handBlockClose(index)" class="icon icon-close"></div>
                    </div>
                    <block v-if="item.type=='text'">
                      <textarea class="u-textarea" v-model.lazy="blocks[index].value" placeholder="请输入..."></textarea>
                    </block>
                    <block v-if="item.type=='image'">
                      <input type="text" v-model.lazy="blocks[index].value" style="display: none;" readonly="readonly" />
                      <image :src="item.value" class="u-image" />
                    </block>
                  </block>
                  <block v-else>
                    <div class="flex padding">
                      <div class="flex__item block__item-type" :animation="item.fadeOutLeft">
                        <div class="block__item-type-text" @click="bingTypeSelect('text',index)"></div>
                      </div>
                      <div class="flex__item" :animation="item.fadeOutRight">
                        <div class="block__item-type-image" @click="bingTypeSelect('image',index)" data-type='image' :data-index="index"></div>
                      </div>
                    </div>
                  </block>
                </div>
              </div>
              <!-- lin添加的blocks -->
              <div class="weui-cell block__sidebar padding" @click="handPlus(index+1)" v-if="index==blocks.length-1 && item.type">
                <div class="weui-cell__bd">
                  <div class="icon icon-plus" :data-order="index+1"></div>
                </div>
              </div>
            </div>
          </block>
        </div>
        <div class="block__btns">
          <mp-agree url-text="提交" v-model="isAgree" url="/abc" />
          <div class="weui-btn-area">
            <div v-show="isAgree" class="page__bd page__bd_spacing">
              <button class="weui-btn" type="primary" @click="articleModify">提交</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import MpField from "mp-weui/packages/field";
  import MpAgree from "mp-weui/packages/agree";
  import MpPicker from 'mp-weui/packages/picker';
  export default {
    data() {
      return {
        isAgree: false,
        // 源文件中的变量
        form: {},
        blocks: [{
          index: 0,
          value: ""
        }],
        fadeOutLeft: "",
        fadeOutRight: "",
        articleChoose: 'article0',
        title: '',
        articleArray: [{
          value: "article0",
          label: "吉光工作室介绍"
        }, {
          value: "article1",
          label: "作品集一"
        }, {
          value: "article2",
          label: "作品集二"
        }, {
          value: "article3",
          label: "作品集三"
        }, ],

      };
    },
    methods: {
      handPlus(order) {
        // 绑定增加编辑窗
        let _order = order;
        let _blocks = this.blocks;
        // 依次+1
        _blocks.map(function (n, i) {
          if (n.index >= _order) {
            _blocks[i].index += 1;
          }
        });
        _blocks.push({
          index: _order,
          value: ""
        });
        _blocks.sort(function (a, b) {
          return a.index - b.index;
        });
        this.blocks = _blocks;
      },
      bingTypeSelect(type, index) {
        // 选择输入文本或者图片类型
        let blocks = this.blocks;

        if (type == "image") {
          // 添加图片选择
          blocks[index].type = type;
          let self = this;
          wx.chooseImage({
            sizeType: ["original"],
            sourceType: ["album"],
            success: function (res) {
              var tempFilePaths = res.tempFilePaths;

              blocks[index].value = tempFilePaths[0];
              blocks.push({
                text: "必须push再pop一个才能正常同步数据"
              });
              blocks.pop();
              self.blocks = blocks;
            }
          });
        } else {
          // 添加文本框
          blocks[index].fadeOutLeft = this.fadeOutLeft;
          blocks[index].fadeOutRight = this.fadeOutRight;
          blocks.push({
            text: "必须push再pop一个才能正常同步数据"
          });
          blocks.pop();
          this.blocks = blocks;

          setTimeout(() => {
            // 给动画250ms的反应时间，反应完成后再添加文本框
            blocks[index].type = "text";
            blocks.push({
              text: "必须push再pop一个才能正常同步数据"
            });
            blocks.pop();
            this.blocks = blocks;
          }, 250);
        }
      },
      handBlockUp(index) {
        let _blocks = this.blocks;
        // 依次+1
        if (index == 0) return;

        _blocks[index - 1].index += 1;
        _blocks[index].index -= 1;
        _blocks.sort(function (a, b) {
          return a.index - b.index;
        });
        _blocks.push({
          text: "必须push再pop一个才能正常同步数据"
        });
        _blocks.pop();
        this.blocks = _blocks;
      },
      handBlockDown(index) {
        let _blocks = this.blocks;
        // 依次减一
        if (index == _blocks.length - 1) return;

        _blocks[index + 1].index -= 1;
        _blocks[index].index += 1;
        _blocks.sort(function (a, b) {
          return a.index - b.index;
        });
        _blocks.push({
          text: "必须push再pop一个才能正常同步数据"
        });
        _blocks.pop();
        this.blocks = _blocks;
      },
      handBlockClose(index) {
        // let index = e.target.dataset.index;
        // 删除段落
        let _blocks = this.blocks;
        let self = this;
        if (index == 0 && _blocks.length == 1) return;

        wx.showModal({
          title: "确定要删除此段落吗？",
          success: function (res) {
            if (res.confirm) {
              _blocks.splice(index, 1);

              // 更新排序
              _blocks.map(function (n, i) {
                n.index = i;
              });
              _blocks.push({
                text: "必须push再pop一个才能正常同步数据"
              });
              _blocks.pop();
              self.blocks = _blocks;
            }
          }
        });
      },
      articleModify() {
        if (!this.blocks.type) {
          wx.showToast({
            title: '写点内容再上传吧!',
            icon: "none"
          });
        } else {


          // 下面时上传数据库
          this.$flyio
            .post("http://127.0.0.1:3000/articles/weapp/modifyarticle", {
              url: this.articleChoose,
              title: this.title,
              content: this.blocks
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

            }).catch(error => {
              console.log(error.status, error.message);
            });




          // 上传图片
          let url = this.articleChoose;
          let _blocks = this.blocks;
          // 过滤掉无用的text类型
          let imagesArr = _blocks.filter((item) => {
            return item.type == 'image';
          });
          // console.log(imagesArr);
          let promiseArr = imagesArr.map((imageObj) => {
            return new Promise((resolve, reject) => {
              wx.uploadFile({
                url: 'http://127.0.0.1:3000/files/weapp/uploadarticleimage',
                filePath: imageObj.value,
                name: 'articleImage',
                formData: {
                  'url': url,
                  'imageOrder': imageObj.index
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

            console.log('成功');
          }).catch(err => {
            console.log(err);
          });
        }
      }
    },
    computed: {},
    onShow() {
      // 设置个动画准备给每一个用
      var fadeOutLeft = wx.createAnimation({
        duration: 200,
        timingFunction: "ease"
      });
      fadeOutLeft.translate3d(-360, 0, 0).step();
      this.fadeOutLeft = fadeOutLeft;

      var fadeOutRight = wx.createAnimation({
        duration: 200,
        timingFunction: "ease"
      });
      fadeOutRight.translate3d(360, 0, 0).step();
      this.fadeOutRight = fadeOutRight;
    },
    components: {
      MpField,
      MpAgree,
      MpPicker,
    }
  };

</script>

<style lang="less" scoped>
  /* pages/report/content.wxss */

  .icon {
    width: 60rpx;
    height: 60rpx;
  }

  .icon-close {
    background-image: url(../../../../../static/article-icon/icon-close.png);
    background-size: 100%;
  }

  .icon-up {
    background-image: url(../../../../../static/article-icon/icon-up.png);
    background-size: 100%;
  }

  .icon-down {
    background-image: url(../../../../../static/article-icon/icon-down.png);
    background-size: 100%;
  }

  .icon-plus {
    background-image: url(../../../../../static/article-icon/icon-plus.png);
    background-size: 100%;
  }

  .block__item-type-text {
    width: 160rpx;
    height: 160rpx;
    margin: 0 auto;
    background-image: url(../../../../../static/article-icon/icon-text.png);
    background-size: 100%;
  }

  .block__item-type-image {
    width: 160rpx;
    height: 160rpx;
    margin: 0 auto;
    background-image: url(../../../../../static/article-icon/icon-image.png);
    background-size: 100%;
  }

  .block {
    position: relative;
    margin-top: 1.17647059em;
  }

  .block .block__item {
    margin-top: 0;
  }

  .block__toolbox {
    position: absolute;
    right: 0;
    top: 5px;
    z-index: 100;
  }

  .block__toolbox .icon {
    display: inline-block;
    margin-right: 5px;
  }

  .block__item>.weui-cell {
    padding: 0;
    /* lin加的 */
    position: relative;
  }

  .block__item .weui-cell:before {
    left: 0;
  }

  .block__sidebar .icon {
    margin: 0 auto;
  }

  .padding {
    padding: 15px 0 !important;
  }

  .u-textarea {
    height: 100px;
    width: 98%;
    display: block;
    padding: 25px 2% 15px;
    z-index: 1;
  }

  .block__btns {
    margin-top: 20px;
    margin-bottom: 80rpx;
  }

  .u-image {
    width: 100%;
    display: block;
  }

  .weui-panel__bd {
    padding: 15px 10px;
  }

  button[type="primary"] {
    background-color: #e9c46a;
  }

  button[type="primary"].button-hover {
    background-color: #f4a261;
  }

</style>
