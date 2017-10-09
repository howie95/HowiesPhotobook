<template>
    <div>
        <main-header v-bind:isTop="isTop"></main-header>
        <main>
            <section class="photos" v-for="item in photoList" :key="item.id"><span class="phototitle">{{ item.title }}</span><span class="photodate">{{ item.date }}</span><img :src="/static/+item.path" :alt="item.title"><img src="/static/shadow_m.png" alt="shadow"></section>
        </main>
        <main-footer v-bind:isTop="isTop"></main-footer>
    </div>
</template>
<script>
import mainHeader from '@/components/header'
import mainFooter from '@/components/footer'
export default {
    name:'photo',
    data(){
        return {
            isTop:true,
            photoList:[]
        }
    },
    methods:{
      move(){
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          var offsetTop = document.querySelector('main').offsetTop
          if (scrollTop > offsetTop){
              this.isTop=false
          }else{
              this.isTop=true
          }
        }
    },
    mounted: function(){
        window.addEventListener('scroll', this.move)
        this.$http.get('/api/photoList').then(
        response => {
            this.photoList = response.data.reverse()
            },
        response => console.log(response)
      )
    },
    components:{
        mainHeader,
        mainFooter
    }
}
</script>
