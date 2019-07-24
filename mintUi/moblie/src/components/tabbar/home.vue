<template>
    <div class="home">
        <mt-swipe :speed=400 >
            <mt-swipe-item v-for='item in carouselList' :key='item.id'>
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>  
        <div class='cell'>
           <ul>
               <li class='min'>
                   <router-link tag="div" to='/home/newslist'>
                       <img src="../../assets/home/新闻.png" alt="">
                       <span>新闻资讯</span>
                   </router-link >
               </li>
               <li class='min' >
                   <router-link tag="div" to='/home/2'>
                       <img src="../../assets/home/图片分享.png" alt="">
                       <span>图片分享</span>
                   </router-link>
               </li>
               <li class='min' >
                   <router-link tag="div" to='/home/3'>
                       <img src="../../assets/home/商品购买.png" alt="">
                       <span>商品购买</span>
                   </router-link >
               </li>
           </ul>
           <ul class="margin">
               <li class='min'>
                   <router-link tag="div" to='/home/4'>
                       <img src="../../assets/home/留言反馈.png" alt="">
                       <span>留言反馈</span>
                   </router-link>
               </li>
               <li class='min'>
                   <router-link tag="div" to='/home/5'>
                       <img src="../../assets/home/视频专区.png" alt="">
                       <span>视频专区</span>
                   </router-link >
               </li>
               <li class='min'>
                   <router-link tag="div" to='/home/6'>
                       <img src="../../assets/home/联系我们.png" alt="">
                       <span>联系我们</span>
                   </router-link>
               </li>
            </ul>
        </div>
        <!-- <router-view></router-view> -->
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    name:"home",
    data(){
        return {
            carouselList:'' 
        }
    },
     created(){
       fetch("http://www.liulongbin.top:3005/api/getlunbo")
                .then(data=>{
                   return data.json();//必须把数据处理后，返回
            }).then(data=>{
                if(data.status == 0){
                    this.carouselList = data.message;
                }else{
                    Toast({
                        message:"图片加载失败",
                        duration:"2000"
                    });
                }         
            })
    //    this.$ajax.get("http://www.liulongbin.top:3005/api/getlunbo")
    //         .then(function(data){
    //             console.log(data)
    //    })
    },
    methods:{
        getImg(){

        }
    }
}
</script>
<style lang="less" >
.home{
    padding-top: 40px;
    text-align: center;
}
.mint-swipe{
    height:15rem!important;
    img{
        height:100%;
        width: 100%;
    }
}
.mint-swipe-indicators{
    .is-active{
        background: red!important;
        opacity: 1!important;
    }
}
.cell{
   
    justify-content: center;
    flex-direction: row;
    ul{ height:auto;
        margin:0.5rem auto;
        display: block;
        list-style: none;
        flex-direction: row;
        justify-content: space-around;
        li{
            flex-grow: 1;
            height:auto;
            width:auto ;
            padding: 1rem 1.5rem;
            display: inline-block;
             justify-content: space-around;
            div{
                height: 4rem;
                width: 4rem; 
                img{
                    width: 2.5rem;
                    height: 2.5rem;
                    padding: 0.5rem;
                }
                span{
                    display:inline-block;
                     width: 4rem;
                     font-size: 16px;
                }
            }
           
        }
    }
    .margin{
         margin: 2rem auto;
    }
    @media (max-width:320px) {
        .margin{
            margin: 1.5rem auto;
        }
        .min{
            padding: 0rem;
            margin: 0.5rem 1rem;
        }
    }
   

}
</style>
