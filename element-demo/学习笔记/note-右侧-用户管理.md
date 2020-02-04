#  vue-demo  电商管理后台 - 右侧 --- 用户管理

## 封装 Breadcrumb 面包屑 组件，全局 共用

1. 创建  Breadcrumb.vue , 使用 element的  Breadcrumb 面包屑 组件 改造


2. 使用 路由的 meta 字段，写的路由的信息

```
{
    path: '/home',
    component:  () => import("../components/Home.vue"),
    redirect: "/home/welcome",
    meta: {
      'upperLevel':'',
      'title': '首页',
    },
    children: [
      {
        path:'welcome',
        component: () => import("../components/Welcome.vue")
      },
      {
        path:'users',
        name: "users",
        component: () => import("../components/Users.vue"),
        meta: {
          'upperLevel':'用户管理',
          'title': '用户列表'
        }
      }
    ]
}
```

3.  通过 this.$route.matched 来获取路由记录，得到 meta 字段

```
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
```

4. 通过 v-for 循环得到 面包屑导航

```
<el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index) in list" :key="index" :to="{'path': item.path}" >{{item.title}}</el-breadcrumb-item>
</el-breadcrumb>
```

5. 在 main.js 进行全局引用 

```
// 抽离出 公共组件 Breadcrumb，并全局引用
import breadcrumb from './components/Breadcrumb.vue'
Vue.component("breadcrumb",breadcrumb);
```

## 用户列表 users.vue

1. 创建 vue 文件

2. 配置好 路由规则， 为 home的子路由
```
    children: [
      {
        path:'welcome',
        component: () => import("../components/Welcome.vue")
      },
      {
        path:'users',
        name: "users",
        component: () => import("../components/Users.vue"),
      }
    ]
```

3. 引入 breadcrumb 组件

4. 用el-table 对用户数据展示
```
<el-table  :data="userList" border  style="width: 100%" margTop=20px>
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
                    v-model="data.row.mg_state" @change='changeStatus($event'>
            </el-switch>
        </template>
    </el-table-column>
    <el-table-column  label="操作" width="180px">
        <template v-slot='edit>
            <!-- 修改角色按钮 --> 
            <el-tooltip class="item" effect="dark" content="角色删除" placement="top" :enterable='false'>
                <el-button type="primary" icon="el-icon-edit" size='mini'></el-button>
            </el-tooltip>

            <!-- 分配角色 -->
            <el-tooltip class="item" effect="dark" content="角色删除" placement="top" :enterable='false'>
                <el-button type="danger" icon="el-icon-delete" size='mini'></el-button>
            </el-tooltip>


            <!-- 分配角色 -->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable='false'>
                <el-button type="warning" icon="el-icon-setting" size='mini'></el-button>
            </el-tooltip>
        </template>
    </el-table-column>
</el-table>

//
data() {
    return {
        queryInfo: {
            query: "", // 查询参数
            pagenum: 1, // 当前页码
            pagesize: 4,  // 每页显示条数
        },
        userList: [],
    }
},
created() {
    this.getUsers();
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
        console.log()
        let {"data": res} = await this.$http.put(`users/${info.id}/state/${info.mg_state}`);
        if(res.meta.status != 200) {
            info.mg_state =  false;
            return this.$message.error("更新用户状态失败")
        }else{
                this.$message.success("更新用户状态成功")
        }
        
        
    },
},
```

5. 用 element Card 卡片, breadcrumb ，Layout ,Pagination 分页,进行用户添加,搜索,分页布局
```
    <breadcrumb></breadcrumb>
    <el-card class="card">
        <div  class="text item">
            <el-row :gutter=20>
                <el-col :span=8>
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span=4>
                    <el-button type='primary'> 添加用户</el-button>
                </el-col>
            </el-row>
        </div>
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
    </el-card>


  // methods：
  
        //currentPage(当前页) 改变时会触发	
        handleCurrentChange(val) {
            this.queryInfo.pagenum = val;
            this.getUsers();
            
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
        /* 由于页面初始化时，请求到四条数据，
            默认 page-sizes  第一页 是 四条数据，但是 数组不是有序的，
            所以需要执行一次函数让数组有序
        */
        once() {
            this.page_sizes.sort(function(a, b) {
                return a - b;
            });
        }
    }, 
```

6. Dialog 对话框 组件 实现添加用户
```
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

 // data()
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
        }

// methods:

        clear() {
            this.getUsers();
        },
        // 对话框关闭后，重置表单
        closeDialog() {
            this.$refs.formRef.resetFields();
        },
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
          
        }
```

7. 用户信息修改: 在 相应按钮上绑定 editDialog 事件，通过插槽拿到数据,用Dialog组件布局。
```
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

// methods:
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
    }

```

8. 删除用户: 使用MessageBox 弹框,在删除角色按钮上绑定事件
```
 deleteUser(index) {
    this.$confirm('将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        console.log()
        let id = this.userList[index].id;
            console.log(id)
        this.$http.delete(`users/${id}`).then(res => {
            console.log(res)
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
```