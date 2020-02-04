<template>
    <div>
        <breadcrumb></breadcrumb>
        <el-card class="card">
            <div  class="text item">
                <el-row :gutter=20>
                    <el-col :span=8>
                        <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear='clear' >
                            <el-button slot="append" icon="el-icon-search" @click="getUsers" ></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span=4>
                        <el-button type='primary' @click="dialogVisible = true"> 添加用户</el-button>
                    </el-col>
                </el-row>
            </div>

            <el-table  :data=" userList" border  style="width: 100%" margTop=20px>
                 <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="姓名" width="180">
                </el-table-column>
                <el-table-column  prop="email" label="邮箱" width="180">
                </el-table-column>
                <el-table-column prop="mobile" label="电话">
                </el-table-column>
                <el-table-column prop="role_name" label="角色">
                </el-table-column>
                <el-table-column  label="状态">
                    <template v-slot="data">
                            <el-switch  active-color=#409eff inactive-color="#dcdfe6"
                                v-model="data.row.mg_state" @change='userChangeStatus(data.row)'>
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" width="180px">
                    <template v-slot="editUser">
                        <!-- 修改角色按钮 --> 
                        <el-tooltip class="item" effect="dark" content="角色删除" placement="top" :enterable='false'>
                            <el-button type="primary" icon="el-icon-edit" size='mini' @click="editDialog(editUser.$index)"></el-button>
                        </el-tooltip>

                        <!-- 删除角色 -->
                        <el-tooltip class="item" effect="dark" content="角色删除" placement="top" :enterable='false'>
                           <el-button type="danger" icon="el-icon-delete" size='mini' @click="deleteUser(editUser.$index)"></el-button>
                        </el-tooltip>


                        <!-- 分配角色 -->
                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable='false'>
                           <el-button type="warning" icon="el-icon-setting" size='mini' @click="setRole(editUser.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 分页 -->
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="page_sizes"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalpage">
                </el-pagination>
            </div>

            <!-- 添加用户对话框 -->
            <el-dialog
                title="添加用户"
                :visible.sync="dialogVisible"
                @close='closeDialog'
                width="50%">
                <el-form :model="form" :rules="formRules" ref="formRef" label-width="100px" >
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                     <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" show-password ></el-input>
                    </el-form-item>
                     <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                     <el-form-item label="手机" prop="mobile">
                        <el-input v-model="form.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 修改用户对话框 -->
            <el-dialog
                title="修改用户信息"
                :visible.sync="showEditDialog"
                width="30%">
                <el-form :model="editForm" :rules="formRules" ref="editRef" label-width="100px" >
                    <el-form-item label="用户名">
                        <el-input v-model="editForm.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editForm.email"></el-input>
                    </el-form-item>
                     <el-form-item label="手机" prop="mobile">
                        <el-input v-model="editForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showEditDialog = false">取 消</el-button>
                    <el-button type="primary" @click="editUser">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 分配角色对话框 -->
            <el-dialog
                title="分配角色"
                :visible.sync="showEditDialog"
                width="30%">
                <el-form :model="editForm" :rules="formRules" ref="editRef" label-width="100px" >
                    <el-form-item label="用户名">
                        <el-input v-model="editForm.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editForm.email"></el-input>
                    </el-form-item>
                     <el-form-item label="手机" prop="mobile">
                        <el-input v-model="editForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showEditDialog = false">取 消</el-button>
                    <el-button type="primary" @click="editUser">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 分配角色对话框 -->
            <el-dialog
                title="分配角色"
                :visible.sync="showSetRoles"
                width="23%">
                <div class="set-role">
                    <p><span>当前用户: </span>{{ currentInfo.username}}</p>
                    <p><span>当前分配的角色: </span>{{ currentInfo.rolename}}</p>
                    <p>  
                        <span>分配新角色: </span>
                        <el-select v-model=" currentRole" placeholder="请选择" style="width:160px;">
                            <el-option  v-for="item in selectRoles" :key="item.id" :label="item.roleName" :value='item.id'>
                            </el-option>
                        </el-select>
                    </p>
                   
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showSetRoles = false">取 消</el-button>
                    <el-button type="primary" @click="allocation">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
export default {
    name:"users",
    data() {
        // 表单自定义校验规则和 rules 一起使用
        let emailCheck = (rule,value, callback) => {
            let regREmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+([\.a-zA-Z0-9_-])+/;
            if(regREmail.test(value)){
               return callback();
            }else{
                callback(new Error('请输入合法邮箱地址'));
            }
        };
        let mobileCheck =  (rule,value, callback) => {
            let regREmail = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
            if(regREmail.test(value)){
               return callback();
            }else{
                callback(new Error('请输入有效手机号码'));
            }
        }
        return {
            queryInfo: {
                query: "", // 查询参数
                pagenum: 1, // 当前页码
                pagesize: 4,  // 每页显示条数
            },
            userList: [],
            totalpage: 0, //总数据条数,
            page_sizes: [4,1, 5, 10], //每页显示个数选择器的选项设置

            //对话框是否显示
            dialogVisible: false,

            // 表单值
            form: {
                username: '',
                password: '',
                email: '',
                mobile: '',
            },
            //表单验证规则
            formRules: {
               username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: emailCheck , trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: mobileCheck , trigger: 'blur' }
                ],
            },
            
            // 修改用户对话框
            showEditDialog: false,
            // 修改用户信息 form
            editForm: {
                id: '',
                username: '',
                email: '',
                mobile: '',
            },
            // 分配角色
            showSetRoles: false,
            currentInfo: {},
            currentRole: '',
        }
    }, 
    computed: {
        selectRoles: function(){
            return this.$store.state.roleList.data;
        },
    },
    created() {
        this.getUsers();
        //this.selectRoles = this.$store.state.roleList.data;
    },
    methods: {
        async getUsers(){
           let {data} =  await this.$http.get('users',{params:this.queryInfo});
           if(data.meta.status != 200 ) return this.$message.error("获取用户列表失败");
           this.userList = data.data.users;
           this.totalpage = Number(data.data.total);
        },
        //监听 switch 的状态改变用户状态
        async userChangeStatus (info) {
            let {"data": res} = await this.$http.put(`users/${info.id}/state/${info.mg_state}`);
            if(res.meta.status != 200) {
                info.mg_state =  false;
                this.$message.error("更新用户状态失败")
            }else{
                this.$message.success("更新用户状态成功")
            }
           
           
        },
        // pageSize(每页条数) 改变时会触发	
        handleSizeChange(val) {
            this.queryInfo.pagesize = val;
            this.getUsers();
            if(this.once) {
                this.once();
                this.once = '';
            }
        },
        //currentPage(当前页) 改变时会触发	
        handleCurrentChange(val) {
            this.queryInfo.pagenum = val;
             this.getUsers();
            
        },
        /* 由于页面初始化时，请求到四条数据，
            默认 page-sizes  第一页 是 四条数据，但是 数组不是有序的，
            所以需要执行一次函数让数组有序
        */
        once() {
            this.page_sizes.sort(function(a, b) {
                return a - b;
            });
        },
        // 清空输入框，得到数据
        clear() {
            this.getUsers();
        },
        // 对话框关闭后，重置表单
        closeDialog() {
            this.$refs.formRef.resetFields();
        },
        //添加用户
        addUser() {
            //对整个表单进行校验的方法
            this.$refs.formRef.validate(async val => {
                if(val) {
                    let {"data":res} = await this.$http.post('users',this.form);
                    if(res.meta.status != 201) {
                        this.$message.error('添加用户失败')
                    } 
                    if(res.meta.status == 400) {
                        this.$message.error('用户已存在')
                    }
                    if(res.meta.status == 201) {
                        this.$message.success('添加用户成功')
                    } 
                    this.getUsers(); 
                    this.dialogVisible = false;
                }
            })
          
        },
        // 获取所编辑的用户信息
        editDialog(index) {
            for (let key in  this.editForm) {
                this.editForm[key] = this.userList[index][key];
            }
            this.showEditDialog = true;
        },
        // 提交修改的用户信息
        editUser() {
            // 删除多余的数据
            let info = this.editForm;
            delete info.username;
            //表单预验证
            this.$refs.editRef.validate( async val => {
                if(!val)  return;  
                let {"data": res} = await this.$http.put(`users/${info.id}`,info);
                if( res.meta.status != 200 ) {
                    return this.$message.error("用户信息修改失败");
                }
                this.getUsers();
                this.showEditDialog = false;
                this.$message.success("用户信息修改成功");
            })
          
           
        },

        deleteUser(index) {
            this.$confirm('将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let id = this.userList[index].id;
                this.$http.delete(`users/${id}`).then(res => {
                    if(res.data.meta.status != 200 ) return this.$message.error("删除用户失败");
                    this.userList.splice(index,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message.error("删除用户失败");
                });
            }).catch((err) => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 分配角色
        setRole(row){
            this.currentInfo = {
                id: row.id,
                username: row.username,
                rolename: row.role_name,
            };
            this.showSetRoles = true;

        },
        async allocation(){
            if(!this.currentRole) {
                this.showSetRoles = false;
                return;
            }
            let {data:res} = await this.$http.put(`users/${this.currentInfo.id}/role`,{rid:this.currentRole});
            console.log(res)
            if(res.meta.status != 200) return this.$message.error('分配角色失败');
            this.$message.success('分配角色成功');
            this.currentRole = '';
            this.getUsers();
            this.showSetRoles = false;


        }
        


    },
}
</script>
<style lang="less" scoped>
  .card {
    height: auto;
    .el-table{
        margin-top: 20px;
    }
    .block{
        margin-top: 15px;
    }
    .set-role{
        text-align: left;
        p{
            padding: 10px;
            font-size: 15px;
            font-weight: 500;
            span{
                padding-right: 10px;
            }
        }
    }
  }
</style>