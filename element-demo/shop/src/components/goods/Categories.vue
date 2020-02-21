<template>
  <div>
    <breadcrumb></breadcrumb>
    <el-card>
      <el-button type="primary" style="margin-bottom:20px;" @click="addDialog">添加分类</el-button>
      <zk-table
        ref="table"
        :data="list"
        sum-text="sum"
        :selection-type="false"
        :expand-type="false"
        :columns="columns"
        :border="true"
        :show-row-hover="false"
        :show-index="true"
        index-text="#"
        :is-fold="isFold"
      >
        <template #isok="scope">
          <i :class="[scope.row.cat_deleted?'el-icon-circle-close red':'el-icon-check gn' ]"></i>
        </template>
        <template #orden="scope">
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level == 1">二级</el-tag>
          <el-tag type="danger" v-else>三级</el-tag>
        </template>
        <template #opt="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="setGd(scope.row)">编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteGoods(scope.row)"
          >删除</el-button>
        </template>
      </zk-table>
      <el-pagination
        style="margin-top:20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 编辑分类 -->
    <el-dialog title="编辑分类" :visible.sync="setGood" width="30%">
      <p>
        <span>商品名称:</span>
        <el-input v-model="setGoodInfo.name" class="el-bt" clearable></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setGood = false">取 消</el-button>
        <el-button type="primary" @click="setgd">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="addDiaGood" width="30%" @close="resetAdd">
      <div class="block">
        <span>分类名称:</span>
        <el-input v-model=" addGoodsName" class="el-bt" clearable></el-input>
      </div>
      <div class="block">
        <span class="demonstration">父类别:</span>
        <el-cascader
          ref="elCascade"
          v-model="addKey"
          :options="addCeList"
          :props="addProps"
          class="el-bt"
          clearable
          @change="addChange"
        ></el-cascader>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDiaGood = false">取 消</el-button>
        <el-button type="primary" @click="addsubmitGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      list: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 10
      },
      total: 0,

      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok"
        },
        {
          label: "排序",
          type: "template",
          template: "orden"
        },
        {
          label: "操作",
          type: "template",
          template: "opt"
        }
      ],
      isFold: true,

      setGood: false,
      setGoodInfo: {
        id: "",
        name: ""
      },
      addGoodsName:'',
      addDiaGood: false,
      addCeList: [],
      addKey: "",
      addProps: {
        expandTrigger: "hover",
        value: `cat_id`,
        label: "cat_name",
        checkStrictly: true,
      },
      addInfo:{
        cat_name: '',
        cat_pid: 0,
        cat_level: 0,
      }
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    ...mapActions({
          getCe: 'getCategories' 
    }),
    async getCategories() {
      let res = await this.getCe(this.queryInfo);
      if (res.meta.status != 200) return this.$message.error("获取数据失败");
      this.total = res.data.total;
      this.list = res.data.result;
    },
    handleSizeChange(page) {
      let len = this.list.length;
      if (page < len) this.list.splice(page - 1, len - page);
      if (page >= len) {
        this.queryInfo.pagesize = 15;
        this.list = this.getCategories();
      }
      console.log(this.list);
    },
    handleCurrentChange(page) {
      this.queryInfo.pagenum = page;
      this.getCategories();
    },

    deleteGoods(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`categories/${row.cat_id}`).then(res => {
            if (res.data.meta.status != 200)
              return this.$message.error("删除失败");
            this.getCategories();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //编辑提交分类
    setGd(row) {
      this.setGood = true;
      this.setGoodInfo.name = row.cat_name;
      this.setGoodInfo.id = row.cat_id;
    },
    setgd() {
      if (!this.setGoodInfo.name) return (this.setGood = false);
      this.$http
        .put(`categories/${this.setGoodInfo.id}`, {
          cat_name: this.setGoodInfo.name
        })
        .then(res => {
          if (res.data.meta.status != 200)
            return this.$message.error("编辑失败");
          this.$message.success("编辑成功");
          this.getCategories();
          this.setGood = false;
        });
    },

    //添加分类
    addDialog() {
      this.addDiaGood = true;
      this.getAddCe();
    },
    async getAddCe() {
        let info = {
            type:2,
        }
        let { data: res } = await this.$http.get("categories", {
            params: info
        });
        if (res.meta.status != 200) return this.$message.error("获取数据失败");
        this.addCeList = res.data;
    },
    addChange(value) {
        let len = value.length;
        if( len > 0 ){
            this.addInfo.cat_pid = value[len - 1];
            this.addInfo.cat_level = len;
        }else{
            this.addInfo.cat_pid = 0;
            this.addInfo.cat_level = 0;
        }
    },
    addsubmitGoods() {
        this.addInfo.cat_name = this.addGoodsName;
        if(this.addGoodsName != '') {
            this.$http.post('categories',this.addInfo).then(res => {

                if(res.data.meta.status!= 201) return this.$message.error('创建类别失败');
                this.$message.success('创建成功')
                this.getCategories();
                this.getAddCe();  
                this.addDiaGood = false;
            });
        }else{
            this.addInfo.cat_name = '';
            this.addInfo.cat_pid = 0;
            this.addInfo.cat_level = 0;
            this.addDiaGood = false;
        }
       
       
    },
    resetAdd() {
        this.addGoodsName = '';
        this.addInfo.cat_name = '';
        this.addInfo.cat_pid = 0;
        this.addInfo.cat_level = 0;
        this.addKey = '';
    }
  }
};
</script>
<style lang="less" scope>
.gn {
  font-size: 16px;
  background-color: lightgreen;
  border-radius: 50%;
}
.red {
  font-size: 16px;
  background-color: red;
  border-radius: 50%;
}
.el-bt {
  width: 200px;
}
.block {
  margin: 10px 0;
  span {
    display: inline-block;
    padding: 0 15px;
    width: 80px;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>