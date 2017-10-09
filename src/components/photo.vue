<template>
    <div>
        <main-header :isTop="isTop" :admin="admin"></main-header>
        <main>
            <section class="photos" v-for="item in photoList" :key="item._id"><span class="phototitle">{{ item.title }}</span><span class="photodate">{{ item.date }}</span><img :src="/static/+item.path" :alt="item.title"><img src="/static/shadow_m.png" alt="shadow"></section>
            <div v-if="noMore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
            加载中</div>
            <div v-if="!noMore">已经没有更多照片了</div>
        </main>
        <main-footer :isTop="isTop" :admin="admin"></main-footer>
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
            photoList:[],
            page:1,
            pages:6,
            busy:true,
            noMore:true,
            admin:false
        }
    },
    methods:{
        move(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let offsetTop = document.querySelector('main').offsetTop
            if (scrollTop > offsetTop){
                this.isTop=false
            }else{
                this.isTop=true
            }
            },
        getPhotos(e){
            let param = {
                page:this.page,
                pages:this.pages
            }
            this.$http.get('/api/photoList',{params:param}).then(
            response => {
                if(e){
                    this.photoList = this.photoList.concat(response.data)
                    console.log(response.data.length)
                    if(response.data.length==0||response.data.length<6){
                        this.busy=true
                        this.noMore=false
                    }else{
                        this.busy=false
                    }
                }else{
                    this.photoList = response.data
                    this.page = 1
                    setTimeout(()=>{this.busy = false}, 1000)
                }
            },
            response => console.log(response)
            )
        },
        loadMore(){
            this.page++
            setTimeout(()=>{
                this.getPhotos(true)
            },500)
        }
    },
    mounted: function(){
        window.addEventListener('scroll', this.move)
        this.getPhotos()
        if (!document.cookie.match("admin")){
            this.admin = false
        }else{
            this.admin = true
        }
    },
    components:{
        mainHeader,
        mainFooter
    }
}
</script>
