<template>
  <footer v-if="footerContent">
    <b-container>
      <b-row>
        <b-col md="12">
          <p>
            <i class="fa fa-magnet"></i> Made by JingyiLin
          </p>
          <p>{{footerContent.copyright}}</p>
          <p>{{footerContent.recordNumber}}</p>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>
<script>
  export default {
    name: 'NavFoot',
    data() {
      return {
        footerContent: '',
        // footerContent: {
        //   copyright: 'Copyright (c) 2015-2018 吉光互联网工作室 & 吉林大学团委 版权所有',
        //   recordNumber: '备案号：吉ICP备XXXXXXXXXXX号-1 吉公网安备 XXXXXXXXXX号'
        // },
      }
    },
    methods: {
      // 滚动监听
      spyDomChange(node) {
        if (this.$store.state.activeMenu != node.name)
          this.$store.commit("changeActiveMenu", node.name);
      },
      // 获取页脚内容
      getFooterContent() {
        this.$axios('/api/footers/get').then((response) => {
          let res = response.data;
          if (res.status == '1') {
            console.log('数据库出错');
          } else {
            this.$nextTick(() => {
              this.footerContent = res.result;
            })

          }
        }).catch((error) => {
          console.log('连接出错：' + error);
        });
      }
    },
    created() {
      this.getFooterContent();
    },
  }

</script>
<style scoped>
  footer {
    background: #66CCCC;
    text-align: center;
    padding-top: 20px;
    color: #fff;
  }

</style>
