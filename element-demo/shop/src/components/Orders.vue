<template>
  <div>
    <breadcrumb></breadcrumb>
    <el-card class="card">
      <!-- <div class="text item">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              v-model="queryInfo.query"
              class="input-with-select"
              clearable
              @clear="clear"
              @input="inp"
            >
              <el-button slot="append" icon="el-icon-search" @click="getList()"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div> -->
      <el-table :data=" list" border style="margin:20px 0;" stripe>
        <el-table-column type="index" align="center" idnex="#"></el-table-column>
        <el-table-column prop="order_number" label="订单编号  "></el-table-column>
        <el-table-column prop="order_price" label=" 订单价格" width="100px" align="center"></el-table-column>
        <el-table-column prop="order_pay" label=" 是否付款" width="100px" align="center">
            <template v-slot=scoped>
                <el-tag type="danger" v-if='scoped.row.order_pay == 0?true:false'>未付款</el-tag>
                <el-tag type="success" v-else>已付款</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="is_send" label=" 是否发货" width="100px" align="center"></el-table-column>
        <el-table-column label="下单时间 " width="300px" align="center">
          <template v-slot="scope">{{scope.row.create_time | dataFoemat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150px" align="center">
          <template v-slot="scope">
            <!-- 修改角色按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改地址"
              placement="top"
              :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="dialogVisible = true"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="物流地址" placement="top" :enterable="false">
              <el-button
                type='success'
                icon="el-icon-location-information"
                @click="logistics"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="page_sizes"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalpage"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="编辑商品"
      :visible.sync="dialogVisible"
      width="29%">
      <el-form ref='cityForm' label-position='center'>
        <el-form-item label="修改地址" class='adress' >
          
            <el-cascader
              clearable
              filterable
              v-model="city"
              :options="cityData"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
        </el-form-item >
        <el-form-item label="详细地址" class='adress' >
         
          <el-input
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 4}"
            v-model="cityAdress">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

     <el-dialog
      title="物流信息"
      :visible.sync="LogisticsDia"
      width="40%">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="LogisticsDia = false">取 消</el-button>
        <el-button type="primary"  @click="LogisticsDia = false">确 定</el-button>
      </span>
    </el-dialog>


    
  </div>
</template>
<script>
import cityData from './../assets/citydata.js'
export default {
  data() {
    return {
      queryInfo: {
        query: "", // 查询参数
        pagenum: 1, // 当前页码
        pagesize: 10 // 每页显示条数
      },
      list: [],
      totalpage: 0, //总数据条数,
      page_sizes: [5,10,15],//每页显示个数选择器的选项设置
      cityData: cityData,
      city:[],
      cityAdress:'',
      dialogVisible: false,
      LogisticsDia: false,
      activities:[],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let { data: res } = await this.$http.get("orders", {
        params: this.queryInfo
      });
      if (res.meta.status != 200) return this.$message.error("更新用户状态失败");
      this.list = res.data.goods;
      this.totalpage = res.data.total;
    },
    // inp() {
    //   if (this.queryInfo.query == "") this.getList();
    // },
    // clear() {
    //     this.queryInfo.query = 'itcast-g7kmck725jaujgdts';

    //     this.getList();
    //     console.log(this.list)
    // },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getList();
    },
    //currentPage(当前页) 改变时会触发
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getList();
    },
    handleChange(val) {

    },
    async logistics(){
      let { data: res } = await this.$http.get(`kuaidi/804909574412544580`)
      this.activities = res.data;
      this.LogisticsDia = true;
    },
  },
  filters: {
    dataFoemat(val) {
      let t = new Date(val);
      let y = t.getFullYear();
      let m = (t.getMonth() + 1 + "").padStart(2, "0");
      let d = (t.getDate() + "").padStart(2, "0");
      let hh = (t.getHours() + "").padStart(2, "0");
      let mm = (t.getMinutes() + "").padStart(2, "0");
      let ss = (t.getSeconds() + "").padStart(2, "0");
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
  }
};
</script>
<style lang="less" scope>
.adress{
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  min-width: auto;
  flex:1;
  .el-form-item__label{
    width: 25%;
    text-align: right;
    
  }
  .el-form-item__content{
    flex-grow: 1;  
    text-align: left;
    .el-textarea{
     width: 90%;
       min-width: auto;
    }
    .el-cascader{
      width: 90%;
      white-space: nowrap;
       min-width: auto;
    }
 
  }
}
.el-timeline-item__wrapper{
  text-align: left!important;
}
</style>