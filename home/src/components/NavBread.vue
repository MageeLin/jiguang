<template>
  <section id="bread">
      <!-- <ol class="breadcrumb">
        <li>
          <a href="#">主页</a>
        </li>
        <slot name="activeBread">这里填当前目录的标签</slot>
      </ol> -->
      <b-breadcrumb :items="bread"/>
  </section>
</template>
<script>
  export default {
    name: 'NavBread',
    props: ['bread'],
    data() {
      return {

      }
    }
  }
</script>
<style scoped>
  /* 面包屑导航 */

  /* #bread {
    margin-top: 80px;
  } */

  #bread .breadcrumb {
    background: #FFF;
    background: rgba(256, 256, 256, 0);
  }
  #bread .breadcrumb .breadcrumb-item a {
    color: #66cccc;
  }

  /* 面包屑导航 */
</style>
