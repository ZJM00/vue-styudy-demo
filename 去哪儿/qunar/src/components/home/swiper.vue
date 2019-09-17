<template>
    <div class="swiper">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <img :src="slide" alt="" class="swiper-img">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>   
    </div>
</template>
<script>
export default {
    name: "homeSwiper",
    data(){
        return {
             swiperOption: {
                pagination:{
                  el:'.swiper-pagination',
                },
                loop: true,
               autoplay:true,
             },
            swiperSlides: ["https://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20199/5e82991722549bfec5ada28ab25d0820.jpg_750x200_4bb9032d.jpg",
                         "https://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20199/0fa39f9f5e66189e85b5c6e54278587d.jpg_750x200_86c8f2d8.jpg",
                         "https://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20199/5e82991722549bfec5ada28ab25d0820.jpg_750x200_4bb9032d.jpg",
                         "https://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20199/3ff47fa622d07edad492c2859a5ad32f.jpg_750x200_3df30168.jpg"]
        }
    },
    // computed: {
    //   swiper() {
    //     return this.$refs.mySwiper.swiper
    //   }
    // },
    // mounted() {
    //   // current swiper instance
    //   // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //   //console.log('this is current swiper instance object', this.swiper)
    //   this.swiper.slideTo(3, 1000, false)
    // }


    
}
</script>
<style lang="less" scope>
    .swiper{
        width: 100%;
        height: 0;
        padding-bottom: 26.666666666666666%;  // 根据图片的宽高比计算
        overflow: hidden;
        background-color: #eeeeee2f;
        .swiper-img{
            width: 100%;
        }
        .swiper-pagination-bullet{
            background: rgba(255,255,255,.5)!important;
            opacity:1;
        } 
         .swiper-pagination-bullet-active{
            background-color: #fff!important;
              opacity: 1;
        }
    }
    
</style>