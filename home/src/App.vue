<template>
  <div id="app">
    <nav-head></nav-head>
    <router-view></router-view>
    <nav-foot></nav-foot>
  </div>
</template>

<script>
import NavHead from '@/components/NavHead'
import NavFoot from '@/components/NavFoot'
export default {
  name: 'app',
  components: {
    NavHead,
    NavFoot
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
