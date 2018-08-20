<template>
  <div style="margin-top: 100px;">
    <b-container v-if="articleInfo">
      <nav-bread :bread="breadItems"></nav-bread>
      <section id="article">
        <div class="content" v-html="articleHtml">

        </div>
      </section>
    </b-container>
  </div>
</template>
<script>
  import NavBread from '@/components/NavBread'
  export default {
    name: 'Article',
    components: {
      NavBread
    },
    computed: {
      breadItems() {
        return [{
          text: '主页',
          to: '/'
        }, {
          text: this.articleInfo.title,
          active: true
        }]
      },
      articleHtml() {
        let html = '';
        let content = this.articleInfo.content;
        for (let i = 0; i < content.length; i++) {
          let one = ''
          if (content[i].type == 'text') {
            one = '<p>' + content[i].value + '</p>';
          } else if (content[i].type == 'image') {
            one = '<img class="img-fluid  text-center" src="/api/files/weapp/getimage/article/' + content[i].value +
              '" alt="' + content[i].value + '" >';
          }
          html += one;
        }
        return html
      }
    },
    data() {
      return {
        articleInfo: '',
        articleContent: `
            <div class="title">
            <h1>小学生游戏氪金超500便提醒家长，腾讯这功能我点赞</h1>
            </div>
            <div class="content">
            <p>腾讯今天宣布，他们在经过一年多的调研与测试后，将会在近期推出“未成年人游戏消费提醒”服务，会主动对旗下游戏中疑似未成年人消费的行为进行主动介入，一旦疑似未成年人消费总额达到了500元人民币及以上，就会主动联系支付账户的所有人，比如家长。</p>
            <img class="img-fluid text-center" src="../static/images/content.jpg" alt="小学生游戏氪金超500便提醒家长，腾讯这功能我点赞">
            <p>腾讯今天宣布，他们在经过一年多的调研与测试后，将会在近期推出“未成年人游戏消费提醒”服务，会主动对旗下游戏中疑似未成年人消费的行为进行主动介入，一旦疑似未成年人消费总额达到了500元人民币及以上，就会主动联系支付账户的所有人，比如家长。</p>
            <p>腾讯“未成年人游戏消费提醒”官方说明如下：</p>
            <p>经过一年的多轮调研与测试后，我们于近日推出一项“未成年人游戏消费提醒”的新服务，服务目前已进入试运行阶段。</p>
            <p>单日累计消费超500元，将对疑似未成年人消费进行提醒确认</p>
            <p>我们对于旗下游戏业务中疑似未成年人的高额消费，将尝试主动介入，并提醒用户关注可能存在的未成年人非理性消费的情况。</p>
            <p>腾讯专门组建了一支超过200人的专属客服团队。当一个QQ登陆的帐号，在腾讯旗下游戏的单日累计消费达500元或以上，对于其中疑似未成年人消费的，客服团队将尝试主动联系相关支付账户的所有人进行提醒和确认。</p>
            <p>覆盖《王者荣耀》、《英雄联盟》、《QQ飞车》手游等多款产品。</p>
            <p>这个服务现已覆盖腾讯旗下《王者荣耀》、《英雄联盟》、《穿越火线：枪战王者》、《QQ飞车》手游、《火影忍者》手游、《奇迹暖暖》、《地下城与勇士》等游戏产品。</p>
            <p>后续还将不断接入更多其他游戏，并计划支持微信登陆帐号的消费提醒。</p>
            <p>未成年人监管热线开通，产品优化期待你的参与</p>
            <p>针对未成年人在游戏中的不理性消费问题，2017年中以来，我们先后向30万用户征求意见与反馈。基于这些调研结果，形成初步的服务方案。</p>
            <p>未来，除了更多游戏产品的接入，我们还将持续完善面向支付帐户所有人的触达渠道，以帮助广大家长对孩子的游戏消费实现更好的监督、引导和管理。</p>
            <p>服务目前尚处于试运行阶段。由于迄今为止，国内外尚未有过类似此项服务，我们也在不断探索和积极尝试，并衷心欢迎大家向我们提出宝贵的意见及建议。</p>
            <p>客服团队也专门设立了未成年监管热线0755-83761852，为大家提供相关的内容咨询。</p>
            <p>守护未成年人健康上网是腾讯的一项长期事业。我们将会不断完善服务，为引导未成年人适度娱乐和理性消费，守护未成年人健康成长而持续努力。</p>
            <p>消费提醒机制相关疑问解答</p>
            <p>Q：消费提醒服务需要我提供什么信息？</p>
            <p>A：该服务由腾讯公司免费、主动提供。腾讯公司不会以任何方式向您索要任何账号密码、支付密码，或要求支付费用。</p>
            <p>Q：腾讯如何定义高额消费？</p>
            <p>A：不同地区、不同家庭对高额消费定义不同。现阶段试行的通知标准为：用户在消费提醒服务已接入的游戏产品中，单日累计消费500元以上。</p>
            <p>Q：为什么我的微信游戏账号消费超过500元，没有收到提示？</p>
            <p>A：我们目前仅支持QQ帐号中疑似未成年人消费提醒服务，我们将在后续服务优化中，尝试支持微信游戏帐号消费提醒。</p>
            <p>总结：</p>
            <p>网上屡屡爆出熊孩子偷玩游戏，疯狂充值的不理性消费行为，有的甚至充值几万或几十万，家长苦不堪言，无法防范！作为游戏大厂的腾讯，推出“未成年人游戏消费提醒”新服务，终于是为保护未成年人与家长的辛苦钱向前迈了一步，值得鼓励！</p>



            </div>`
      }
    },
    methods: {
      getArticleInfo() {
        // console.log(this.$route.query.articleUrl);
        this.$axios.post("/api/articles/getarticleinfo", {
            url: this.$route.query.articleUrl
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              console.log("数据库出错");
            } else {
              this.$nextTick(() => {
                this.articleInfo = res.result;
              });
            }
          })
          .catch(error => {
            console.log("连接出错：" + error);
          });
      }
    },
    mounted() {
      this.getArticleInfo();
    }
  }

</script>
<style>
  /* 正文样式 */

  #article .title {
    text-align: center;
    margin-bottom: 40px;
  }

  #article .content {
    text-align: left;
    text-indent: 2em;
    padding-bottom: 30px;
  }

  #article .content p {
    line-height: 2em;
  }

  #article .content img {
    display: block;
    margin: 30px auto;
    border-radius: 2%;
    width: 40%;
  }

  /* 正文样式 */

</style>
