<template>
    <div>
        <main-header :isTop="isTop" :admin="admin" @labelcheck="labelcheck"></main-header>
        <transition-group name="list" tag="main">
            <section class="photos" v-for="item in photoList" :key="item._id">
                <span :style="{color: item.color}" class="phototitle">{{ item.title }}</span>
                <span class="photodate">{{ item.date }}</span>
                <img v-lazy="/static/+item.path" :alt="item.title">
                <div v-if="admin" class="edit">
                    <span>
                        <a @click="picEdit(item._id)">编辑</a><a href="javascript:;">删除</a>
                    </span>
                </div>
                <img src="/static/shadow_m.png" alt="shadow">
            </section>
        </transition-group>
        <div v-if="!noMore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
            加载中</div>
        <div v-if="noMore">已经没有更多照片了</div>
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
            noMore:false,
            admin:false,
            label:''
        }
    },
    methods:{
        //顶部样式变化
        move(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let offsetTop = document.querySelector('main').offsetTop
            if (scrollTop > offsetTop){
                this.isTop=false
            }else{
                this.isTop=true
            }
            },
        //读取图片
        getPhotos(e){
            let param = {
                page:this.page,
                pages:this.pages,
                labels:this.label,
                picId:""
            }
            this.$http.get('/api/getPhotos',{params:param}).then(
            response => {
                if(e){
                    this.photoList = this.photoList.concat(response.data)
                    if(response.data.length==0||response.data.length<6){
                        this.busy=true
                        this.noMore=true
                    }else{
                        setTimeout(()=>{this.busy = false}, 1000)
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
        //滚动加载图片
        loadMore(){
            this.busy=true
            this.page++
            setTimeout(()=>{
                this.getPhotos(true)
            },500)
        },
        //标签筛选
        labelcheck(e){
            this.busy=true
            this.page=1
            this.noMore=false
            this.label=e
            this.getPhotos()
        },
        //修改照片信息
        picEdit(e){
            this.$router.push('/upload/' + e)
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
