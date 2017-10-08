<template>
  <div class="app">
    <router-view name="mainheader"></router-view>
    <router-view></router-view>
    <router-view name="mainfooter"></router-view>
  </div>
</template>

<script>
  import '@/assets/css/titlepage.css'
  import '@/assets/css/main.css'
  export default {
    name: 'app'
  }
</script>