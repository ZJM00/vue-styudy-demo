<template>
    <div>
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in goodInfo['gallery']" :key="index">
                <img v-lazy="item.img_url"  width="100%"/>
            </van-swipe-item>
        </van-swipe>
        <div class='info'>
            <span>30天无忧退货</span>
            <span>48小时快速退款</span>
            <span>满88元包邮</span>
        </div>
        <div class="proinfo">
            <p>{{goodDesc.name}}</p>
            <p>{{goodDesc.goods_brief}}</p>
            <p>￥{{goodDesc.retail_price}}</p>
        </div>
        <van-cell title="请选择商品数量" is-link />
        <div class='good-params'>
            <van-cell title="商品参数" style="borderBottom:1px solid #eeeeee9a" />
            <van-row v-for="(item, index) in goodParams" :key="index" class='row'>
                <van-col span="5">{{item.name}}</van-col>
                <van-col span="19">{{item.value}}</van-col>
            </van-row>
        </div>
        <div class="good-detailedn" v-html='this.goodInfo.info.goods_desc'>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
            <van-goods-action-icon icon="cart-o" :info='addNumber' text="购物车" />
            <van-goods-action-icon icon="star" :text="text?'已收藏':'收藏'" :color="text?'#ff5000':'#8874747d'" @click="favorite"/>
            <van-goods-action-button type="warning" text="加入购物车"  @click='addClick'/>
            <van-goods-action-button type="danger" text="立即购买"  @click='buyClick'/>
        </van-goods-action>
        <van-sku
            v-model="isSku"
            :sku="sku"
            :goods="goods"
            :show-soldout-sku='false'
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked"
        />

    </div>
</template>

<script lang='ts'>
 
import {Vue,Component,Prop} from 'vue-property-decorator';

@Component
export default class Product extends Vue{
    @Prop() private id!:number;

    private goodInfo:any = {};
    private isSku: boolean = false;
    private sku: object =  {
        tree: [
        ],
         list: [
        ],
        price: 0, // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
    };
    private productList:[] =[];
    private goods = {};
    private text:boolean = false;
    private addNumber:any = '';
    async created() {
        await this.getInfo();
        scroll(0,0);
        this.goods = {
            picture: this.goodInfo['info']['primary_pic_url'],
            title: this.goodInfo.info.name
        };
        this.productList = this.goodInfo.productList;

        this.sku['price'] = this.goodInfo['info']['retail_price'];
        this.sku['stock_num'] = this.goodInfo['info']['goods_number'];
        let tree:any = []; 
        let vl = [];
        this.goodInfo['specificationList'].forEach(item => {
           
            item['valueList'].forEach(element => {
                vl.push({
                    id: element.id, // skuValueId：规格值 id
                    name: element.name, // skuValueName：规格值名称
                    imgUrl: element.pic_url, // 规格类目图片，只有第一个规格类目可以定义图片
                    previewImgUrl: element.pic_url, // 用于预览显示的规格类目图片
                })
            });
            tree.push({
                k: item.name, // skuKeyName：规格类目名称
                v: vl,
                k_s: 's'+item.specification_id
            });
        });
        this.sku['tree'] = tree;
        let list:unknown[] =[];
        this.productList.forEach(item =>{
            let str:string = item['goods_specification_ids'].split('_');
            list.push({
                    id: item['id'], // skuId，下单时后端需要
                    goods_id: item['goods_id'],
                    price: item['retail_price'] *100 , // 价格（单位分）
                    s1: str[0], // 规格类目 k_s 为 s1 的对应规格值 id
                    s2: str[1], // 规格类目 k_s 为 s2 的对应规格值 id
                    s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                    stock_num: item['goods_number'] // 当前 sku 组合对应的库存
                })
        })
        this.sku['list'] = list;

        await this.addCardNumber();
    }
    get goodDesc(){
        return this.goodInfo['info'];
    }
    get goodParams() {
        return this.goodInfo['attribute'];
    }
    async getInfo(){
        let {data:res} = await this.$http.get(this.api.GoodsDetail,{params:{id:this.id}})
        this.goodInfo = res.data;
    }
    onClickLeft() {
        this.$router.go(-1);
    }
    addClick() {
        this.isSku = true;
    }
    buyClick() {
        this.isSku = true;  
    }
    onBuyClicked() {

    }
    onAddCartClicked(skuData) {
        this.$http.post(this.api.CartAdd,{
            goodsId: skuData.selectedSkuComb.goods_id, 
            number: skuData.selectedNum, 
            productId: skuData.selectedSkuComb.id

        })
        this.addNumber += skuData.selectedNum;
         this.isSku = false;
    }
    favorite(e:Event) {
         this.text = !this.text;
    }
    async addCardNumber() {
        let {data:res} = await this.$http.get(this.api.CartList);
        let card = res.data.cartList.find(item => item.goods_id == this.id);
        this.addNumber = card.number;
    }

}
</script>

<style lang="less" scoped>
    .info{
        display: flex;
        justify-content: space-around; 
        font-size: 13px;
        background-color: #efefef;
        padding:0.1rem;
        border-bottom: 1px solid #eee;
        span{
            position: relative;
           &:before{
               content: '';
               width: 3px;
               height: 3px;
               border: 2px solid red;
               border-radius: 50%;
               background: yellow;
               position: absolute;
               top:15%;
               left:-10px;
               clear: both;
               display: block;
               overflow: hidden;
           }
        }
        
    }
    .proinfo{
        background: #fff;
        p{
            margin:0;
            padding:0.1rem;
            text-align: center;
            &:first-child{
                padding-top: 0.2rem;
            }
            &:nth-child(2){
                font-size: 16px;
                padding:0.05rem;
                color: #938989;
            }
            &:last-child{
                color: red;
            }
        }
    }
    .good-params{
        margin-top: 2px;
        .row{
            font-size: 18px;
            margin-bottom: 0.05rem;
            background: #fff;
            height: 100%;
            line-height: 100%;
            padding: 0.21rem;
            box-sizing: border-box;
            .van-col{  
               height: inherit;
            }
            .van-col--19{
                text-align: left;
            }
        }
    }
    .good-detailedn{
        /deep/img{ 
                display: block;
                height: 100%;
                width: 100%;
        }
        
    }
</style>