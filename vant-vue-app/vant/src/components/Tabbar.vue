<template>
    <van-tabbar v-model="tabbarActive" class='tab' fixed :safe-area-inset-bottom=true>
      <van-tabbar-item icon="home-o" to='/home'>首页</van-tabbar-item>
      <van-tabbar-item icon="medal-o">专题</van-tabbar-item>
      <van-tabbar-item icon="qr" to='/category'>分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to='/buycard'>购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
	  </van-tabbar>
</template>

<script lang='ts'>
import {Vue,Component} from 'vue-property-decorator';

@Component
export default class Tabbar extends Vue{
  private tabbarActive = 0;
}
</script>

<style lang="less" scoped>
  .tab{
    position: fixed;
    bottom: 0;
    height: var(--tab-width);
  }
</style>