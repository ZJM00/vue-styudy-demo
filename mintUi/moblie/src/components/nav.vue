<template>
    <div id='nav-tabbar'>
        <mt-header fixed title='mint-ui-demo'>
            <mt-button icon="back" slot="left" class='but' @click='back' v-if='flag'>返回</mt-button>
        </mt-header>
        <mt-tabbar v-model='selected' fixed id='tabbar'>
            <mt-tab-item :id="item.id" v-for="(item, index) in tabbar" 
                :key='item.id'  :class='item.changeImg?"is-selected":""'
                @click.native='change(index)'> 
                <img slot="icon" :src= "require('../assets/'+ item.id+'2'+'.png')" v-show='item.changeImg'>
                <img slot="icon" :src= "require('../assets/'+ item.id+'.png')" v-show='!item.changeImg'>
                <span>
                    <span class="iconfont icon-search min-badge" v-if='item.dabge'>{{allCount}}</span>
                     {{item.id}}
                </span>
              
            </mt-tab-item>
        </mt-tabbar>     
    </div>
   
</template>
<script>
import { log } from 'util';
export default {
    name:'nav-header',
    data(){
        return {
            tabbar:[
                {id:"首页",changeImg:true,dabge:false,routLink:'/home',title:'home'},
                {id:"会员",changeImg:false,dabge:false,routLink:'/member',title:'member'},
                {id:"购物车",changeImg:false,dabge:false,routLink:'/shop',title:'shop',},
                {id:"搜索",changeImg:false,dabge:false,routLink:'/search',title:'search'},
            ],
            selected:"",
            count:1,
            once:true,
            flag:false,
        }
    },
    created(){
        let url = this.$route.path.replace(/\//,'');
        for(let i = 0; i < this.tabbar.length; i++){
            if(this.tabbar[i]["title"] == url){
                this.change(i);
            }
        }
        this.getStore();
        this.judge(this.count);
         this.getFlag();
    },
    methods:{
        change(id){
            this.tabbar[id].changeImg = true;
            this.$router.push(this.tabbar[id].routLink);
            this.tabbar.forEach((e,ind)=> {
                if(ind != id){
                    e.changeImg = false;
                }
            });
        },
        back(){
            this.$router.go(-1);
        },
        judge(c){
            if(parseInt(c) > 0){
                this.tabbar[2].dabge = true;
            }else{
                this.tabbar[2].dabge = false;
            }
        },
        getStore(){
            this.count = this.$store.getters.getAllCount;
        },
        getFlag(){
            this.flag = this.$route.path == '/home'?false:true;
        }
    },
    computed:{
        allCount(){
            this.count = this.$store.getters.getAllCount;
            return this.count;
        }
    },
    watch:{
        allCount(){
            if(this.once){
                 let c = this.$store.getters.getAllCount;
                 this.judge(c);
                 this.once = false;
            }
            
        },
        "$route.path":function(newVal){
            this.getFlag();
        },
    }
  
}

</script>
<style lang="less">
#nav-tabbar{
    overflow: hidden;
}
.but{
    &:active{
        opacity:0.7 !important;
    }
}
.mint-tab-item-label{
    font-size: 13px !important;
    position:relative;
}
.mint-tabbar{
    >  .mint-tab-item{
        transition: all 0.2s;
            &:active{
                transform:scale(0.7);
            }
        }
        .is-selected{
                background-color:transparent!important;
        }
        .mint-tab-item-label{
            > span{
                position: relative;
                .iconfont{
                    border-radius: 50%;
                    position: absolute;
                    right: 5px;
                    top:-32px;
                    padding: 2px;
                    opacity: 0.8;
                }
                .icon-search{
                    color: #fff; 
                    background: rgb(235, 34, 34); 
                    font-size: 12px;
                    height: 0.8rem;
                    width:0.8rem;
                    text-align: center;
                }
            }
        }
}

</style>
