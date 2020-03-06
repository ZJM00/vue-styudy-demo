<template>
    <div>
         <van-nav-bar
            title="购物车"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="list" v-for="(item, index) in cardList['cartList']" :key="index">
            <van-checkbox v-model="item.checked" @change='checkCard(item)'></van-checkbox>
            <van-card
                :price="item.retail_price + '.00'"
                :title="item.goods_name"
                :thumb="item.list_pic_url"
                centered
                >
                <div slot='num'>
                    <van-stepper v-model="item.number" @plus=checkPlus(item)  @minus=checkMinus(item) />
                </div>
                <!-- <div slot="footer">
                    <van-button size="mini">删除</van-button>
                </div> -->
            </van-card>
        </div>
      
       
        <van-submit-bar class='bar'
            :price="price"
            button-text="提交订单"
            @submit="onSubmit"
            >
            <van-checkbox v-model="checked">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script lang='ts'>
import {Vue,Component,Watch} from 'vue-property-decorator';

@Component
export default class BuyCard extends Vue{
    private cardList = [];
    private checked = false;
    private price = 0;
    private len = 0;
    @Watch('checked') private onCheckedChanged(val) {
        this.price = 0;
        if(val){
            this.cardList['cartList'].forEach(v => {
                v['checked'] = true;
                this.price += v['number']*v['retail_price']*100;
            });
        }else{
            this.cardList['cartList'].forEach(v => {
                v['checked'] = false;
            });
        }
        if(this.getLen() == this.len){
            return true;
        }else{
            return false;
        }
    }
    created() {
        this.addCardNumber();
    }
    async addCardNumber() {
        let {data:res} = await this.$http.get(this.api.CartList);
        this.cardList = res.data;
        this.cardList['cartList'].forEach(v => {
            v['checked'] = false;
        });
        this.len = this.cardList['cartList'].length;
    }
    onClickLeft() {
        this.$router.go(-1);
    }
    onSubmit() {

    }
    getLen() {
        let len = 0;
        this.cardList['cartList'].forEach(v => {
                if(v['checked']) {
                    len ++;
                }   
        });
        return len;
    }
    checkCard(item){
        if(this.checked){
            if(!item.checked){
                let len = this.getLen();
                if(len == 0){
                    this.price = 0;
                }else{
                    this.price -= item.number * item.retail_price *100;
                }
            }
        }else{
            if(item.checked){
                this.price += item.number * item.retail_price*100;
            }else{
                let len = this.getLen();
                if(len == 0){
                    this.price = 0;
                }else{
                    this.price -= item.number * item.retail_price *100;
                }
            
            }
        }
    
    }
    checkPlus(item) {
        if(item.checked){
            this.price += item.retail_price*100;
        }
    }
    checkMinus(item){
        if(item.checked){
            this.price -= item.retail_price*100;
        }
    }
}
</script>

<style lang="less" scoped>
    .list{
        display: flex;
        justify-content: space-around;
        padding: 0.1rem;
        /deep/ .van-card{
           flex-basis: 90%;;
        }
    }
    .bar{
        margin-bottom: var(--tab-width);
    }
</style>