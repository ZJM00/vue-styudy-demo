<template>
    <div>
        <breadcrumb></breadcrumb>
        <el-card class="card">
            <h3 style="margin:10px 0;">添加商品信息</h3>
            <el-steps :active="stepActive" finish-status="success"  align-center style="margin:20px 0 30px 0;">
                <el-step v-for='(item,it) in elInfo'  :key='it' :title="item"></el-step>
            </el-steps>
                <el-tabs tab-position="left"  v-model="tabPane" :before-leave='tagsbeforeLeave'>
                    <el-tab-pane label="基本信息" name='0' class="base-form">
                        <el-form  ref="baseFormRef" :model="baseForm" :rules='baseRules' label-position='left'>
                            <el-form-item label="商品名称" prop='goods_name'>
                                <el-input v-model="baseForm.goods_name"></el-input>
                            </el-form-item>
                            <el-form-item label="商品价格(元)" prop='goods_price'>
                                <el-input v-model.number="baseForm.goods_price"></el-input>
                            </el-form-item>
                            <el-form-item label="商品重量" prop='goods_weight'>
                                <el-input v-model.number="baseForm.goods_weight"></el-input>
                            </el-form-item>
                            <el-form-item label="商品数量" prop='goods_number'>
                                <el-input v-model.number="baseForm.goods_number"></el-input>
                            </el-form-item>
                            <el-form-item label="商品分类" prop='goods_cat'   status-icon>
                                    <el-cascader style="width:40%" clearable
                                        v-model="baseForm.goods_cat"
                                        :options="options"
                                        :props="{ expandTrigger: 'hover',value: 'cat_id', label: 'cat_name'}"
                                        @change="handleChange"></el-cascader>
                            </el-form-item>
                            <el-form-item >
                                <div class="bt">
                                    <el-button type="success" :disabled='baseBt' @click="nextStep"> 下一步</el-button>
                                    <el-button type="info" @click='reset("baseFormRef")'>重置</el-button>
                                </div>
                              
                            </el-form-item>
                            
                        </el-form>
                    </el-tab-pane>
                     <el-tab-pane label="商品参数" name='1' class="tab-check">
                      
                        <div v-for="(item,index) in manyList" :key="index"> 
                            <hr v-if='index %2 == 0?false:true' style="margin:20px 0px 10px 0;border:1px solid #dcdfe6;">
                            <p style="padding:10px 0;fontSize:16px;">{{item.attr_name}}</p>
                            <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="handleCheckAllChange(item.checkAll,index)" v-if="item.attr_vals.length > 0?true:false">全选</el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group   v-model="item.checkAttr" @change="handleCheckAttarChange(item.checkAttr,index)" >
                                <el-checkbox border v-for="(ele,id) in item.attr_vals" :key='id' :label='ele'>{{ele}}</el-checkbox>
                            </el-checkbox-group>
                        </div>   
                        <el-button type="success"  @click="nextStep" style="margin: 20px 0;">下一步</el-button>
                    </el-tab-pane>
                     <el-tab-pane label="商品属性" name='2' class="only-form">
                        <p v-if='onlyList.length >0?true:false'>暂无数据</p>
                        <el-form  ref="onlyFormRef" >
                            <el-form-item v-for='(item,index) in onlyList' :key='index' :label="item.attr_name" :prop='item.attr_name'>
                                <el-input v-model="item.attr_vals"></el-input>
                            </el-form-item>
                             <el-button type="success" :disabled='baseBt' @click="nextStep"> 下一步</el-button>
                            <el-button type="info" @click='reset("baseFormRef")'>重置</el-button>
                        </el-form>
                    </el-tab-pane>
                     <el-tab-pane label="商品图片" name='3'>
                        <el-upload
                            class="upload-demo" :on-preview="handlePreview"
                            drag  :on-remove="handleRemove" :on-success='handleSuccess'
                            :action='updataUrl' list-type='picture'
                            multiple :headers="headOb">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <el-button type="success" :disabled='baseBt' @click="nextStep"> 下一步</el-button>
                    </el-tab-pane>
                     <el-tab-pane label="商品内容" name='4'>
                        <quill-editor v-model="content">
                        </quill-editor>
                        <el-button type="primary"  @click="addGoods" style="margin:10px 0;">添加商品</el-button>
                    </el-tab-pane>
                </el-tabs>
                <el-dialog
                    title="图片预览"
                    :visible.sync="dialogVisible"
                    width="50%">
                    <img :src='previewImg' alt="" width="100%;">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
                </el-dialog>
           
           
        </el-card>
    </div>
</template>
<script>
//富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    data() {
        let catVia = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请选择商品分类'));
            }
            callback();
        }
        return {
            elInfo: ['基本信息','商品参数','商品属性','商品图片','商品内容'],
            tabPane: '0',
            baseForm:{
                goods_name :'',                                                                                  
                goods_price:'',                                                                                        
                goods_number :'',                                                                                     
                goods_weight :'',
                goods_cat:[],
            },
            pics:[],
            previewImg:'',
            contentEditor:'',
            baseRules:{
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
                goods_cat: [
                    { type: 'array',required: true, validator: catVia, trigger: 'blur' }
                ],
            },
            options:[],
            manyList: [],
            onlyList:[],
            onlyForm:{},
            onlyRules:[],
            updataUrl: "http://127.0.0.1:8888/api/private/v1/upload",
            updataFile:[],
            headOb:{
                Authorization: window.sessionStorage.getItem('token')
            },
            dialogVisible: false,
            content:"",
        }
    },
    computed: {
        stepActive() {
            return this.tabPane - 0;
        },
       // eslint-disable-next-line vue/return-in-computed-property
       baseBt() {
           let len = Object.keys(this.baseForm).length;
           let k = 0;
           for (const key in this.baseForm) {
               if (this.baseForm[key] != '') {
                   ++k;
               }
           }
           if(k == len){
                this.getManyList(); 
                this.getOnlyLisy();
               return false;
           }else{
               return true;
           }
       },
       // eslint-disable-next-line vue/return-in-computed-property
       catId(){
           if(this.baseForm.goods_cat.length > 2 ) {
               return this.baseForm.goods_cat[2];
           }
       }
    },
    created() {
        this.getCategories();
    },
    methods: {
        
        getCategories() {
           this.$store.dispatch('getCategories').then( res => {
                if(res.meta.status != 200) {return this.$message.error("获取数据失败");}
                this.options = res.data;
            }).catch( err => {
                return this.$message.error("获取数据失败");
            });
        },
        handleChange(val) {
          
            if(val.length < 3 ) {
                this.baseForm.good_cats = [];
                this.$message.warning('请选择三级分类');
            }
        },
        formvalidate(ref) {
            let k ='';
            this.$refs[ref].validate((valid) => {
                if(!valid) {
                    k = false;
                }else{
                    k = true;
                }
            });
            return k;
        },
        tagsbeforeLeave(n,old){
            return this.formvalidate('baseFormRef');
        },
        nextStep() {
            this.tabPane = this.tabPane - 0 + 1;
            this.tabPane += '';
            
        },
        reset(ref) {
            this.$refs[ref].resetFields();
        },
        async getManyList() {
            let {data:res} = await this.$http.get(`categories/${this.catId}/attributes`,{params:{"sel":'many'}});
            if(res.meta.status != 200) {return this.$message.error("获取数据失败");}
            res.data.forEach(item => {
                item.checkAll = true;
                item.isIndeterminate = false;
                if(item.attr_vals.length > 0){
                    item.attr_vals = item.attr_vals.split(/,/g);
                }else{
                    item.attr_vals = [];    
                } 
                item.checkAttr = item.attr_vals;
            });
            this.manyList = res.data;
        },
        async getOnlyLisy() {
            let {data:res} = await this.$http.get(`categories/${this.catId}/attributes`,{params:{"sel":'only'}});
            if(res.meta.status != 200) {return this.$message.error("获取数据失败");}
            this.onlyList = res.data;
        },
        handleCheckAllChange(val,index) {
            this.manyList[index].checkAttr = val ? this.manyList[index].attr_vals: [];
            this.manyList[index].isIndeterminate = false;
        },
        handleCheckAttarChange(val,index) {
            let len = val.length;
            let arrLen = this.manyList[index].attr_vals.length;
            this.manyList[index].checkAll = len === arrLen;
            this.manyList[index].isIndeterminate = len > 0 && len < arrLen;

        },
        handlePreview(file){
            this.previewImg = file.response.data.url;
            this.dialogVisible = true;
        },
        handleRemove(file){
            let id = this.pics.findIndex( x => x == file.response.data.tmp_path);
            this.pics.splice(id,1);
        },
        handleSuccess(file) {
            this.pics.push(file.data.tmp_path);
        },
        async addGoods() {
            let info = {};
            for (const key in this.baseForm) {
                info[key] = this.baseForm[key];
            }
            info.goods_cat = info.goods_cat.join(',');
            info.goods_introduce = this.content;
            info.pics = this.pics;
            info.attr_vals = [];
            this.manyList.forEach(item => {
                info.attr_vals.push({"attr_id":item.attr_id,"attr_value":item.attr_vals.join(' ')})
            });
            this.onlyList.forEach(item => {
                info.attr_vals.push({"attr_id":item.attr_id,"attr_value":item.attr_vals})
            });
            let {data:res} = await this.$http.post(`goods`,info);
            if(res.meta.status != 201) {return this.$message.error(res.meta.msg);}
            this.$message.success('添加商品成功');
            for (const key in this.baseForm) {
                if(Array.isArray(this.baseForm[key])){
                    this.baseForm[key] = [];
                }
                this.baseForm[key] = '';
            }
            this.$router.push('/home/goods')
        }
      
    },
    components: {
        // eslint-disable-next-line vue/no-unused-components
        quillEditor,
  }
}
</script>
<style lang="less" >
.card{
    .base-form{
       .el-input{
            width: 70%;
        }
        .el-form-item__label , .el-form-item__error{
            width: 12%;
            text-align: right;
        }
        .el-form-item__content{
            text-align: left;
        }
        .el-tab-pane{
            padding-left: 5px;
        }
        .el-form-item__error{
            left: 90px;
        }
        .el-form-item{
            padding: 5px 0;
        } 
        .bt{
             padding-left: 12%; 
        }
    }
    .only-form{
       .el-input{
            width: 70%;
        }
        .el-form-item__label , .el-form-item__error{
            width: 12%;
            text-align: right;
        }
        .el-form-item__content{
            text-align: left;
        }
        .el-tab-pane{
            padding-left: 5px;
        }
        .el-form-item__error{
            left: 90px;
        }
        .el-form-item{
            padding: 5px 0;
        } 
        .el-form-item__label{
            width: 20%;
        }
        .bt{
             padding-left: 12%; 
        }
    }
    .tab-check{
        text-align: left;
        padding-left: 3%;
        .el-checkbox{
            margin: 10px 10px 0 0;
            margin-left: 0!important;
            .el-checkbox__label{
                font-size: 16px;
            }
        }
    }
    .ql-editor{
        height: 500px!important;
    }
}
    
</style>