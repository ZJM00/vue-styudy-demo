<template>
  <div>
    <breadcrumb></breadcrumb>
    <el-card class="card">
      <div class="text item">
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
          <el-col :span="4">
            <el-button type="primary" @click="$router.push('/home/add')">添加商品</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data=" list.goods" border style="margin:20px 0;" stripe>
        <el-table-column type="index" align="center" idnex="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称  "></el-table-column>
        <el-table-column prop="goods_price" label=" 商品价格(元)" width="100px" align="center"></el-table-column>
        <el-table-column prop="goods_weight" label=" 商品重量" width="100px" align="center"></el-table-column>
        <el-table-column prop="goods_number" label=" 商品个数" width="100px" align="center"></el-table-column>
        <el-table-column prop="add_time" label="创建时间 " width="210px" align="center">
          <template v-slot="scope">{{scope.row.add_time | dataFoemat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150px" align="center">
          <template v-slot="scope">
            <!-- 修改角色按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="商品编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editDialog(scope.$index)"
              ></el-button>
            </el-tooltip>

            <!-- 删除角色 -->
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteGoods(scope.row,scope.$index)"
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
      width="40%">
      <el-form  ref="editorFormRef" :model="ediorForm" :rules='ediorRules'>
          <el-form-item label="商品名称" prop='goods_name'>
                <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="ediorForm.goods_name">
            </el-input>
          </el-form-item>
          <el-form-item label="商品价格(元)" prop='goods_price'>
              <el-input v-model="ediorForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop='goods_weight'>
              <el-input v-model="ediorForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop='goods_number'>
              <el-input v-model="ediorForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品描述"> 
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="ediorForm.goods_introduce">
            </el-input>
           </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="editorGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
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
      page_sizes: [10, 50, 100, 300],//每页显示个数选择器的选项设置
      ediorForm:{
        goods_id:"",
        goods_name :'',                                                                                  
        goods_price:'',                                                                                        
        goods_number :'',                                                                                     
        goods_weight :'',
        goods_introduce :'',
      },
      ediorRules:{
          goods_name: [
              { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          goods_price: [
              { required: true, message: '请填写商品价格', trigger: 'blur' }
          ],
          goods_number: [
              { required: true, message: '请填写商品数量', trigger: 'blur' }
          ],
          goods_weight: [
              {required: true, message: '请填写商品重量', trigger: 'blur' }
          ],
      },
      dialogVisible: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let { data: res } = await this.$http.get("goods", {
        params: this.queryInfo
      });
      if (res.meta.status != 200) return this.$message.error("更新用户状态失败");
      this.list = res.data;
      this.totalpage = res.data.total;
    },
    inp() {
      if (this.queryInfo.query == "") this.getList();
    },
    clear() {
      this.getList();
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getList();
    },
    //currentPage(当前页) 改变时会触发
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getList();
    },
    deleteGoods(row, index) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
        .then( async  () => {
            let { data: res } = await this.$http.delete(`goods/${row.goods_id}`);
            if (res.meta.status != 200) return this.$message.error("删除失败");
            this.$message({
                type: "success",
                message: "删除成功!"
            }); this.getList();
        })
        .catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除"
            });
        });
    },
    editDialog(index){
      let list = this.list.goods[index];
      for (const key in this.ediorForm) {
            this.ediorForm[key] = list[key];  
      }
      this.dialogVisible = true;
    },
    editorGoods() {
      let info = {};
       for (const key in this.ediorForm) {
          info[key] = this.ediorForm[key];  
      }
      delete info.goods_id;
      info.pics = [];
      info.attrs = [];
      info.goods_cat = ' 1,2 ,3 ';
      console.log(info)
      this.$refs.editorFormRef.validate(async (valid) => {
        if(!valid) return this.$message.error('请重新填写');
        let { data: res } = await this.$http.put(`goods/${this.ediorForm.goods_id}`,info);
        console.log(res)
        if (res.meta.status != 200) return this.$message.error("更新商品信息失败");
        this.getList();
        this.dialogVisible = false;
      })
    }
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
</style>