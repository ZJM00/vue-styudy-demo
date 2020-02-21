<template>
    <div>
        <breadcrumb></breadcrumb>
        <el-card class="box-card" stripe>
            <el-table  :data="list"  style="width: 100%">
                <el-table-column type="expand" >
                    <template v-slot="scoped">
                        <!-- <pre>{{scoped.$index}}</pre> -->

                        <el-row v-for='(item,ind) in scoped.row.children' :key="ind" :class="['bdtop',ind + 1 == scoped.row.children.length?'bdbottom':'']">
                            <el-col :span="5" >
                                <el-tag closable @close="removeTag(scoped.row.id,item.id,[scoped.$index,ind])">{{item.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="19"  >
                                <el-row  v-for='(it,id) in item.children' :key="id" :class="[id == 0?'':'bdtop']">
                                    <el-col :span="6" >
                                        <el-tag type='success' closable @close="removeTag(scoped.row.id,it.id,[scoped.$index,ind,id])">{{it.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col  :span="18"> 
                                        <el-tag closable type='warning' 
                                            v-for='(i,d) in it.children' :key="d" 
                                            @close="removeTag(scoped.row.id,i.id,[scoped.$index,ind,id,d])">{{i.authName}}</el-tag>
                                    </el-col>
                                </el-row>

                            </el-col>
                        </el-row>
                      
                    </template>
                </el-table-column>
                <el-table-column label="角色名称" prop="roleName"> </el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column  label="操作" v-slot=scope>
                    <el-button type="primary" icon="el-icon-edit" size='mini' @click="setRole(scope.row,scope.$index)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size='mini' @click=deleteRole(scope.row.id,scope.$index)>删除</el-button>
                    <el-button type="warning" icon="el-icon-setting" size='mini' @click="showSetRightDialog(scope.row,scope.$index)">分配权限</el-button>
                </el-table-column>
              
            </el-table>
        </el-card>
         <el-button type='primary' @click="addRole"> 添加角色</el-button>
        <!-- 分配权限 -->
        <el-dialog title="分配权限" :visible.sync="setRightDialog"  width="30%" @close=resetRight>
           
            <el-tree :data="rightsList"  show-checkbox node-key="id" default-expand-all
                :default-checked-keys="rightsKey" :props="rightsProps" ref=rightsTree> 
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialog = false">取 消</el-button>
                <el-button type="primary" @click="setRights()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑角色 -->
        <el-dialog title="编辑角色" :visible.sync="setRoleDialog"  width="25%" >
            <div class="set-role">
                <span>角色名称 :</span> <el-input v-model="setRoleInfo.roleName" class="el-bt" clearable></el-input>
            </div>
            <div class="set-role">
                <span>角色描述 :</span><el-input v-model="setRoleInfo.roleDesc"  class="el-bt" clearable></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRoleDialog = false">取 消</el-button>
                <el-button type="primary" @click="setRolesInt()">确 定</el-button>
            </span>
        </el-dialog>

         <!-- 添加角色 -->
        <el-dialog title="添加角色" :visible.sync="addRoleDialog"  width="25%" >
            <div class="set-role">
                <span>角色名称 :</span> <el-input v-model="setRoleInfo.roleName" class="el-bt" clearable></el-input>
            </div>
            <div class="set-role">
                <span>角色描述 :</span><el-input v-model="setRoleInfo.roleDesc"  class="el-bt" clearable></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialog = false">取 消</el-button>
                <el-button type="primary" @click="addRoleInt">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'rights',
    data() {
        return{
            setRightDialog: false,
            rightsList: [],
            rightsProps: {
                children: 'children',
                label: 'authName'
            },
            rightsKey: [],
            currentId: '',

            // 编辑角色
            setRoleDialog: false,
            setRoleInfo: {
                roleName: '',
                roleDesc:'',
            },
            temporarily:{
                roleName: '',
                roleDesc:'',
            },
            //添加角色
            addRoleDialog: false,

        }
    },
    watch: {
        list() {
            return this.$store.state.roleList.data;
        }
    },
    computed: {
        list() {   
            return this.$store.state.roleList.data;
        },
        meta() {
           return this.$store.getters.getData.meta;
        }
    },

    beforeUpdate() { 
       if(this.meta.status != 200) return this.$message.error("获取数据失败");
    },  
    methods: {
        // 获取权限
        // async getList() {
        //     let {data: res} = await axios.get(`roles`);
        //     if(res.status != 200) return this.$message.error("获取数据失败");
        //     this.list = res.data;
        // },
        // 删除权限
        removeTag(ind,id,arr) {
            this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async (re) => {
                let {data: res} = await this.$http.delete(`roles/${ind}/rights/${id}`);
                if( res.meta.status != 200) {
                    return this.$message.error("删除失败");
                }else{
                    let len = arr.length;
                    let list = this.list[arr[0]].children;
                    for(let i = 1; i < len - 1; i++) {
                        list = list[arr[i]].children;
                    }
                    list.splice(arr[len-1],1);

                    // console.log(this.list[arr[0]].children[arr[1]].children[arr[2]].children[arr[3]])
                    //this.list[arr[0]].children[arr[1]].children[arr[2]].children.splice(arr[3],1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //分配权限
        async showSetRightDialog(row) {
            let {data: res} = await this.$http.get(`rights/tree`);
            if(res.meta.status != 200) return this.$message.error("获取权限列表失败");
            this.rightsList = res.data;
            this.getRightsId(row,this.rightsKey);
            this.currentId = row.id;
            this.setRightDialog = true;
        },
        // 递归得到所有权限的children 的 id
        getRightsId(node,arr) {
            if( !node.children) return arr.push(node.id);
            node.children.forEach(ele => {
                this.getRightsId(ele,arr)
            });
        },
        resetRight() {
            this.rightsKey = [];
        },
        //分配权限
        setRights() {
            this.rightsKey = [...this.$refs.rightsTree.getHalfCheckedKeys(),...this.$refs.rightsTree.getCheckedKeys(true)].join(',')
            this.$http.post(`roles/${this.currentId}/rights`,{rids:this.rightsKey}).then( res => {
                if(res.data.meta.status != 200 ) return this.$message.error("分配权限失败");
                this.$message.success("分配权限成功");
                this.getList();
            }).catch( ()=> {
                this.$message.error("分配权限失败");
            })
            this.setRightDialog = false;
        },

        //删除角色
        deleteRole(id,index) { 
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let {data:res} = await this.$http.delete(`roles/${id}`);
                if(res.meta.status != 200 ) return this.$message.error("删除角色失败");  
                this.list.splice(index,1);
                this.$store.commit('setList',this.list);
                this.$message.success("删除角色成功");
            }).catch(() => {
               this.$message.info("取消操作");     
            });
        },

        //编辑角色
        setRole(row){
            this.temporarily.id = row.id;
            this.setRoleInfo.roleName = row.roleName;
            this.setRoleInfo.roleDesc = row.roleDesc;
            this.temporarily.roleName = row.roleName;
            this.temporarily.roleDesc = row.roleDesc;
            this.setRoleDialog = true;
          
        },
        setRolesInt() {
            if(this.setRoleInfo.roleName != '' &&  this.setRoleInfo.roleDesc != '' ){
                if(this.setRoleInfo.roleName == this.temporarily.roleName && this.setRoleInfo.roleDesc == this.temporarily.roleDesc){
                    this.setRoleDialog = false;
                }
                else{
                    this.$http.put(`roles/${this.temporarily.id}`,this.setRoleInfo).then(res=>{
                        console.log(res.data)
                        if(res.data.meta.status != 200) return this.$message.error('修改失败');
                        this.$store.dispatch('getRoles');
                        this.$message.success('修改成功');
                         this.setRoleDialog = false;
                    })
                    
                }
            }else{
                this.setRoleDialog = false;
            }

        },

        //添加角色
        addRole() {
            this.setRoleInfo.roleName = '';
            this.setRoleInfo.roleDesc = '';
            this.addRoleDialog = true;
        },
        addRoleInt() {
             if(this.setRoleInfo.roleName != '' &&  this.setRoleInfo.roleDesc != '' ){
                 this.$http.post(`roles`,this.setRoleInfo).then( res => {
                    if(res.data.meta.status != 201) return this.$message.error('添加角色失败');
                    this.$store.dispatch('getRoles');
                    this.$message.success('添加角色成功');
                    this.addRoleDialog = false;
                 })
             }else{
                this.addRoleDialog = false;
             }
        }
    },


}
</script>
<style lang="less" scoped>
.bdtop{
    border-top: 1px solid rgba(64, 55, 55, 0.17);
}
.bdbottom{
      border-bottom: 1px solid rgba(64, 55, 55, 0.17);
}
.el-row{
    display: flex;
    align-items: center;
}

.el-tag{
    margin:7px;
}
.set-role{
    margin: 15px 0;
    span{
        padding: 10px 15px 10px 10px;
    }
   .el-bt{
        min-width: 50px;
        width: 50%;
    }
}
</style>