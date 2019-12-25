<template >
    <div class="goods" @touchstart='start($event)' @touchmove='move($event)'>
        <router-link class="item" v-for="item in list" :key='item.id' tag=div :to="'/home/goodList/' + item.id">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="new-price">￥{{item.sell_price}}</span>
                    <span class="old-price">￥{{item.market_price}}</span>
                </p>
                <p class="sell"> 
                    <span>热卖中</span>
                    <span>{{item.stock_quantity}}</span>
                   
                </p>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    name:'goodsList',
    data(){
        return {
            pageindex:1,
            list:[],
            old:{
                x:"",
                y:''
            },
            new:{
                x:"",
                y:''
            },
            lock:true,
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            this.$ajax.get('/getgoods?pageindex='+this.pageindex).then(response=>{
                if(response.data.status == 0){
                     this.list = [...this.list,...response.data.message];
                }
            })
        },
        start(e){
            this.old.y = e.targetTouches[0].clientY; 
        },
        move(e){
            // let x = e.touches[0].
           // console.log(e.targetTouches);
            this.new.y = e.targetTouches[0].clientY;

            if((this.old.y -  this.new.y )> 100 && this.lock){ 
                this.pageindex++;
                this.getList(); 
                this.lock = false;
                let t = setTimeout(()=>{
                    this.lock = true;
                },1500);
            }
            console.log(this.lock);
        }
    },

}
</script>
<style lang="less" scoped>
.flex-space(){
    display: flex;
    justify-content: space-between;
}
.goods{
    margin-top: 40px;
    margin-bottom: 60px;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    justify-content: space-between;
    background: #cccccc3b;
    height: 100%;
    .item{ 
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 49%;
        border:1px solid #ccc;
        box-shadow: 0 0  8px #ccccccf2;
        background-color:#fff;
        margin-bottom: 0.5rem;
        min-height: 293px;
        img{
           width: 100%;
        }
        h3{
            font-size: 0.8rem;;
            padding: 0 0.3rem 0.3rem 0.3rem;;
        }
        .info{
            bottom: 0;
            background-color:rgba(13, 13, 13, 0.1);
            .price{
               padding:  0.2rem 0.3rem; 
               font-size: 16px;
               .new-price{
                   color: red;
                }
                .old-price{
                    display: inline-block;
                    font-size: 12px;
                    transform: scale(0.9);
                    padding-left: 0.5rem;
                   color:rgba(13, 13, 13, 0.4);
                   text-decoration: line-through;
                }
            }
            .sell{
                font-size: 12px;
                padding: 0.5rem 1rem;
                .flex-space();
                span{
                     color: rgba(13, 13, 13,0.5); 
                }
              
            }
           
        }
    }

}
</style>
