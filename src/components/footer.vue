<template>
    <footer>
        <transition name="fade">
        <div class="foot-bts" v-if="!isTop">
            <ul>
                <li v-if="admin"><router-link v-if="admin" to="/upload"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.5 26.3"><path d="M22.9,16.9H2.6c-1.4,0-2.6-1.2-2.6-2.6v-2.4c0-1.4,1.2-2.6,2.6-2.6h20.3c1.4,0,2.6,1.2,2.6,2.6v2.4C25.5,15.7,24.3,16.9,22.9,16.9z"/><path d="M8.9,23.3V3c0-1.4,1.2-2.6,2.6-2.6h2.4c1.4,0,2.6,1.2,2.6,2.6v20.3c0,1.4-1.2,2.6-2.6,2.6h-2.4C10.1,25.9,8.9,24.7,8.9,23.3z"/></svg></router-link></li>
                <li><svg class="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24.5"><rect width="25" height="10.5" rx="2.19" ry="2.19"/><rect y="14" width="25" height="10.5" rx="2.19" ry="2.19"/></svg></li>
                <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.5 24.5"><rect width="10.5" height="10.5" rx="2.19" ry="2.19"/><rect x="15" width="10.5" height="10.5" rx="2.19" ry="2.19"/><rect y="14" width="10.5" height="10.5" rx="2.19" ry="2.19"/><rect x="15" y="14" width="10.5" height="10.5" rx="2.19" ry="2.19"/></svg></li>
                <li @click="toTop"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.21 24.5"><path d="M16,13.72,8.1,27.39A1.72,1.72,0,0,1,5.74,28l-2-1.14a1.74,1.74,0,0,1-.64-2.36l8.68-15H5.23A1.72,1.72,0,0,1,3.5,7.77V5.48A1.72,1.72,0,0,1,5.23,3.75H26.77A1.72,1.72,0,0,1,28.5,5.48V7.77A1.72,1.72,0,0,1,26.77,9.5H20.2l8.68,15a1.74,1.74,0,0,1-.64,2.36l-2,1.14a1.72,1.72,0,0,1-2.36-.63Z" transform="translate(-2.89 -3.75)"/></svg></li>
            </ul>
        </div>
        </transition>
    </footer>
</template>
<script>
export default {
  name:'footer',
  methods:{
      toTop(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
      }
  },
  props: ['isTop','admin'],
  data(){
      return{
      }
  }
}
</script>
