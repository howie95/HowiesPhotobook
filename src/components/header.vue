<template>
    <header>
        <nav>
            <ul>
                <li>博客 / Blog</li>
                <li>图集 / Photos</li>
                <li>关于 / About</li>
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


