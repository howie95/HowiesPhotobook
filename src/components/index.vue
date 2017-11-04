<template>
    <div>
        <div id="titlearea" :style="{opacity:opacity}">
            <span>人 间 太 美 好 。</span>
        </div>
        <div id="mainarea">
            <div class="blankspace"></div>
            <div class="logoarea">
                <div class="blankspace"></div>
                <div class="logo"></div>
            </div>
            <div class="content1">
                <h1>小孩子们</h1>
                <h2>世界上最可爱而宝贵的，莫过于小孩子了，没有任何事物可以与他们的单纯无邪相提并论</h2>
                <section class="section1">
                    <img class="vertical pic1" src="../../static/kids1.jpg">
                    <img class="vertical pic2" src="../../static/kids2.jpg">
                    <div class="info">
                        <h3>可爱的侄儿</h3>
                        <p>真的是很巧，我在网上的一些朋友曾经给我起了一个外号叫做图图，而我这个侄儿的小名也叫做图图，也许这就是冥冥中的缘分吧。</p>
                    </div>
                </section>
            </div>
            <div class="content2"></div>
            <div class="content3"></div>
        </div>
    </div>
</template>
<script>
import '@/assets/index.css'
export default {
    name:'index',
    data(){
        return{
            opacity:1,
        }
    },
    methods:{
        titlearea(){
            let clientHeight = document.getElementById('titlearea').clientHeight
            let scrollTop = document.getElementsByTagName('html')[0].scrollTop
            if(scrollTop<clientHeight){
                this.opacity = (1 - (scrollTop/clientHeight))
                document.getElementsByClassName('logoarea')[0].classList.remove('logoareafix')
            }
            if(scrollTop>clientHeight){
                document.getElementsByClassName('logoarea')[0].classList.add('logoareafix')
            }
        }
    },
    mounted(){
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', this.titlearea, false);  
        }  
        window.onmousewheel = document.onmousewheel = this.titlearea; 
    }
}
</script>
