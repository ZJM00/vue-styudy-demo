<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in list" :key="index" :to="{'path': item.path}" >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    name:"breadcrumb",
    data() {
        return {
            list: [],
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

        }
    },

}
</script>
<style lang="less" scoped>
</style>