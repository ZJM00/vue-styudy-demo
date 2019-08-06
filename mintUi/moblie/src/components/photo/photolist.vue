<template>
    <div>
        <nav-swiper></nav-swiper>
    </div>
        
</template>
<script>
import navSwiper from './tab-nav-swiper.vue'
export default {
    name:'photo',
    components:{
        navSwiper,
    }
}
</script>
<style lang="less" scoped>
  *{
      margin-top: 40px;
  }
</style>
