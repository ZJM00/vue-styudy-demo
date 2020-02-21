<template>
    <div>
        <breadcrumb></breadcrumb>
        <el-card>
            <div class="main" ref='echarts' style="width: 600px;height:400px;"></div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
        options: {
            title: {
                text: '用户来源'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#E9EEF3'
                }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            },
        }
    },
    async mounted() {
        let {data: res} = await this.$http.get('reports/type/1');
        let m = res.data;
        for (const key in this.options) {
           
           m[key] = this.options[key];
        }
        let myChart = this.$echarts.init(document.querySelector('.main'));
        myChart.setOption(m);
    },
}
</script>
<style lang="less">
    
</style>