<template>
    <div class=" bra" >
        <span @click="changeFold" :class="[isFold?'is-active':'','fold']" > <i class="iconfont  iconfold"></i></span>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
            <transition-group name='breadcrumb-item'>
                <el-breadcrumb-item v-for="(item,index) in list" :key="index" 
                    :to="{'path': item.path}" >
                    {{item.title}}
                </el-breadcrumb-item>
            </transition-group>
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
                if(element.meta.father){
                    this.list.push({"title":element.meta.father.title,"path":element.meta.father.link})
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
    width: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin-bottom: 20px;
    .el-breadcrumb{
        width: auto;
        margin-left: 10px;
        margin-bottom: 0px;
        span{
            display: inline-block;
            width: auto;
            .el-breadcrumb__item{
                display: inline-block;
                position: relative;
                width: auto;
                span{
                    display: inline-block!important;
                    width: auto!important;
                }
              }
        }
        
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
    .breadcrumb-item
    .breadcrumb-item-enter-active {
        transition: all .3s ease;
    }
    .breadcrumb-item-leave-active {

        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .breadcrumb-item-enter, .breadcrumb-item-leave-to{
        opacity: 0;
    }
  
}
</style>