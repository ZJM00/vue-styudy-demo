<template>
    <div class="shop">
        <div class="good-list">
            <div class="car-content" v-for="(item,i) in list" :key=item.id>
                 <mt-switch class="switch" v-model='item.select' @change='changeSelelct(item.id,item.select)'></mt-switch>
                 <img :src="item.thumb_path" alt="">
                 <div class="info">
                    <h3>{{item.title}}</h3>
                    <div class="num">
                        <span class="price">￥{{item.sell_price}}</span>
                        <numbox :num=item.count :max='item.max' class="media" :carId='item.id'></numbox>  
                        <a href="#"  @click='remove(i,item.id)'>删除</a>
                    </div>
                 </div>
            </div>
        </div>
        <div class="settlement">
            <div>
                 <p>总计（不含运费）</p>
                <div class="purchase">
                    <div>
                        <span>已选购商品<span>{{$store.getters.getGoodsCount.count}}</span>件</span>
                        <span>总价:￥<span>{{$store.getters.getGoodsCount.allPrice}}</span></span> 
                    </div>
                <mt-button type="danger" size=small>去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import numbox from '../numbox.vue'
export default {
    name:'shop',
    data(){
        return {
            list:[],
            idList:this.$store.getters.getId,
        }
    },
    created() {
        this.getCar();
    },
    methods:{
        getCar(){
            this.$ajax.get("/goods/getshopcarlist/"+this.idList).then(data=>{
                if(data.data.status == 0)
                    this.list = data.data.message;
                    this.list.forEach(e => {
                        e.count = this.$store.getters.getInfo(e.id).count;
                        e.max = this.$store.getters.getInfo(e.id).maxNum;
                        e.select = this.$store.getters.getInfo(e.id).select;
                    });
                }
            );
        },
        remove(id,ind){
            this.list.splice(id,1);
            this.$store.commit('remove',ind);
        },
         changeSelelct(id,boolean){
             this.$store.commit("updateSelect",{id:id,select:boolean})
       }
    },
    components:{
        numbox,
    },
}
</script>
<style lang="less" >
.box(@p:1){
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color:rgba(255, 255,255,@p);
    //padding: 1rem;
}
.shop{
    background-color: #eee;
    padding: 0 0.2rem;
    text-align: center;
    height: 100%;
    margin: 40px 0 50px 0;
    .good-list{
        padding: 1rem 0.5rem;
        .car-content{
            .box(0.6);
            display: flex;
            align-content: center;
            flex:1;
            width:100%;
            margin-bottom: 1rem;
            img{
                width: 5rem;
                display: flex;
                align-items: center;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content:space-around;
                flex:1;
                h3{
                    font-size: 14px;
                    // text-align: left;
                }
                @media (max-width:520px) {
                    h3{
                        text-align: left;
                    }
                }
                .num{
                    display:flex;
                    justify-content:center;
                    padding: 1rem  0 0 0;
                    span,a{
                        display: block;
                       line-height: 2.0;
                       padding: 0 0.5rem;
                    }
                }
                .price{
                    color: red;
                }
            }
          
        }
    
    }
    .settlement{
        color: #8e8d8d;
       padding:  0  0.5rem 1rem .5rem;
        > div{
            background-color: #fff;
            padding: 1rem 1rem;  
            .box();  
            p{
                text-align: left;
            }
            .purchase{
                padding-top: 0.5rem;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                div{
                    display: flex;
                    flex-direction: row;
                    align-self: flex-end;
                    span{ 
                        height: 100%;
                        display: inline-block;
                        vertical-align: bottom;
                        letter-spacing: 0.1rem;
                        &:nth-child(2){
                            margin-left: 1rem;
                        }
                        span{
                            color: red;
                        }
                    }
                }
            }
        }
      
    }
}
</style>
