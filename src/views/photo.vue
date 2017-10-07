<template>
    <div>
        <main-header></main-header>
        <main-footer></main-footer>
    </div>
</template>
<script>
    import '@/assets/css/titlepage.css'
    import '@/assets/css/main.css'
    import MainHeader from '@/components/header'
    import MainFooter from '@/components/footer'
    export default{
        components:{
            MainHeader,
            MainFooter
        }
    }
</script>
