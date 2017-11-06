<template>
    <header>
        <nav>
            <ul>
                <li><a href="https://howie95.com/blog/" target="_blank">博客 / Blog</a></li>
                <li>图集 / Photos</li>
                <li @click="about">关于 / About</li>
            </ul>
        </nav>
    </header>
</template>
<script>
import event from './event.js'
import '@/assets/header.css'
export default {
  name:'header',
  data(){
      return{
          labelcheck:''
      }
  },
  methods:{
      about(){
          event.$emit('about')
      }
  },
  mounted(){
      event.$on('hover',()=>{
          document.getElementsByTagName('header')[0].classList.add('headerhover')
      })
      event.$on('leave',()=>{
          document.getElementsByTagName('header')[0].classList.remove('headerhover')
      })
  }
}
</script>


