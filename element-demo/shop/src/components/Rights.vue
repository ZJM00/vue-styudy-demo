<template>
    <div>
        <breadcrumb></breadcrumb>
        <el-card class="box-card" stripe>
            <el-table :data="list" border style="width: 100%" stripe>
                <el-table-column type='index'>
                </el-table-column>
                <el-table-column prop="authName" label="权限名称">
                </el-table-column>
                <el-table-column prop="path" label="类别">
                </el-table-column>
                <el-table-column prop="level" label="权限等级">
                    <template v-slot='scoped'>
                        <el-tag v-if='scoped.row.level == 0'>等级一</el-tag>
                        <el-tag type="success" v-else-if="scoped.row.level == 1">等级二</el-tag>
                        <el-tag type="danger"  v-else>等级三</el-tag>
                    </template>
                </el-table-column>
                </el-table>
            </el-card>
    </div>
</template>
<script>
export default {
    name: 'rights',
    data() {
        return{
             list: [],
        }
    },
    created() {
        this.getList();
    },
    methods: {
        async getList() {
            let {data: res} = await this.$http.get(`rights/list`);
            console.log(res)
            this.list = res.data;
        }
    },


}
</script>
<style lang="less" scoped>

</style>