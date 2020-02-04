# note- 右侧 --- 权限管理

## 创建权限列表  Right.vue

1. 路由规则配置

2. 进行布局和数据获取
```
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

// 
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

```

## 创建角色列表  Roles.vue

1. 创建 Roles.vue 和添加路由规则

2. 获取数据
```
 async getList() {
    let {data: res} = await this.$http.get(`roles`);
    if(res.meta.status != 200) return this.$message.error("获取数据失败");
    this.list = res.data;
}
```

3. 使用 具有展开行的 Table 表格组件，```<el-table-column type="expand" > ```。进行布局


4. 在 #app 添加 CSS```min-width: 1366px;```,防止缩小导致的内容换行。

5. 给 el-row 添加垂直居中
```
.el-row{
    display: flex;
    align-items: center;
}
```

6. 分配权限功能实现: 用Tree 树形控件来实现

7. 完成用户管理的分配角色功能

    + 由于角色数据已经请求过来，避免二次请求同样的数据，使用Vuex，来保存数据