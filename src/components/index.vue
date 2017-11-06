<template>
    <div>
        <div id="titlearea" :style="{opacity:opacity}">
            <span>人 间 太 美 好 。</span>
        </div>
        <div id="mainarea">
            <div class="blankspace"></div>
            <div class="logoarea">
                <div class="blankspace"></div>
                <div class="logo" @mouseover="hoverlogo" @mouseout="leavelogo">
                    <img src="../assets/eyelogo.svg" alt="LOGO">
                </div>
            </div>
            <div class="content1">
                <h1>小孩子们</h1>
                <h2>世界上最可爱而宝贵的，莫过于小孩子了，没有任何事物可以与他们的单纯无邪相提并论</h2>
                <section class="section1">
                    <img class="pic1" src="../../static/kids1.jpg">
                    <img class="pic2" src="../../static/kids2.jpg">
                    <div class="info">
                        <h3>可爱的侄儿</h3>
                        <p>真的是很巧，我在网上的一些朋友曾经给我起了一个外号叫做图图，而我这个侄儿的小名也叫做图图，也许这就是冥冥中的缘分吧。</p>
                    </div>
                </section>
                <section class="section2">
                    <img class="pic1" src="../../static/kids3.jpg">
                    <img class="pic2" src="../../static/kids4.jpg">
                    <div class="info">
                        <h2>所有的大人都曾是小孩，虽然只有少数人记得。</h2>
                        <p>如果你还能够记得，就请千万不要再忘记了。</p>
                    </div>
                </section>
            </div>
            <div class="content2">
                <div class="jessi">
                    <h1>J e s s i .</h1>
                </div>
                <section class="section1">
                    <img class="pic1" src="../../static/jessi2.jpg">
                    <div class="info">
                        <p>Jessi是我认识十多年的好友，差不多已经算是无话不说的亲人了。同时她也是一位特别优秀的搭档，我们一起合作了很多照片。左边这一张，她甚至完全放心地把妆容交由我这个新手来打造。</p>
                    </div>
                </section>
                <section class="section2">
                    <img class="pic1" src="../../static/jessi3.jpg">
                    <img class="pic2" src="../../static/jessi4.jpg">
                </section>
                <section class="section3">
                    <img class="pic1" src="../../static/jessi5.jpg">
                    <div class="info">
                        <p>Jessi's Instagram : jessi_or_jay</p>
                    </div>
                </section>
            </div>
            <div class="content3">
                <div class="other"></div>
                <div id="poemcontent">
                    <h3>《活在这珍贵的人间》</h3>
                    <p>活在这珍贵的人间<br>太阳强烈<br>水波温柔<br>一层层白云覆盖着<br>我踩在青草上<br>感到自己是彻底干净的黑土块<br><br>活在这珍贵的人间<br>泥土高溅<br>扑打面颊<br>活在这珍贵的人间<br>人类和植物一样幸福<br>爱情和雨水一样幸福<br>- 海子</p>
                </div>
                <section id="poem" class="section1">
                    <img class="pic1" src="../../static/other1.jpg">
                </section>
                <section class="section2">
                    <img class="pic1" src="../../static/other2.jpg">
                </section>
                <section class="section3">
                    <img class="pic1" src="../../static/other3.jpg">
                </section>
            </div>
        </div>
        <footer>
            <div class="copyright">
                <p>人间太美好 2017</p>
            </div>
        </footer>
    </div>
</template>
<script>
import event from './event.js'
import '@/assets/index.css'
export default {
    name:'index',
    data(){
        return{
            opacity:1,
        }
    },
    methods:{
        hoverlogo(){
            event.$emit('hover')
        },
        leavelogo(){
            event.$emit('leave')
        },
        scrollfn(){
            console.log('11')
            let poem = document.getElementById('poem')
            let poemcontent = document.getElementById('poemcontent')
            let sections = document.getElementsByTagName('section')
            let titleheight = document.getElementById('titlearea').clientHeight
            let htmlscrolltop = document.getElementsByTagName('html')[0].scrollTop
            let htmlheight = document.getElementsByTagName('html')[0].clientHeight
            if(htmlscrolltop<titleheight){
                this.opacity = (1 - (htmlscrolltop/titleheight))
                document.getElementsByClassName('logoarea')[0].classList.remove('logoareafix')
                document.getElementsByClassName('logo')[0].classList.remove('ontop')
                event.$emit('hide')
            }
            if(htmlscrolltop>titleheight){
                document.getElementsByClassName('logoarea')[0].classList.add('logoareafix')
                event.$emit('show')
                setTimeout(()=>{
                    document.getElementsByClassName('logo')[0].classList.add('ontop')
                },4000)
            }
            for(let i = 0;i<sections.length;i++){
                if(sections[i].offsetTop < htmlheight+htmlscrolltop){
                    sections[i].style.opacity = 1
                }
            }
            if(poem.offsetTop < htmlheight+htmlscrolltop){
                poemcontent.style.opacity = 1
            }else{poemcontent.style.opacity = 0}
        }
    },
    mounted(){
        if (document.addEventListener) {
            document.addEventListener('scroll', this.scrollfn, false);  
        }  
        window.onscroll = this.scrollfn; 
    }
}
</script>
