<template>
    <main>
        <section class="photos" v-for="item in photoList" :key="item.id"><span class="phototitle">{{ item.title }}</span><span class="photodate">{{ item.date }}</span><img :src="/static/+item.path" :alt="item.title"><img src="/static/shadow_m.png" alt="shadow"></section>
    </main>
</template>
<script>
export default {
    name:'photo',
    data(){
        return {
            photoList:[]
        }
    },
    mounted: function(){
        this.$http.get('/api/photoList').then(
        response => this.photoList = response.data.reverse(),
        response => console.log(response)
      )
    },
}
</script>
