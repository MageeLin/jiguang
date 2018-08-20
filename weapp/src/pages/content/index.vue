<template>
  <div class="page">
    <div class="weui-cells__title">主页内容</div>
    <div class="weui-cells weui-cells_after-title">
      <!-- <mp-cell-group title="带跳转的列表项"> -->
      <mp-cell content="轮播图区域" href="./children/welcome/main" icon-src="../../static/tabbar-icon/edit.png" />
      <mp-cell content="作品集区域" href="./children/collection/main" icon-src="../../static/tabbar-icon/edit.png" />
      <mp-cell content="成员区域" href="./children/member/main" icon-src="../../static/tabbar-icon/edit.png" />
      <mp-cell content="联系我们区域" href="./children/contact/main" icon-src="../../static/tabbar-icon/edit.png" />
      <mp-cell content="合作区域" href="./children/cooperation/main" icon-src="../../static/tabbar-icon/edit.png" />
      <mp-cell content="页脚区域" href="./children/footer/main" icon-src="../../static/tabbar-icon/edit.png" />
      <!-- </mp-cell-group> -->
    </div>
    <div class="weui-cells__tips">修改文字内容时，若想换行，则插入自封闭br标签</div>
    <div class="weui-cells__title">文章填写</div>
    <div class="weui-cells weui-cells_after-title">

      <mp-cell content="文章填写" href="./children/article/main" icon-src="../../static/tabbar-icon/edit.png" />

    </div>

  </div>
</template>

<script>
  // Use Vuex
  // import store from '../../store'
  // import MpCellGroup from 'mp-weui/packages/cell-group';
  import MpCell from 'mp-weui/packages/cell';
  export default {
    computed: {

    },
    methods: {

    },
    components: {
      MpCell,
      // MpCellGroup
    },
    mounted() {
      this.$store.dispatch('getHomepageInfo');
      this.$store.dispatch('getFooterInfo');
    }
  }

</script>

<style>


</style>
