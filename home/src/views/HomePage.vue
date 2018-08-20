<template>
  <div id="homepage-body" v-if="homepageContent">
    <section id="welcome" v-scrollWatch="{name:'welcome',offset:75,callback:spyDomChange}">
      <b-carousel id="welcomeCarousel" controls indicators background="#ababab" :interval=4000>


        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid w-100" width="1024" height="480" :src="'/api/files/weapp/getimage/slider/'+homepageContent.welcome.slider1Src"
            alt="图片1">
          <h1 v-html="homepageContent.welcome.slider1Title"></h1>
          <p v-html="homepageContent.welcome.slider1Text"></p>
        </b-carousel-slide>
        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid w-100" width="1024" height="480" :src="'/api/files/weapp/getimage/slider/'+homepageContent.welcome.slider2Src"
            alt="图片2">
          <h1 v-html="homepageContent.welcome.slider2Title"></h1>
          <p v-html="homepageContent.welcome.slider2Text"></p>
        </b-carousel-slide>
        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid w-100" width="1024" height="480" :src="'/api/files/weapp/getimage/slider/'+homepageContent.welcome.slider3Src"
            alt="图片3">
          <h1 v-html="homepageContent.welcome.slider3Title"></h1>
          <p v-html="homepageContent.welcome.slider3Text"></p>
        </b-carousel-slide>
        <b-carousel-slide>
          <img slot="img" class="d-block img-fluid w-100" width="1024" height="480" :src="'/api/files/weapp/getimage/slider/'+homepageContent.welcome.slider4Src"
            alt="图片4">
          <h1 v-html="homepageContent.welcome.slider4Title"></h1>
          <p v-html="homepageContent.welcome.slider4Text"></p>
        </b-carousel-slide>
      </b-carousel>
      <b-container id="welcomeContext">
        <b-row>
          <b-col md="1"></b-col>
          <b-col md="10">
            <h1 v-html="homepageContent.welcome.title"></h1>
            <p v-html="homepageContent.welcome.text"></p>
            <b-button :to="{ name: 'Article', query: { articleUrl: 'article0'}}" size="lg" variant="primary">
              了解更多
            </b-button>
          </b-col>
          <b-col md="1"></b-col>
        </b-row>
      </b-container>
    </section>
    <section id="collection" v-scrollWatch="{name:'collection',offset:75,callback:spyDomChange}">
      <b-container>
        <b-row>
          <b-col md="12">
            <h1 v-html="homepageContent.artwork.title"></h1>
            <p v-html="homepageContent.artwork.text"></p>
          </b-col>
          <b-col md="4">
            <router-link :to="{ name: 'Article', query: { articleUrl: homepageContent.artwork.collection1Url }}">
              <img :src="'/api/files/weapp/getimage/collection/'+homepageContent.artwork.collection1Src" class="img-fluid" alt="">
              <p v-html="homepageContent.artwork.collection1Name"></p>
            </router-link>
          </b-col>
          <b-col md="4">
            <router-link :to="{ name: 'Article', query: { articleUrl: homepageContent.artwork.collection2Url }}">
              <img :src="'/api/files/weapp/getimage/collection/'+homepageContent.artwork.collection2Src" class="img-fluid" alt="">
              <p v-html="homepageContent.artwork.collection2Name"></p>
            </router-link>
          </b-col>
          <b-col md="4">
            <router-link :to="{ name: 'Article', query: { articleUrl: homepageContent.artwork.collection3Url }}">
              <img :src="'/api/files/weapp/getimage/collection/'+homepageContent.artwork.collection3Src" class="img-fluid" alt="">
              <p v-html="homepageContent.artwork.collection3Name"></p>
            </router-link>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section id="member" v-scrollWatch="{name:'member',offset:75,callback:spyDomChange}">
      <div class="filter">
        <b-container>
          <b-row>
            <b-col md="4" class="member-text">
              <h1 v-html="homepageContent.member.title"></h1>
              <p v-html="homepageContent.member.text"></p>

            </b-col>
            <b-col md="8">
              <b-row>
                <b-col cols="6" sm="3">
                  <div class="head-pic">
                    <div class="filter-small head-pic-circle">
                      <p>指导教师</p>
                    </div>
                  </div>
                </b-col>
                <b-col v-for="item in homepageContent.member.personTeacher" :key="item.id" cols="6" sm="3">
                  <div class="head-pic">
                    <div class="filter-small">
                      <p>{{item.name}}</p>
                    </div>
                    <img :src="'/api/files/weapp/getimage/avatar/' + item.src + '.png'" alt="">
                  </div>
                </b-col>

              </b-row>
              <b-row>
                <b-col cols="6" sm="3">
                  <div class="head-pic">
                    <div class="filter-small head-pic-circle">
                      <p>现任成员</p>
                    </div>
                  </div>
                </b-col>
                <b-col v-for="item in personStudent" :key="item.id" cols="6" sm="3">
                  <div class="head-pic">
                    <div class="filter-small">
                      <p>{{item.name}}</p>
                    </div>
                    <img :src="'/api/files/weapp/getimage/avatar/' + item.avatar + '.png'" alt="">
                  </div>
                </b-col>

              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </section>
    <section id="contact" v-scrollWatch="{name:'contact',offset:75,callback:spyDomChange}">
      <div class="filter-contact">
        <b-container>
          <div class="contact-text">
            <h1 v-html="homepageContent.contact.title"></h1>
            <p></p>
          </div>
          <b-row>
            <b-col md="3" class="contact-icon phone-icon">
              <a :href="'tel:'+ homepageContent.contact.phone">
                <i class="fa fa-phone-square" aria-hidden="true"></i>
              </a>
            </b-col>
            <b-col md="3" class="contact-icon qq-icon">
              <a target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&uin='+homepageContent.contact.qq+'&site=qq&menu=yes'">
                <i class="fa fa-qq" aria-hidden="true"></i>
              </a>
            </b-col>
            <b-col md="3" class="contact-icon wechat-icon">
              <p>
                <i id="wechat-pop" class="fa fa-wechat"></i>
                <b-tooltip target="wechat-pop" placement="top" triggers="hover focus" :delay="{ show: 100, hide: 1000 }">
                  <img :src="'/api/files/weapp/getimage/contact/' + homepageContent.contact.wechat" />
                </b-tooltip>
              </p>
            </b-col>
            <b-col md="3" class="contact-icon weibo-icon">
              <p>
                <i id="weibo-pop" class="fa fa-weibo"></i>
                <b-tooltip target="weibo-pop" placement="top" triggers="hover focus" :delay="{ show: 100, hide: 1000 }">
                  <img :src="'/api/files/weapp/getimage/contact/' + homepageContent.contact.weibo" />
                </b-tooltip>
              </p>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </section>
    <section id="cooperation" v-scrollWatch="{name:'cooperation',offset:75,callback:spyDomChange}">
      <div class="filter-cooperation">
        <b-container>
          <b-row>
            <b-col md="6" id="cooperation-propaganda">
              <p v-html="homepageContent.cooperation.text"></p>
              <h2 v-html="homepageContent.cooperation.title"></h2>
            </b-col>
            <b-col md="6" id="cooperation-contact">
              <div>
                <p>合作或加入,请联系:</p>
                <a href="#">{{homepageContent.cooperation.name}}</a>
                <p>邮箱:</p>
                <a :href="'mailto:'+ homepageContent.cooperation.email">{{homepageContent.cooperation.email}}</a>
                <p>电话:</p>
                <a :href="'tel:' + homepageContent.cooperation.phone">{{homepageContent.cooperation.phone}}</a>
                <p>工作室:</p>
                <a href="#">{{homepageContent.cooperation.position}}</a>
              </div>
            </b-col>
            <b-col md="6" class="cooperation-form">
              <b-form role="form">
                <b-form-group>
                  <b-form-input type="text" id="cooperation-name" placeholder="姓名" />
                </b-form-group>
                <b-form-group>
                  <b-form-input type="email" id="cooperation-email" placeholder="邮箱" />
                </b-form-group>
                <b-form-group>
                  <b-form-input type="text" id="cooperation-subject" placeholder="主题" />
                </b-form-group>
              </b-form>
            </b-col>
            <b-col md="6" class="cooperation-form">
              <b-form role="form">
                <b-form-group>
                  <b-form-textarea id="cooperation-content" rows="9" placeholder="内容"></b-form-textarea>
                </b-form-group>
                <b-button variant="primary" class="form-control">快速联系</b-button>
              </b-form>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </section>
  </div>
</template>
<script>
  import scrollWatch from "vue-scrollwatch";
  export default {
    name: "HomePage",
    data() {
      return {
        homepageContent: false,
        personStudent: ""
        // homepageContent: {
        //   welcome: {
        //     slider1Src: 'slider1.jpg',
        //     slider1Title: '标题1',
        //     slider1Text: '内容1',
        //     slider2Src: 'slider2.jpg',
        //     slider2Title: '标题2',
        //     slider2Text: '内容2',
        //     slider3Src: 'slider3.jpg',
        //     slider3Title: '标题3',
        //     slider3Text: '内容3',
        //     slider4Src: 'slider4.jpg',
        //     slider4Title: '标题4',
        //     slider4Text: '内容4',
        //     title: '吉光互联网工作室',
        //     text: '只会互联网产品的工作室，</br>又想说说互联网思维'
        //   },
        //   collect: {
        //     title: '作品集',
        //     text: '我们的产品，小项目和有趣的事情们',
        //     collection1Src: '3.jpg',
        //     collection1Name: '抢票系统',
        //     collection1Url: 'qiangpiao',
        //     collection2Src: '3.jpg',
        //     collection2Name: '吉小益',
        //     collection2Url: 'jixiaoyi',
        //     collection3Src: '3.jpg',
        //     collection3Name: '抢票系统',
        //     collection3Url: 'qiangpiao',
        //   },
        //   member: {
        //     title: '我们来自各地</br>在吉大相遇',
        //     text: `我们来自吉大的各处
        //         </br>生活于此，存在于此
        //         </br>从某一天的某时某刻开始，汇聚
        //         </br>未曾厌倦微不足道的光芒
        //         </br>并梦想一起照亮更广袤的世界
        //         </br>浩淼宇宙，我们在此相遇`,
        //     personTeacher: [{
        //       name: '吉光者',
        //       src: 'touxiang.jpg'
        //     }, {
        //       name: '吉光者',
        //       src: 'touxiang.jpg'
        //     }, {
        //       name: '吉光者',
        //       src: 'touxiang.jpg'
        //     }, ],
        //     personStudent: [{
        //       name: '吉光者',
        //       src: 'touxiang.jpg'
        //     }, {
        //       name: '吉光者',
        //       src: 'touxiang.jpg'
        //     }, {
        //       name: '吉光者',
        //       src: 'touxiang.jpg'
        //     }, {
        //       name: '吉光者',
        //       src: 'touxiang.jpg'
        //     }, {
        //       name: '吉光者',
        //       src: 'touxiang.jpg'
        //     }, ]
        //   },
        //   contact: {
        //     title: '想要发现更大的世界？</br>找到我们，一起来玩吧！',
        //     phone: '17888888888',
        //     qq: '736777777',
        //     wechat: 'qrCodeWechat.png',
        //     weibo: 'qrCodeWeibo.png'
        //   },
        //   cooperation: {
        //     text: '有好的想法,没地方设计?</br>有好的创意,没技术实现?</br>有好的产品,没门路宣传?',
        //     title: '联系我们</br>一起来合作、进步、创造!',
        //     name: '吉XX',
        //     email: '73677777777@qq.com',
        //     phone: '17888888888',
        //     position: '吉林大学前卫南区田家炳201室'
        //   }

        // }
      };
    },
    methods: {
      // 滚动监听
      spyDomChange(node) {
        if (this.$store.state.activeMenu != node.name)
          this.$store.commit("changeActiveMenu", node.name);
      },
      // 获取主页内容
      getHomepageContent() {
        this.$axios("/api/homepages/get")
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              console.log("数据库出错");
            } else {
              this.$nextTick(() => {
                this.homepageContent = res.result;
              });
            }
          })
          .catch(error => {
            console.log("连接出错：" + error);
          });
      },
      getPersonStudent() {
        this.$axios("/api/users/getstudentinfo")
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              console.log("数据库出错");
            } else {
              this.$nextTick(() => {
                this.personStudent = res.result;
              });
            }
          })
          .catch(error => {
            console.log("连接出错：" + error);
          });
      }
    },
    created() {
      this.getHomepageContent();
      this.getPersonStudent();
    }
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     vm.$axios('/api/homepages/get').then((response) => {
    //       let res = response.data;
    //       if (res.status == '1') {
    //         console.log('数据库出错');
    //       } else {
    //         vm.homepageContent = res.result;
    //       }
    //     }).catch((error) => {
    //       console.log('连接出错：' + error);
    //     });
    //   })
    // }
  };

</script>
<style>
  /* 滤镜样式 */

  .filter {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    padding: 30px 0;
  }

  /* 滤镜样式 */

  /* welcome start */

  /* 字体阴影 */

  #welcome {
    margin-top: 75px;
    text-align: center;
    color: #fff;
    background-color: rgb(84, 141, 141);
  }

  #welcome #welcomeCarousel {
    text-shadow: 1px 1px 2px #333;
  }

  #welcomeContext {
    padding-top: 20px;
    padding-bottom: 40px;
  }

  #welcomeContext h1,
  #welcomeContext p {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    line-height: 200%;
  }

  #welcomeContext .btn-primary {
    color: #fff;
    font-weight: bold;
    background-color: rgb(84, 141, 141);
    border-color: #fff;
    border-radius: 22px;
    padding-left: 30px;
    padding-right: 30px;
    transition: all 0.3s;
  }

  #welcomeContext .btn-primary:hover,
  #welcomeContext .btn-primary:focus {
    color: rgb(84, 141, 141);
    font-weight: bold;
    background-color: #fff;
    border-color: #fff;
    border-radius: 22px;
    transition: all 0.3s;
  }

  /* welcome end */

  /* 社团成果样式 */

  #collection {
    padding: 50px 0;
    text-align: center;
    font-weight: bold;
  }

  #collection .col-md-12 h,
  #collection .col-md-12 p {
    line-height: 200%;
  }

  #collection img {
    margin: 0 auto;
    border-radius: 10%;
  }

  #collection a {
    color: #000;
    font-weight: bold;
    display: block;
    padding-top: 25px;
    padding-bottom: 5px;
    margin: 15px;
    border-radius: 10%;
    text-decoration: none;
    transition: all 0.3s;
  }

  #collection a:hover,
  #collection a:focus {
    background-color: #66cccc;
    color: #fff;
    box-shadow: 1px 1px 4px #66cccc;
    transition: all 0.3s;
  }

  #collection img {
    margin-bottom: 10px;
  }

  /* 社团成果样式 */

  /* 社团成员样式 */

  #member {
    background: #f5f5f5 url("./../assets/images/bg.jpg");
  }

  #member .head-pic {
    position: relative;
    height: 100px;
    margin: 20px 0 20px 30px;
  }

  #member .filter-small {
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0);
    transition: all 0.3s;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    z-index: 22;
  }

  #member .filter-small:hover,
  #member .filter-small:focus {
    background: rgba(0, 0, 0, 0.4);
    transition: all 0.3s;
  }

  #member .filter-small p {
    color: #fff;
    font-weight: bold;
    font-size: 1.2em;
    display: block;
    height: 100px;
    line-height: 100px;
    text-indent: -9999px;
  }

  #member .filter-small p:hover,
  #member .filter-small p:focus {
    text-indent: 0px;
  }

  #member img {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }

  #member .head-pic .head-pic-circle {
    background: rgba(151, 30, 30, 0.6);
  }

  #member .head-pic .head-pic-circle p {
    text-indent: 0px;
  }

  #member .member-text {
    color: #fff;
    text-align: right;
    padding-right: 50px;
  }

  #member .member-text h1 {
    margin-top: 25px;
    margin-bottom: 50px;
    line-height: 200%;
  }

  #member .member-text p {
    margin-top: 25px;
    margin-bottom: 25px;
    line-height: 300%;
  }

  /* 社团成员样式 */

  /* 联系我们样式 */

  #contact {
    background: url(./../assets/images/contactbg.jpg);
    background-attachment: fixed;
  }

  #contact .filter-contact {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.75);
    padding: 50px 0;
  }

  #contact .contact-text {
    text-align: center;
  }

  #contact .contact-text h1,
  #contact .contact-text p {
    line-height: 200%;
  }

  /* 图标设置样式 */

  #contact .contact-icon {
    text-align: center;
    font-size: 2.5em;
    margin-top: 70px;
  }

  #contact .contact-icon i {
    padding: 15px;
    border-radius: 50%;
  }

  #contact .contact-icon.qq-icon i {
    color: #66ccff;
  }

  #contact .contact-icon.qq-icon i:hover,
  #contact .contact-icon.qq-icon i:focus {
    color: #fff;
    background: #66ccff;
  }

  #contact .contact-icon.weibo-icon i {
    color: #d36262;
  }

  #contact .contact-icon.weibo-icon i:hover,
  #contact .contact-icon.weibo-icon i:focus {
    color: #fff;
    background: #d36262;
  }

  #contact .contact-icon.wechat-icon i {
    color: #3dd571;
  }

  #contact .contact-icon.wechat-icon i:hover,
  #contact .contact-icon.wechat-icon i:focus {
    color: #fff;
    background: #3dd571;
  }

  #contact .contact-icon.phone-icon i {
    color: #66cccc;
  }

  #contact .contact-icon.phone-icon i:hover,
  #contact .contact-icon.phone-icon i:focus {
    color: #fff;
    background: #66cccc;
  }

  /* tooltip弹出框 */

  .tooltip-inner {
    /* width:150px; */
    color: #113f6c;
    font-size: 1.2em;
    padding: 4px;
    background-color: #fff;
  }

  .tooltip .arrow::before {
    border-top-color: #fff;
    border-bottom-color: #fff;
  }

  .tooltip-inner img {
    width: 170px;
    height: 170px;
  }

  /* tooltip弹出框 */

  /* 图标设置样式 */

  /* 联系我们样式 */

  /* 社团合作样式 */

  #cooperation {
    background: url(./../assets/images/grey.png);
    background-repeat: repeat;
  }

  #cooperation .filter-cooperation {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.15);
    padding: 50px 30px;
  }

  /* 左上方宣传 */

  #cooperation #cooperation-propaganda {
    padding-top: 70px;
    padding-right: 90px;
    text-align: right;
    margin-bottom: 30px;
  }

  #cooperation #cooperation-propaganda p {
    line-height: 40px;
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 1.3em;
  }

  #cooperation #cooperation-propaganda h2,
  #cooperation #cooperation-propaganda h3 {
    line-height: 50px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  /* 左上方宣传 */

  /* 右上方联系方式
*/

  #cooperation #cooperation-contact {
    margin-top: 20px;
    background: rgb(84, 141, 141);
    border-radius: 3px;
    box-shadow: 0px 0px 8px rgb(2, 163, 163);
    padding: 5%;
    padding-left: 10%;
    color: #fff;
    font-size: 1.2em;
  }

  #cooperation #cooperation-contact a {
    display: inline-block;
    margin-left: 15px;
    margin-bottom: 10px;
    color: rgb(231, 226, 179);
    text-decoration: none;
  }

  #cooperation #cooperation-contact a:focus,
  #cooperation #cooperation-contact a:hover {
    color: #fff;
    font-weight: bold;
  }

  /* 右上方联系方式 */

  /* 下方表单 */

  #cooperation .cooperation-form {
    padding-top: 40px;
  }

  #cooperation .cooperation-form input {
    margin-top: 40px;
  }

  #cooperation .cooperation-form textarea {
    margin-top: 40px;
  }

  #cooperation .cooperation-form input,
  #cooperation .cooperation-form textarea {
    background: rgb(252, 252, 252);
    border-color: #66cccc;
  }

  #cooperation .cooperation-form input:focus,
  #cooperation .cooperation-form textarea:focus,
  #cooperation .cooperation-form input:hover,
  #cooperation .cooperation-form textarea:hover {
    border-color: #50a1a1;
  }

  #cooperation .cooperation-form button {
    background-color: #66cccc;
    border-color: #66cccc;
    color: #fff;
    font-weight: bold;
  }

  #cooperation .cooperation-form button:focus,
  #cooperation .cooperation-form button:hover {
    box-shadow: 0 0 15px #66cccc;
    transition: all 0.5s;
  }

  #cooperation .cooperation-form button:active {
    background-color: #fff;
    color: #66cccc;
    transition: all 0.5s;
  }

  /* 下方表单 */

  /* 社团合作样式 */

</style>
