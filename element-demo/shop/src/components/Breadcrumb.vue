<template>
    <div class=" bra" >
        <span @click="changeFold" :class="[isFold?'is-active':'','fold']" > <i class="iconfont  iconfold"></i></span>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in list" :key="index" :to="{'path': item.path}" >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
  
</template>
<script>
export default {
    name:"breadcrumb",
    data() {
        return {
            list: [],
            isFold:false,
        }
    },
    created() {
       this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb() {
            
            let matched =  this.$route.matched;
            matched.forEach(element => {
                if(element.meta.upperLevel){
                    this.list.push({"title":element.meta.upperLevel})
                }
                this.list.push({"title":element.meta.title,"path": element.path})
            });

        },
        changeFold() {
            this.isFold = !this.isFold;
            this.$bus.$emit('upFold',this.isFold);

        },
    },

}
</script>
<style lang="less" scoped>
.bra{

    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
     margin-bottom: 20px;
    .el-breadcrumb{
        margin-left: 10px;
         margin-bottom: 0px;
    }
    .fold{
        cursor: pointer;
        transform: rotate(180deg);
        transition: all 0.5s;
        i{
            font-size: 20px;
            font-weight: 300;
        }
        
    }
    .is-active{
        transform: rotate(90deg);
    }
}
</style>