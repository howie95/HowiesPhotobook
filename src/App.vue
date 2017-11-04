<template>
  <div>
    <main-header></main-header>
    <router-view></router-view>
  </div>
</template>

<script>
import mainHeader from '@/components/header'
  export default {
    name: 'app',
    components:{mainHeader}
  }
</script>
<style>
  html {
    font-size: 62.5% !important;
  }
  body{
    margin: 0;
    font-family: Arial,PingFang SC,Microsoft JhengHei,WenQuanYi Micro Hei,sans-serif;
  }
  h1,h2,h3,p,span{
    font-weight: 400;
  }
</style>
