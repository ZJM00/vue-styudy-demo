<template>
    <div class='cate-list'>
        <h4 :class='{"title-fixed":scrollTitle,"title":true}'>产品详情</h4>
        <van-tabs v-model="active" animated sticky>
            <van-tab v-for="(item,index) in list.brotherCategory" :key="index" 
                :title="item.name">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <van-pull-refresh v-model="loading" @refresh="onRefresh">
                        <van-grid   column-num="2" :gutter="10">
                            <van-grid-item :border="false" v-for="(item, index) in goodsInfo" 
                                :key="index" :to='"/product/" + item.id'>
                                <van-image  fit="contain" :src="item.list_pic_url" lazy-load/>
                                <div class="dec">
                                    <p>{{item.name}}</p>
                                    <p> ￥{{item.retail_price}}</p>
                                </div>
                                
                            </van-grid-item>
                        </van-grid>
                    </van-pull-refresh>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script lang='ts'>
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';

@Component


export default class CategoryList extends Vue{
    @Prop()  id!:number;
    private list:any = [];
    private active:number = 0;
    private currentCategory:[] = [];
    private goodsInfo: any[] = [];
    private page:number = 1;
    private size:number = 20;
    private loading:boolean = false;
    private finished:boolean = false;
    private count:number = 0;
    private scrollTitle:Boolean = false;

    @Watch('active')
    private async onActiveChanged(val) {
        this.page = 1;
        this.goodsInfo = [];
        await this.getGoodsInfo();
        
    }
    async created() {
        await this.getList();
        await this.getGoodsInfo();
    }
    mounted() {
        window.addEventListener('scroll', (e:Event)=> {
            if(scrollY > 50){
                 this.scrollTitle = true;
            }else{
                this.scrollTitle = false;
            }
           
        },false);
    }
    async getList() {
        let {data:res} = await this.$http.get(this.api.GoodsCategory,{params:{id:this.id}});
        this.list = res.data; 
        this.currentCategory = this.list['currentCategory'];
    }
    async getGoodsInfo(){
        let {data:res} = await this.$http.get(this.api.GoodsList + `?categoryId=${this.list['brotherCategory'][this.active]['id']}&page=${this.page}&size=${ this.size}`);
        this.goodsInfo = [...this.goodsInfo,...res.data.data];
        this.count = res.data.count;
    }
    async onRefresh() {
        this.page = 1;
        await this.getGoodsInfo();
        this.loading = false; 
    }
    async onLoad(){
        this.loading = true;
        this.page += 1;
        await this.getGoodsInfo();
        this.loading = false; 
        if(this.count <= this.goodsInfo.length){
            this.finished = true;
        }
    }
}
</script>

<style lang="less" scoped>
    .cate-list{
        .title{
            background: #fff;
            text-align: center;
            margin: 0;
            padding: 0.2rem;
            height: 0.2rem;
            width: 100%;
            line-height: 0.2rem; transition: all 0.1s;
        }
        .title-fixed{
           height: 0;
        }
        .dec{
            font-size: 0.21rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                line-height: 0.21rem;
                letter-spacing:0.02rem;
                padding: 0.05rem;
                margin: 0;
                &:first-child{

                }
                 &:last-child{
                     color: red;
                }
            }
        }
    }
</style>