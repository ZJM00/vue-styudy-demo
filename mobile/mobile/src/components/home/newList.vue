<template>
    <div id='new'>
        <h2>新闻</h2>
        <mt-cell-swipe v-for='item in list' :key='item.id'>
               <router-link :to='{name:"newsInfo",params:{"id":item.id}}' tag="div" class='link'>
                    <img :src="item.img_url" alt=""> 
                    <div class='info'>
                        <p class='title'>{{item.title}}</p>
                        <div class="time-click">
                            <span class="time">{{item.add_time | time}}</span>
                            <span class="click">点击：{{item.click}}次</span> 
                        </div>
                    
                    </div>
               </router-link>
        </mt-cell-swipe>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    name:'newlist',
    data(){
        return {
            list:''
        }
    },
    created(){
        fetch('http://www.liulongbin.top:3005/api/getnewslist').then(data=>{
            return data.json();
        }).then(data=>{
            if(data.status == 0){
                this.list = data.message;
            }else{
                Toast({
                    message:'数据加载失败',
                    duration:1500})
            }
            
        })
    },

}
</script>
<style lang="less">
#new{
    text-align: center;
    padding-top: 40px;
    .mint-cell-wrapper{
        .link{
            display: flex;
            align-items: center;
        }
        .mint-cell-title{
            padding: 0!important;
            width:0!important;
            flex:0!important;
            padding: 5px;
        }
        .mint-cell-value{
            width: 100%;
            img{
                width:4rem;
            }
            .info{
                color: #000;
                .title{
                    width: 300px;
                    font-weight: bold;
                    display: block;
                    padding: 0.2rem 0.5rem;
                    font-size: 14px;
                    white-space: nowrap;
                    text-align: left;

                }
                span{
                    font-size: 13px;
                }
                .time-click{
                     display: flex;
                     justify-content:space-between;
                }
                .time{
                     align-self: flex-start;
                    padding: 0.02rem 0.5rem;
                }
                .click{
                    align-self: flex-end;
                    // justify-content: flex-end;
                   
                    padding: 0.02rem 0.5rem;
                    margin-right: 2rem;
                }
            }
        }
    }
}
</style>
