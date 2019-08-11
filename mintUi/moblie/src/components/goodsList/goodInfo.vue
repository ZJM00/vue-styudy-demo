<template>
    <div id='good-info'>
        <div class='sell-info'>
            <mt-swipe :auto="4000" class="swiper">
                <mt-swipe-item  v-for='(item,id) in list' :key="id" >
                    <img :src="item.src" alt="" >
                </mt-swipe-item>
            </mt-swipe>
            <div class="price">
                <h3>{{info.title}}</h3> 
                <hr>
                <div class="sell-price">
                    <div class="old">销售价：￥{{info.sell_price}}</div>
                    <div class="new">市场价：￥{{info.market_price}}</div>
                </div>
                <div class="count">
                    <span>购买数量</span>
                    <label >:</label>
                    <div class='flash'>
                        <!-- <button @touchstart='count>1?--count:1'>&minus;</button>
                        <input type="number" value="1"  v-model='count' @input='getNum($event)' 
                        @blur='blur' :max='parseInt(info.stock_quantity)' min=1>
                        <button @touchstart='count<60?++count:60'>+</button> -->
                        <numbox :max=parseInt(info.stock_quantity) @getCarCount='carCount'></numbox>
                        <transition @before-enter='beforeEnter'  @enter='enter' @after-enter='afterEnter'>
                            <div class="ball" v-if='ballFlag' ref='ball'></div>
                        </transition>
                        
                    </div>
                </div>
                <div class="sell">
                    <button>立即购买</button>
                    <button @touchstart='addShopCar'>加入购物车</button>
                </div>
            </div>
            <div class="info"> 
                <h3>商品信息</h3>
                <hr>
                <div class="goods">
                    <p>商品货号：{{info.goods_no}}</p>
                    <p>库存情况：{{info.stock_quantity}}件</p>
                    <p>上架时间：{{info.add_time  | time}}</p>
                </div>
            </div>
            <div class="other" ref=button>
                <mt-button plain type='primary' size=small @click='show($event)' class="color">图文介绍</mt-button>
                <mt-button plain size=small @click='show($event)'>商品评论</mt-button>
            </div>
        </div>
        <div class="descript" v-show='change' >
            <h3>{{gooodDesciption.title}}</h3>
            <div v-html="gooodDesciption.content"></div>
        </div>
        <comment v-show='!change' :arrId=id></comment>
    </div>
</template>
<script>
import comment from '../comment.vue'
import numbox from '../numbox.vue'
export default {
    name:"goodInfo",
    data(){
        return {
            id:this.$route.params.id,
            list:[],
            info:'',
            count:1,
            gooodDesciption:'',
            change:true,
            ballFlag:false,
            carNum:1,
        }
    },
    created(){
        this.getImg();
        this.getInfo();
        this.getDescript();
        window.scroll(0,0);
    },
    methods:{
        getImg(){
            fetch(this.baseUrl + "/getthumimages/" + this.id).then(d=>{ 
                return d.json();
            }).then(response=>{
                if(response.status == 0){
                    this.list = response.message;
                }
            })
        },
        getInfo(){
            this.$ajax.get("/goods/getinfo/" + this.id).then(response=>{
                if(response.data.status == 0){
                    this.info = response.data.message[0];
                }
            })
        },
        getDescript(){
            this.$ajax.get('/goods/getdesc/'+ this.id).then(data=>{
                if(data.data.status == 0){
                    this.gooodDesciption = data.data.message[0];
                }
            })
        },
        getNum(e){
            if(/\D/g.test(this.count)){
                this.count=this.count.replace(/\D/g,'');
            }
            if(parseInt(this.count) > 60){
                this.count = 60;
            }

        },
        carCount(d){
            this.carNum = d;
        },
        blur(){
            if( this.count == ""){
                 this.count = 1;
            }
        },
        show(e){
            let dom = e.srcElement || e.targetElement;
            let f = this.$refs.button.children[0];
            let m = this.$refs.button.children[1];
            if(!dom.classList.contains("color")){
                dom.classList.remove("blank-color");
                dom.classList.add("color");
                this.change = !this.change;
                 if(f == dom){
                    m.classList.remove("color");
                    m.classList.add("blank-color");
                }else{
                    f.classList.remove("color");
                    f.classList.add("blank-color");
                }
            }
        },
        addShopCar(){
            this.ballFlag = !this.ballFlag;
            let goodInfo = {
                id:this.id,
                count:this.carNum,
                price:this.info.sell_price,
                selected:true,
            };
            this.$store.commit("getCount",goodInfo );

        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            let ballPosition = el.getBoundingClientRect();
            let tabbar = document.querySelector("#tabbar");
            let shopCar = tabbar.children[2];
            let shopPosition = shopCar.getBoundingClientRect();
            let shopWidth = parseFloat(getComputedStyle(shopCar,null).width) / 2;
            let y = shopPosition.top - ballPosition.top;
            let x = shopPosition.left - ballPosition.left + shopWidth;
            el.offsetWidth;           
            
             
            el.style.transform = `translate(${x}px,${y}px)`;
            el.style.transition = 'all 0.7s cubic-bezier(0.4,-0.3,1,0.68)';
            done();
        },
        afterEnter(el){
           this.ballFlag = !this.ballFlag;
        }
    },
    components:{
        comment,numbox
    },
    
}
</script>
<style lang="less" scope>
.box-show(){
    border: 1px solid #fff;
    box-shadow: 0 0  8px #ccc;
    margin-top: 0.5rem;
}
.card(@p){
     h3{
        padding: @p;
        font-size: 16px;
        text-align: left;
        font-weight: 500;
    }
    hr{         
        border-color: #cccccc85;
        width: 100%;
        border-width: 1px 0 0 0 ;
    }
}
#good-info{
    height: 100%;
    margin-top: 40px;
    margin-bottom: 60px;
    text-align: center;  
    .sell-info{
        padding:  0.5rem 1rem 1rem 1rem;
    }
    background-color: #cccccc21;
    .swiper{ 
        background-color: #fff;
        .box-show();
        img{
            height: 100% ;
            width: auto;
        }
    }
    .price{
        background-color: #fff;
        .box-show();
       .card(1em 1rem);
        .sell-price{
            padding: 0.5rem 1rem;
            display: flex;
            flex-direction: row;
            div{
                font-size: 15px;
            }
            .old{
                color: #f52c2c;
            }
            .new{
                margin-left: 1rem;
                text-decoration: line-through;
                font-size: 12px;
                line-height: 1.8;
                color: #cccccc;
            }
        }
        .count{
            padding: 0.5rem 1rem;
            text-align: left;
            span{
                font-size: 14px;
                // margin-right: 0.8rem;
            }
            label{
                display: inline-block;
                width: 1rem;
                text-align: center;
                font-weight: bold;
            }
            .flash{
                display: inline-block;
                border: 1px solid rgba(0,0,0,0.2);
                position: relative;
                input{
                    width: 1.3rem;
                    height: 0.8rem;
                    padding: 0.4rem 0.7rem;
                    border:none;
                    text-align: center;
                    letter-spacing: 0.07rem;
                }
                button{
                    border:none;
                    width: 2.5rem;
                    height:1.9rem;
                    padding: 0.5rem 0;
                    font-size: 16px;
                    background-color: #dcdcdc4d;
                    line-height: 0.8rem;
                    &:active{
                        background-color:  #dcdcdc;
                    }
                }
                .ball{
                    position: absolute;
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50%;
                    background-color: red;
                    z-index: 10;
                    top:0.5rem;
                    left: 3.3rem;

                    opacity: 1;
                }
                &:after{
                    content: '';
                    display: block;
                    clear: both;
                }
            }
        }
        .sell{
            padding: 0.5rem 1rem;
            text-align: left;
            button{ 
                padding: 0.5rem 0.7rem;
                color:#fff;
                border-radius: 0.2rem;
                 &:nth-of-type(1){
                    background-color: #26a2ff;
                }
                &:nth-child(2){
                    margin-left: 1rem;
                    background-color: #ef4f4f;
                }
            }
           
        }
    }
    .info{
        background-color: #fff;
         .card(1em 1rem);
        .box-show();
        text-align: left;
        .goods{
            padding: 0.5rem 1rem;
        }
        
        p{
             padding: 0.3rem 0;
             color: #827f7f;
         }
    }
    .other{
        margin-top: 1rem;
        button{
            margin-right: 1rem;
        }
    }
    button{
        &:active{
            opacity: 0.5;color: #000;
        }
    }
    .descript{
        // .box-show();
        padding: 4px;
        background-color: #fff;
        h3{
            font-size: 16px;
            color:#226aff;
            text-align: center;
            padding: 0.5rem 0;
        }
        img{
            width: 100%;
        }
    }
    .color{
        border:1px solid #26a2ff!important;
        color:#26a2ff!important;
    }
    .blank-color{
        border:1px solid #5a5a5a!important;
        color:#5a5a5a!important;
    }

}


</style>
