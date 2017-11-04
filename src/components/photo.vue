<template>
    <div>
        <main-header :isTop="isTop" :admin="admin" @labelcheck="labelcheck"></main-header>
        <transition name="fade">
        <div v-if="mask" class="mask" @click="closeMask">
            <div class="showphoto">
                <img :src="/static/+showPic">
            </div>
        </div>
        </transition>
        <transition-group :class="{ three: isThree }" name="list" tag="main">
            <section class="photos" v-for="item in photoList" :key="item._id">
                <span :style="{color: item.color}" class="phototitle">{{ item.title }}</span>
                <span class="photodate">{{ item.date }}</span>
                <img v-lazy="/static/+item.path" :alt="item.title" @click="showphoto(item.path)">
                <div class="edit" v-if="admin">
                    <div class="bground" :class="{'delete':isDel==item._id,'delmsg':isDeled==item._id}">
                        <span>
                            <a @click="picEdit(item._id)">编辑</a><a @click="isDel=item._id">删除</a>
                        </span>
                        <span>
                            <p v-if="!isThree">确定删除吗？</p><a @click="delPic(item._id)">删除</a><a @click="isDel=0">取消</a>
                        </span>
                        <span>
                            <p>{{delMsg}}</p>
                        </span>
                    </div>
                </div>
            </section>
        </transition-group>
        <div class="loading">
            <div v-if="!noMore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231.43 201.67">
                    <path d="M65.58,90C76.69,74.62,88.16,58.3,90.46,39.44c.75-6.22.38-12.89-3-18.18s-10.35-8.6-16.14-6.19c-5.19,2.16-7.88,8-8.85,13.53-1.51,8.37.2,18,6.89,23.28,4,3.17,9.33,4.31,14.45,4.75a66.18,66.18,0,0,0,31.6-5.11C131.91,44.44,144.7,31.05,157,18L143.07,48c-7,14.94-13.92,29.9-19.88,45.26-6.13,15.77-11.15,31.9-18,47.3A217.86,217.86,0,0,1,74.08,190.7c-5.83,7.05-12.26,13.86-20.33,18.19s-18.05,5.9-26.43,2.21c-7.21-3.17-12.34-9.71-16.48-16.42" transform="translate(-10.84 -14.27)"/>
                    <path d="M105.52,139.84A185.06,185.06,0,0,0,229.13,63.94C234,57,238.42,49.65,241,41.57c1-3.16,1.7-6.53,1.07-9.78s-2.86-6.38-6.06-7.23a10.81,10.81,0,0,0-7,.95c-9.83,4.28-18.85,13-23.86,22.49-15.18,23.65-24.5,49.52-36.07,74.71s-19.57,52.83-17,80.43c.36,4,1.18,8.32,4.38,10.7a11.82,11.82,0,0,0,6.13,2c6.46.56,12.87-1.34,19-3.33a512.71,512.71,0,0,0,57-22.29" transform="translate(-10.84 -14.27)"/>
                </svg>
                <p>加载中...</p>
            </div>
            <div v-if="noMore"><p> - 已经没有更多照片了 - </p></div>
        </div>
        <main-footer :isTop="isTop" :admin="admin" @threecheck="threecheck"></main-footer>
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
            label:'',
            isDel:'',
            isDeled:'',
            secDel:'',
            delMsg:'',
            mask:false,
            showPic:'',
            isThree:false
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
            },1000)
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
        },
        //删除照片
        isdelPic(e){
            if(e){
                this.isDel=e
            }else{
                this.isDel=""
            }
        },
        delPic(e){
            let obj = {_id:e}
            this.isDeled=e
            this.delMsg = "删除成功"
            this.$http.post('/api/delPic',obj).then(
                response => {
                    this.delMsg = "删除成功"
                    setTimeout(()=>{this.secDel = e}, 2000)
                },
                response => {
                    this.delmsg = "删除失败"
                    setTimeout(()=>{this.isDeled=""}, 2000)
                }
            )
        },
        //查看大图
        showphoto(e){
            this.showPic=e
            this.mask=true
            document.body.style.overflow='hidden';
            document.body.style.height='100%';
        },
        closeMask(){
            this.mask=false
            document.body.style.overflow='auto';
            document.body.style.height='auto';
        },
        //切换三栏
        threecheck(e){
            if(e=='one'){
                this.isThree=false
            }else{
                this.isThree=true
            }
        }
    },
    mounted: function(){
        window.addEventListener('scroll', this.move)
        this.getPhotos()
        if (!document.cookie.match("admin")){
            this.admin = false
        }else{
            this.$http.post('/api/checkLog').then(
                response => {
                    let res = response.data
                    if(res.status=="0"){
                        this.admin = true
                    }else if(res.status=="2"){
                        this.admin = false
                    }
                },
                response => {return}
            )}
    },
    components:{
        mainHeader,
        mainFooter
    }
}
</script>
