<template>
  <div class='home'>
    <div class="title">
      <img
        src="https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/indexLogo-a90bdaae6b.png?imageView&type=webp"
        alt />
      <van-search v-model="seach" :placeholder="'全网' + count+'万好货'" />
    </div>
    <van-swipe :autoplay="3000" class="swiper">
      <van-swipe-item v-for="(item, index) in swiperList" :key="index">
        <img v-lazy="item.image_url" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num='gridLength' :border='false'>
      <van-grid-item 
	  	v-for="(item,index) in list.channel"
		:key="index" 
		:icon="item.icon_url" 
		:text="item.name" 
		square  
		/>
    </van-grid>
	<template>
		<van-panel title="品牌制造商直供"  class="brand-list">
			<van-grid column-num=2 :border='false' :gutter='1'>
				<van-grid-item v-for="(item,index) in list.brandList" :key="index">
					<van-image :src="item.new_pic_url"  fit="cover" lazy-load/>
					<div class="desc">
						<span>{{item.name}}</span>
						<span>{{item.floor_price}}元</span>
					</div>

				</van-grid-item>
			</van-grid>
		</van-panel>
	</template>
	<div class="new-goods">
		<van-panel title="周一周四-新品首发" >
			<van-grid column-num=2  :gutter='5'  :border='false'>
				<van-grid-item v-for="(item,index) in list.newGoodsList" :key="index">
					<van-image :src="item.list_pic_url"  fit="cover" lazy-load/>
					<div class="desc">
						<span>{{item.name}}</span>
						<span>￥ {{item.retail_price}}元</span>
					</div>

				</van-grid-item>
			</van-grid>
		</van-panel>
	</div>
	<div class="hot-goods">
		<van-panel title="人气推荐"  text-align=center>
			<van-card
			 	v-for="(item,index) in list.hotGoodsList" :key="index"
				:price="item.retail_price +'.00'"
				:desc='item.goods_brief'
				:title="item.name"
				:thumb="item.list_pic_url"
			/>

		</van-panel>
	</div>


	
	
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class className extends Vue {
  //data
  private seach: string = "";
  private list: any = "";
  private gridLength:number = 0;
  private count:number = 0;

  //methods
  private async getInfo() {
    let { data: res } = await this.$http.get(this.api.IndexUrl);
    // this.data = res.data;
    return res.data;
  }
  // computed
  get swiperList() {
    if (this.list != undefined) {
      return this.list.banner;
    } else {
      return [];
    }
  }

  // 生命周期函数
  async created() {
	this.list = await this.getInfo();
	this.gridLength = this.list.channel.length;
	let {data:res} = await this.$http.get(this.api.GoodsCount);
	this.count = res.data.goodsCount;
  }
}
</script>

<style lang="less" scoped>
.home{
	height: 200%;	
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.21rem 0.4rem;
  flex-grow: 1;
  background-color: #ffffff;
  img {
    width: auto;
    height: 0.28rem;
    background-size: cover;
    padding-right: 0.1rem;
  }
  .van-search {
    padding: 0;
    flex-grow: 2;
    .van-cell {
      display: flex;
      justify-content: center;
      line-height: 0.28rem;
    }
  }
}
.van-swipe {
  height: 2.77765625rem;
  img {
    width: 100%;
    height: auto;
  }
  i {
    width: 0.2rem;
  }
}
.vant-grade(){
	margin-top:2px;
	.van-cell__title{
		text-align: center;
	}
	.van-grid-item{
		.van-grid-item__content{
			padding: 0!important;
		}
	}	
}
.brand-list{
	.vant-grade();
	.desc{
		font-size: 0.23rem;;
		position: absolute;
		left: 6%;
		top:10%;
		span{
			padding: 10px;
			&:last-child{
				display: block;
				color: #999;
			}
		}
		&:after{
			clear: both;
			height: 0;
			display: block;
		}
	}
}
.new-goods{
	.vant-grade();
	.van-grid-item{
		width: 50%;
		border-bottom: 1px solid #eee;
		&:nth-child(odd){
			border-right: 1px solid #eee;
			
		}
	}	
	.desc{
		font-size: 0.21rem;;
		position: unset;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
		span{
			&:last-child{
				color: red;
			}
		}
	}
}
.hot-goods{
	.vant-grade();
	.van-card__price{
		color: red;
	}

  
}
.tabber{
	// position: fixed;
	// bottom:0;
}
</style>