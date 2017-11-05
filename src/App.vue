<template>
  <div>
    <main-header v-if="ontop"></main-header>
    <router-view></router-view>
  </div>
</template>

<script>
import event from './components/event.js'
import mainHeader from '@/components/header'
  export default {
    name: 'app',
    data(){
      return{
        ontop:false,
      }
    },
    mounted(){
      event.$on('show',()=>{
          this.ontop = true
      })
      event.$on('hide',()=>{
          this.ontop = false
      })
    },
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
    font-family: Arial,PingFang SC,Microsoft JhengHei,WenQuanYi Micro Hei,sans-serif;
  }
</style>
