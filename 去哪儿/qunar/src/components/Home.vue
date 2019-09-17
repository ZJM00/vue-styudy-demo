<template>
    <div class="home">
        <home-head></home-head>
        <home-swiper></home-swiper>
    </div>
</template>

<script>
// @ is an alias to /src
import homeHead from '@/components/home/HomeHead.vue'
import homeSwiper from '@/components/home/swiper.vue'
export default {
  name: 'home',
  components: {
    homeHead,homeSwiper
  }
}
</script>
<style lang="less">
  
</style>
