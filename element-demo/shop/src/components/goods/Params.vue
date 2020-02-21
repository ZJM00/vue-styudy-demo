<template>
    <div>
        <breadcrumb></breadcrumb>
        <el-card>
            <el-alert title="注意: 只能选择第三级分类设置相关参数"  type="warning"   show-icon></el-alert>
            <div class="block">
                <span class="cas-label">选择商品类别 :</span>
                <el-cascader ref="elCascade" v-model="elKey" 
                    :options="categories.data" :props=" paramsProps" 
                    clearable @change='handChange' >
                </el-cascader>
            </div>
            <el-tabs v-model="activeName">
                 <el-button type="primary" class="bt" :disabled=elDisab @click="addParams">添加参数</el-button>
                <el-tab-pane label="动态属性" name="many">
                    <el-table :data="manyList"  border  style="width: 100%">
                        <el-table-column type="expand" style="width:20%">
                            <template v-slot='scoped'>
                                <template>
                                    <el-tag  closable v-for="(item,index) in scoped.row.attr_vals" :key="index" @close="addTagClose([scoped.row,index])">{{item}}</el-tag>
                                    <el-input class="input-new-tag"  v-if="scoped.row.inputVisible"   v-model="scoped.row.inputValue"
                                        ref="tagInput"   @keyup.enter.native="handleInputConfirm([scoped.row])"
                                        @blur="handleInputConfirm([scoped.row])">
                                    </el-input>
                                    <el-button v-else class="button-new-tag" size="small" @click="showInput([scoped.row])">+ New Tag</el-button>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="attr_name" label="参数名称"  >  </el-table-column>
                        <el-table-column  label="操作"  > 
                            <template v-slot='scoped'>
                                <el-button type="primary" icon="el-icon-edit" @click="setPam(scoped.row,scoped.$index)">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" @click="delet(scoped.row.attr_id,scoped.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态管理" name="only">
                      <el-table :data="onlyList"  border  style="width: 100%">
                        <el-table-column type="expand" style="width:20%">
                            <template v-slot='scoped' >
                                 <template>
                                    <el-tag  closable v-for="(item,index) in scoped.row.attr_vals" :key="index" @close="addTagClose([scoped.row,index])">{{item}}</el-tag>
                                    <el-input class="input-new-tag"  v-if="scoped.row.inputVisible"   v-model="scoped.row.inputValue"
                                        ref="tagInput"   @keyup.enter.native="handleInputConfirm([scoped.row])"
                                        @blur="handleInputConfirm([scoped.row])">
                                    </el-input>
                                    <el-button v-else class="button-new-tag" size="small" @click="showInput([scoped.row])">+ New Tag</el-button>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="attr_name" label="属性名称"  >  </el-table-column>
                        <el-table-column  label="操作"  > 
                            <template v-slot='scoped'>
                                <el-button type="primary" icon="el-icon-edit" @click="setPam(scoped.row,scoped.$index)">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" @click="delet(scoped.row.attr_id,scoped.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-dialog  :title='"添加" + titleText + "参数"'  :visible.sync="addDialog"  v-if='addDialog'
                @close=close  width="30%" class="dialog" :style="{height: heightDia}">
            <div class="form">
                <div class="el-add">
                    <div class="title">{{titleText}}参数: </div>
                    <div class="el">
                        <el-input v-model="addValue" class="el-bt" placeholder="请输入内容" clearable ></el-input>   
                    </div>
                   
                </div>
                <div class="el-add">
                    <div class="title">样式参数:</div>
                    <div class="el" >
                        <el-input  class="input-new-tag"  v-if="inputTagsVisible"  v-model="inputTagsValue"
                            ref="saveTagInput"  @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"></el-input>
                        <el-button v-else class="button-new-tag"  @click="showInput">+ 增加</el-button>
                    </div>
                </div>
                <div class="add-tag">
                    <template >
                        <el-tag type='warning' :key="index"  v-for="(tag,index) in addTags"  closable :disable-transitions="false"
                            @close="addTagClose(index)">{{tag}} </el-tag>
                    </template>
                </div>
                
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false;">取 消</el-button>
                <el-button type="primary" @click="addDialogParams">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            elKey:[],
            categories:{},
            paramsProps: {
                expandTrigger: "hover",
                value: `cat_id`,
                label: "cat_name",
            },
            activeName:"many",
            manyList:[],
            onlyList: [],
            elDisab: true,
            addDialog: false,
            addValue:'',
            addTags:[],
            inputTagsVisible: false,
            inputTagsValue: '',
            htDia: 30,
            setInfo: {
                id:'',
                index:'',
                row:'',
            },
            addOrSet: true,
        }
    },
    computed: {
        // eslint-disable-next-line vue/no-dupe-keys
        titleText() {
             return this.activeName == 'many'?'动态': '静态';
        },
        // eslint-disable-next-line vue/return-in-computed-property
        heightDia() {
            if(this.addTags.length > 5) {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                return `calc(100% + ${this.htDia += 30}px)`;
            }
        }
    },
    created() {
        this.getCe().then(res => {
            if(res.meta.status !=  200) return this.$message.error("获取数据失败");
            this.categories = res;
        });
    },
    methods: {
        ...mapActions({
            getCe: 'getCategories' 
        }),
        async getList(id,sel,status=200,err='获取数据失败') {
            try {
                let res = await this.$http.get(`categories/${id}/attributes`,{params:{"sel":sel}});
                if(res.data.meta.status != status) return  this.$message.error(err);
                res.data.data.forEach(item => {
                    if(item.attr_vals.length > 0){
                        item.attr_vals = item.attr_vals.split(/,/g);
                    }else{
                        item.attr_vals = [];
                    }
                    item.inputVisible = false;
                    item.inputValue =''; 
                });
                return res.data.data;
            } catch (error) {
                return  this.$message.error(error);
            }
            

        },
        async handChange(val) { 
                   
            if(val.length > 2 ) {
                this.manyList  = await this.getList(val[2],'many',200);
                this.onlyList = await this.getList(this.elKey[2],'only',200);
                this.elDisab = false;
                // this.$http.get(`categories/${val[2]}/attributes`,{params:{"sel":this.activeName}}).then( res => {
                //     if(res.data.meta.status != 200) return Promise.reject(res.data.meta);
                //     this.manyList = res.data.data;
                // }).catch( err => {
                //    this.$message.error('获取数据失败')
                // });
               
            } else{
                this.$message.warning('请选择三级分类');
                this.elDisab = true;
                this.manyList  = [];
                this.onlyList = [];
            }
        },
        addParams() {
            this.addDialog = true;
        },
        async addDialogParams() { 
            if( this.addValue == '') return  this.$$message.info(`亲请填写${this.titleText}参数`);
            let info = {
                    attr_name: this.addValue,
                    attr_sel: this.activeName,
                    attr_vals: this.addTags.join(','),
                };  
            let id = this.elKey[2];
            if(this.addOrSet) {
                let {data: res} = await this.$http.post(`categories/${id}/attributes`,info);
                if(res.meta.status != 201) return this.$message.error('创建失败');
                this.$message.success('创建成功');
                this.addTags = [];
                this.addValue = '';
                if(this.activeName == 'many') {
                    this.manyList.push(res.data);
                }else{
                    this.onlyList.push(res.data);
                }
            }else{
                let {data: res} = await this.$http.put(`categories/${id}/attributes/${this.setInfo.id}`,info);
                if(res.meta.status != 200) return this.$message.error('更新失败');
                this.addTags = [];
                this.addValue = '';
                if(res.data.attr_vals.length > 0){
                    res.data.attr_vals = res.data.attr_vals.split(/,/g);
                }else{
                    res.data.attr_vals = [];
                }
                if(this.activeName == 'many') {
                    this.manyList.splice(this.setInfo.index,1,res.data)
                    //this.manyList[this.setInfo.index] = res.data; 
                   
                }else{
                    this.onlyList.splice(this.setInfo.index,1,res.data)
                    //this.onlyList[this.setInfo.index] = res.data;
                    
                }  
                this.setInfo.id = '';
                this.setInfo.index = '';
                this.addOrSet = true;
                this.$message.success('更新成功');
            }
            this.addDialog = false;
        },
        async addTagClose(index) {
            if(!isNaN(index)){
                this.addTags.splice(index,1);
            }else{
                index[0].attr_vals.splice(index[1],1);
                let info = {
                        attr_name: index[0].attr_name,
                        attr_sel: this.activeName,
                        attr_vals: index[0].attr_vals.length > 0?index[0].attr_vals.join(','):'',
                };  
                let {data: res} = await this.$http.put(`categories/${this.elKey[2]}/attributes/${index[0].attr_id}`,info);
                if(res.meta.status != 200) return this.$message.error('更新失败');
            }

        },
        showInput(arr) {
            if(Array.isArray(arr)) {
                arr[0].inputVisible = true;
                this.$nextTick(_ => {   
                    this.$refs.tagInput.$refs.input.focus();
                });
            }else{
                this.inputTagsVisible = true;  
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            }
            
        },
        async handleInputConfirm(row) {
            if(Array.isArray(row)){
                if (row[0].inputValue != ''){
                    row[0].attr_vals.push(row[0].inputValue);
                    let info = {
                        attr_name: row[0].attr_name,
                        attr_sel: this.activeName,
                        attr_vals: row[0].attr_vals.join(','),
                    };  
                    let {data: res} = await this.$http.put(`categories/${this.elKey[2]}/attributes/${row[0].attr_id}`,info);
                    console.log(res)
                    if(res.meta.status != 200) return this.$message.error('更新失败');
                    
                }  
                row[0].inputValue = '';
                row[0].inputVisible = false;
            }else{
                let inputValue = this.inputTagsValue;
                if (inputValue) {
                    this.addTags.push(inputValue);
                }
                this.inputTagsVisible = false;
                this.inputTagsValue = '';
             }
           
        },
        delet(id,index){
            this.$confirm('此操作将永久删除属性, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let {data:res} = await this.$http.delete(`categories/${this.elKey[2]}/attributes/${id}`);
                if(res.meta.status != 200) return  this.$message.error("删除失败");
                if(this.activeName == 'many'){
                    this.manyList.splice(index,1)
                }else{
                    this.onlyList.splice(index,1);
                }
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        setPam(row,index){
           this.setInfo.id = row.attr_id;
           this.setInfo.index = index;
           if(this.activeName == 'many'){
                this.addValue = this.manyList[index].attr_name;
                if(this.manyList[index].attr_vals){
                    this.addTags = this.manyList[index].attr_vals.concat();
                }else{
                    this.addTags = [];
                }
              
           }else{
                this.addValue = this.onlyList[index].attr_name;
                if(this.onlyList[index].attr_vals){
                    this.addTags = this.onlyList[index].attr_vals.concat();
                }else{
                     this.addTags = [];
                }
           }
           this.addDialog = true;
           this.addOrSet = false;
       },
       close() {
            this.setInfo.id = '';
            this.setInfo.index = '';
            this.addOrSet = true;
            this.addTags = [];
            this.addValue = '';
       }
    },
}
</script>
<style lang="less" scoped>
.el-card{
    padding: 0 20px 20px 20px;
}
.block{ 
    text-align: left;
    padding: 20px 0;
    .cas-label{
        font-size: 16px;
        font-weight: 500;
        padding: 5px;
        margin-right: 15px;
        width: auto;
    } 
    .el-cascader{
        width: 250px;
    }
    
}
.el-tag{
    margin: 5px 10px;
}
.bt{
    display: flex;
    justify-content: flex-start;
    text-align: left;
    margin: 10px;
}
.dialog{
    height: auto;
    min-width:1400px;
    transition: all 0.5s;
    .form{  
        .el-add{   
            height: 60px;
            width: 100%;
            .title{
                display: inline-block;
                width: 30%;
                padding: 0 10px;
                font-size: 16px;
                font-weight: 500;
                text-align: right;
                line-height: 60px;
            }
            .el{
                display: inline-block;
                width: 50%;
                padding: 10px;
            }
            
        }
        &:last-child{
              text-align: left;
        }
    }
    
 
}
.el-tag{
      font-size: 14px;
}
.el-tag + .el-tag {
  
    margin-left: 10px;
   
}
.button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
}
</style>