<template>
   <div class='cate'>
        <van-search v-model="seach" placeholder="请输入搜索关键词" />
        <van-tree-select  class='tree-select'
            :items="list"
            :main-active-index.sync="activeTreeSelect"
             height="calc( 100vh - var(--tab-width) - 54px)"
             width='0.5rem'
             @click-nav='getContent'
            >
            <template  slot="content">
                <van-skeleton
                    title
                    avatar
                    :row="1"
                    :loading="loading"
                    >
                    <van-image  fit="contain" :src="category[activeTreeSelect]['img_url']" lazy-load/>
                </van-skeleton>
             
                <van-grid   column-num="3" >
                    <van-grid-item :border="false" v-for="(item, index) in subCategoryList" 
                         :key="index"  :to="'/categoryList/' + item.id">
                        <van-image  fit="contain" :src="item.wap_banner_url" lazy-load/>
                        <p>{{item.name}}</p>
                    </van-grid-item>
                </van-grid>
            </template>
        </van-tree-select>
   </div>
</template>

<script lang='ts'>
import {Vue,Component} from 'vue-property-decorator';

@Component
export default class Category extends Vue{
    private seach:string = '';
    private list: unknown[] = [];
    private category = [];
    private subCategoryList:[] =[];
    private activeTreeSelect: Number = 0;
    private loading: boolean = true;
    private created() {
        this.getCate();
    }

    private async getCate() {
        let {data:res} = await this.$http.get(this.api.CatalogList);
        this.category = res.data.categoryList;
        this.loading = false;
        res.data.categoryList.forEach(item => {
            this.list.push({text:item.name})
        });
       
        
        this.subCategoryList = res.data.currentCategory.subCategoryList;
    }
    private  async getContent(index:number) {
        let id:any = this.category[index]['id'];console.log(id);
        let {data:res} = await this.$http.get(this.api.CatalogCurrent,{params:{id}});
        this.subCategoryList = res.data.currentCategory.subCategoryList;
        
       
    }

    
    
}
</script>

<style lang="less" scoped>
.cate{
   overflow-y: none;
}
    .sidebar{
        margin-top: 0.1rem;
    }
    .van-sidebar{
      
    }

</style>