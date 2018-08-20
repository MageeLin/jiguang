<template>
  <div style="margin-top: 100px;">
    <b-container>
      <nav-bread :bread="breadItems"></nav-bread>
      <section id="message-board">
        <b-row>
          <!-- 留言板 -->
          <b-col md="8">
            <b-card no-body>
              <b-tabs card>
                <b-tab title="留言板" active>
                  <!-- 留言板具体内容 -->
                  <b-card v-if="messages" v-for="items in messages" :key="items._id">
                    <b-media>
                      <b-img slot="aside" :src="'/api/files/weapp/getimage/avatar/'+ items.avatar + '.png'" width="64" alt="placeholder" />

                      <h5 class="mt-0">{{items.creatorName}}
                        <span style="float:right;">{{items.time}}</span>
                      </h5>

                      <b-btn style="float:right;margin-top:0;" @click="messageReplyedId=items._id;messageCreatorId=items.creatorId">回复</b-btn>
                      <p>
                        {{items.content}}
                      </p>

                      <b-card v-for="item in items.reply" :key="item.a">
                        <b-media>
                          <b-img slot="aside" :src="'/api/files/weapp/getimage/avatar/'+ item.avatar + '.png'" width="64" alt="placeholder" />
                          <h5 class="mt-0">{{item.name}}
                            <span style="float:right;">{{item.time}}</span>
                          </h5>
                          <p class="mb-0">
                            {{item.content}}
                          </p>

                        </b-media>
                      </b-card>
                    </b-media>
                  </b-card>

                  <!-- 留言板分页 -->
                  <b-pagination align="center" size="md" :total-rows="pagination.totalRows" v-model="pagination.currentPage" :per-page="pagination.perPage">
                  </b-pagination>
                  <b-form-textarea variant="info" id="message-textarea" v-model="messageTextarea" placeholder="请输入留言或回复" :rows="3" :max-rows="6">
                  </b-form-textarea>
                  <b-row>
                    <b-col md='6'>
                      <b-btn variant="info" class="form-control" @click="replyMessage">回复</b-btn>
                    </b-col>
                    <b-col md='6'>
                      <b-btn variant="info" class="form-control" @click="createMessage">留言</b-btn>
                    </b-col>
                  </b-row>

                </b-tab>
              </b-tabs>

            </b-card>
          </b-col>
          <!-- 成员联系方式 -->
          <b-col md="4">

            <b-card no-body>
              <b-tabs card>
                <b-tab title="联系方式" active>
                  <!-- 联系方式具体内容 -->
                  <div role="tablist">
                    <b-card no-body class="mb-1">
                      <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion1 variant="info">技术部</b-btn>
                      </b-card-header>
                      <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                          <p class="card-text">
                            <b-table hover :items="memberPhone.jsb"></b-table>
                          </p>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                      <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion2 variant="info">设计部</b-btn>
                      </b-card-header>
                      <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                          <p class="card-text">
                            <b-table hover :items="memberPhone.sjb"></b-table>
                          </p>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                      <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion3 variant="info">营销部</b-btn>
                      </b-card-header>
                      <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                          <p class="card-text">
                            <b-table hover :items="memberPhone.yxb"></b-table>
                          </p>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                      <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion4 variant="info">其他</b-btn>
                      </b-card-header>
                      <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                          <p class="card-text">
                            <b-table hover :items="memberPhone.else"></b-table>
                          </p>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                  </div>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </section>
    </b-container>
  </div>
</template>
<script>
  import NavBread from "@/components/NavBread";
  export default {
    name: "MessageBoard",
    components: {
      NavBread
    },
    watch: {
      "pagination.currentPage": function (newPage, oldPage) {
        this.getMessage();
      }
    },
    data() {
      return {
        messageTextarea: "",
        breadItems: [{
            text: "主页",
            to: "/"
          },
          {
            text: "团队留言板",
            active: true
          }
        ],
        pagination: {
          totalRows: 100,
          perPage: 5,
          currentPage: 1
        },
        memberPhone: "",
        // member: {
        //   jishubu: [
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     }
        //   ],
        //   shejibu: [
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     }
        //   ],
        //   yingxiaobu: [
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     }
        //   ],
        //   else: [
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     },
        //     {
        //       姓名: "吉光者",
        //       手机号: 17888888888
        //     }
        //   ]
        // },
        messages: "",
        messageReplyedId: "",
        messageCreatorId: ""
      };
    },
    methods: {
      getMessage() {
        this.$axios
          .post("/api/messageboards/getmessage", {
            perPage: this.pagination.perPage,
            currentPage: this.pagination.currentPage
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              console.log("getmessage时数据库出错");
            } else {
              // 首先对时间进行格式化
              for (let i = 0; i < res.result.length; i++) {
                let date = new Date(res.result[i].time);
                let time =
                  date.getFullYear() +
                  "年" +
                  (date.getMonth() + 1) +
                  "月" +
                  date.getDate() +
                  "日";
                res.result[i].time = time;
                for (let j = 0; j < res.result[i].reply.length; j++) {
                  let date = new Date(res.result[i].reply[j].time);
                  let time =
                    date.getFullYear() +
                    "年" +
                    (date.getMonth() + 1) +
                    "月" +
                    date.getDate() +
                    "日";
                  res.result[i].reply[j].time = time;
                }
              }

              this.messages = res.result;
            }
          });
      },
      createMessage() {
        // 创建消息
        this.$axios
          .post("/api/messageboards/createmessage", {
            creatorId: this.$store.state.userInfo._id,
            creatorName: this.$store.state.userInfo.name,
            avatar: this.$store.state.userInfo.avatar,
            content: this.messageTextarea
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              console.log("存储留言板数据库出错");
            } else {
              console.log("存储留言成功");
            }
          })
          .catch(error => {
            console.log("连接出错：" + error);
          });
      },
      replyMessage() {
        // 回复消息
        this.$axios
          .post("/api/messageboards/replymessage", {
            messageId: this.messageReplyedId,
            creatorId: this.messageCreatorId,
            name: this.$store.state.userInfo.name,
            avatar: this.$store.state.userInfo.avatar,
            content: this.messageTextarea
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              console.log("存储留言板回复数据库出错");
            } else {
              console.log("存储留言回复成功");
            }
          })
          .then(response => {
            // 重新读取一遍消息列表并将textarea清空
            this.getMessage();
            this.messageTextarea = "";
            this.promptPlus();
          })
          .catch(error => {
            console.log("连接出错：" + error);
          });
      },
      getPhone() {
        this.$axios
          .post("/api/users/getphone", {})
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              console.log("读取联系方式数据库出错");
            } else {
              this.memberPhone = res.result;
            }
          })
          .catch(error => {
            console.log("连接出错：" + error);
          });
      },
      promptPlus() {
        // 给提醒数加一
        this.$axios
          .post("/api/users/promptplus", {
            creatorId: this.messageCreatorId
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              console.log("prompt+1数据库出错");
            } else {
              console.log('prompt+1成功');
            }
          })
          .catch(error => {
            console.log("连接出错：" + error);
          });
      },
      promptClear() {
        // console.log(this.$store.state.userInfo.name);
        // console.log(this.pagination);
        // 当进入留言板界面后清空提醒数
        this.$axios
          .post("/api/users/promptclear", {})
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              console.log("prompt清空数据库出错");
            } else {
              console.log('prompt清空成功');
            }
          })
          .catch(error => {
            console.log("连接出错：" + error);
          });
      }
    },
    created() {
      this.getMessage();
      this.getPhone();
      this.promptClear();
    },
    beforeRouteLeave(to, from, next) {
      // 利用组件内的导航守卫，当组件离开时清空prompt
      // this.promptClear();
      next();
    }
  };

</script>
<style>
  /* 留言板样式 */

  #message-board .well button {
    color: #66cccc;
    margin-top: 10%;
    background-color: #ffffff;
    border-color: #66cccc;
    font-weight: bold;
    border-width: 2px;
  }

  #message-board .well button:focus,
  #message-board .well button:hover {
    background-color: #66cccc;
    border-color: #66cccc;
    color: #ffffff;
  }

  /* #message-board .well {
    color: #ffffff;
    font-weight: bold;
    background-color: #66CCCC;
    border-width: 2px;
    box-shadow: 0 0 20px #66CCCC;
} */

  #message-board .card {
    border-width: 2px;
    border-color: #66cccc;
    margin-bottom: 20px;
  }

  #message-board .card-header {
    border-bottom-width: 1px;
    border-bottom-color: #66cccc;
  }

  #message-board .card-header .nav-link {
    border-color: #66cccc #66cccc #fff;
  }

  /* 分页 start */

  #message-board #pagination {
    text-align: center;
  }

  #message-board .pagination .page-link {
    border-color: #66cccc;
    color: #66cccc;
  }

  #message-board .pagination a:hover {
    background-color: #66cccc;
    color: #ffffff;
  }

  #message-board .pagination .active a {
    background-color: #66cccc;
    color: #ffffff;
  }

  #message-board .pagination .disabled a {
    background-color: #dddddd;
  }

  /* 分页 end */

  /* 留言textarea start */

  #message-board textarea {
    border-color: #66cccc;
    margin-top: 2%;
  }

  #message-board textarea:focus,
  #message-board textarea:hover {
    border-color: #2f8b8b;
  }

  #message-board button {
    color: #66cccc;
    margin-top: 8%;
    background-color: #ffffff;
    border-color: #66cccc;
    font-weight: bold;
    border-width: 2px;
  }

  #message-board button:focus,
  #message-board button:hover {
    background-color: #66cccc;
    border-color: #66cccc;
    color: #ffffff;
  }

  /* 留言textarea end */

  /* #message-board .well-reply {
    background-color: #66CCCC;
    border-width: 2px;
} */

  #message-board img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  /* 留言板样式 */

</style>
