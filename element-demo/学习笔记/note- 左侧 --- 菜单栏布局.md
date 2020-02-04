# #  vue-demo  电商管理后台 - 左侧 --- 菜单栏布局

## 创建 Home.vue

使用 Container 布局容器,进行头部，侧边栏和中间内容区域布局，以及退出功能实现。
```
 <el-container class='contain'>
        <!-- 头部 -->
        <el-header>
            <div class="title">
                <i class="iconfont iconhoutailogo"></i>
                <h3>电商管理后台</h3>
            </div>
            <el-button type="info" @click='logout' class='tit-bt'>退出</el-button>
        </el-header>
        <!-- 页面主体 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <!-- 右侧主体 -->
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </el-container>


    // js
    logout() {
        window.sessionStorage.removeItem("token");
        this.$router.push("/login")
    }

   // css
   .contain{
        height: 100%;
    }
    .el-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #fffffffa;
        color: #333;
        height: 60px;
        .title{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .iconhoutailogo{
                padding: 5px;
               font-size: 30px;
            }
            
        }
        .tit-bt{
            height: 80%;
        }
    }
  
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
        height: 100%;
    }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
```

## 左边菜单栏布局
```
// default-openeds="['1', '1-2']" 代表默认打开菜单栏中 index = 1 和 1-2的项
<el-menu :default-openeds="['1','1-2']"> 
    <el-submenu index="1">
    <!-- 这个 template 是一级菜单模板 -->
        <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-message"></i>
            <span>一级菜单</span>
        </template>
        <!-- 二级菜单 -->
        <el-submenu index="1-2">
            <template slot="title">
                <i class="el-icon-message"></i>
                <span>二级菜单</span>
            </template>
            <!-- 二级菜单子选项 -->
            <el-menu-item index="1-2-1">选项1-2-1</el-menu-item>
        </el-submenu>
    </el-submenu>
</el-menu>
```
<center>
    <img src='https://shop-element.oss-cn-shenzhen.aliyuncs.com/shop/element-ui/ele-ui-%E8%8F%9C%E5%8D%95%E6%A0%8F.png'  style='display:flex;justify-content: center;'>
    <p>菜单栏</p>
</center>

## 通过接口获取左侧菜单数据

+ 需要授权的 API ,必须在请求头上使用 Autorization 字段 提供 token令牌，在main.js 里采用 axios的请求拦截器，加上token
 ```
 axios.interceptors.requset.use( config => {
  config.headers.Authorization = window.sessionStorage.getItem("token")
  // 最后必须return config
  return config;
})
```

 + 在 Home.vue 获取 左侧菜单数据。并进行布局，在el-menu 上 添加属性 unique-opened=true (即保持只有一个子菜单打开) 和  active-text-color="#409eff" 当前激活菜单的文字颜色（仅支持 hex 格式）

 ```
    // 获取所有的菜单
    async getMenuList() {
        let {data} = await this.$http.get("./menus");
        // 当获取数据错误时候的提示
        if(data.meta.status != 200) return this.$message.error(data.meta.msg);
        this.menuList = data.data;
    }


    // 布局
     <el-menu  background-color="#545c64fa"
            text-color="#fff" unique-opened
            active-text-color="#409eff">
            text-alian=left class="el-menu">
        <el-submenu  :index='i+" "' v-for="(item,i) in menuList" :key="i" >
            <!-- 这个 template 是一级菜单模板 -->
            <template slot="title">
                <!-- 图标 -->
                <i :class='"icon-font iconfont icon"+item.path'></i>
                <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="i+ '-'+ind" v-for='(it,ind) in item.children' :key='ind' >
                <i class='el-icon-menu'></i>
                <span>{{it.authName}}</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>

```

+ el-menu 的右边框 1px 突出，解决办法，重置 border-right。

<center>
    <img src='https://shop-element.oss-cn-shenzhen.aliyuncs.com/shop/element-ui/el-menu%E7%9A%841px.png'>
</center>

+ 折叠菜单栏
    在 el-menu 上绑定 collapse(是否水平折叠收起菜单(仅在 mode 为 vertical 时可用);折叠之后 el-menu的宽度变小 ，改变其width(菜单栏大小); collapse-transition(是否开启折叠动画)，防止出现收缩菜单栏的过渡动画

```
    //
     <el-aside :width="isCollapse?'64px':'200px'" >
        <div class="toggle-button" @click="toggle">|||</div>
        <el-menu 
                text-color="#fff" unique-opened  
                active-text-color="#409eff" :collapse='isCollapse' :collapse-transition='false'
        text-alian=left class="el-menu">
            <el-submenu  :index='i+" "' v-for="(item,i) in menuList" :key="i" >
                <!-- 这个 template 是一级菜单模板 -->
                <template slot="title" >
                    <!-- 图标 -->
                    <i :class='"icon-font iconfont icon"+item.path'></i>
                    <span>{{item.authName}}</span>
                </template>
                <el-menu-item :index="i+ '-'+ind" v-for='(it,ind) in item.children' :key='ind' >
                    <i class='el-icon-menu'></i>
                        <span>{{it.authName}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>

    // 水平折叠收起菜单
    toggle() {
        this.isCollapse = !this.isCollapse;
    }
    
    //   
    .toggle-button{
        text-align: center;
        color: #fff;
        letter-spacing: 8px;
        background-color: #4a5064fa;
        font-size: 10px;
        line-height: 30px;
        cursor: pointer;
    }
```

+ 右侧主体内容区域

    - 新建 welcome.vue 组件

    - 在  home组件的 \<el-main> \</el-main> 内添加 \<router-view>\</router-view> 来渲染子路由页面
    ```
       <el-main>
            <router-view></router-view>
        </el-main>
    ```

    - 在 router/index.js文件中的添加子路由规则
    ```
    {
        path: '/home',
        component:  () => import("../components/Home.vue"),
        redirect: "/home/welcome",  //父路由重定向到子路由时，redirect: "父路由的路径加上子路由的路径" 。
        children: [
        {
            path:'welcome',  //
            component: () => import("../components/Welcome.vue")
        }
        ]
    }
    ```
    ![菜单栏](https://shop-element.oss-cn-shenzhen.aliyuncs.com/shop/element-ui/%E8%8F%9C%E5%8D%95%E6%A0%8F%E6%95%B0%E6%8D%AE%E6%98%BE%E7%A4%BA-welocme.png)

+ 开启el-menu 的属性 router(是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转)。 

    - 但是要注意: 写路由的时候，开头不能加 / ，会被当做根路径（一级路由）匹配。不加则会被当作当前路由的同级路由解析。
    > 如: 当前路径为 http://localhost:8080/home/welcome,  (1) :index="/users" , 会匹配到 一级路由(home 路由) 同级别的路由;  (2) :index="users" , 会匹配到 welcome 路由 同级别的路由; 

    - 不能传参，如 :index="users+ '?a=1'", 没有任何作用。

    - 绑定 :index, 可以设置路由高亮。:default-active="$route.path"，匹配的是根路径，不太好。 刷新页面不会恢复默认值。但是 :index =" /父路径/当前路径" 才行。

    ```
    <!--当前路径为 http://localhost:8080/home/welcome ，重定向到二级路由 -->

    <el-menu text-color="#fff" router :default-active="$route.path">
        <el-menu-item :index="/users" > </el-menu-item>   <!-- 当前路径为 http://localhost:8080/user -->
        <el-menu-item :index="users" > </el-menu-item>    <!-- 当前路径为 http://localhost:8080/home/user -->

        <el-menu-item :index="home/users" > </el-menu-item>  <!-- 当前路径为 http://localhost:8080/home/home/user -->
        <el-menu-item :index="/home/users" > </el-menu-item>  <!-- 当前路径为 http://localhost:8080/home/user -->
    </el-menu>
    ```
    > 所以只写当前路径的时候，只会同级路由之间可以匹配。
    
    + github上搜到对应的用法，绑定属性 :route ,也行。更加符合语义，不能设置路由高亮。

    ```
      <el-menu-item :index="1-2" :route="{path:users}"> </el-menu-item>  
    ```

+ 路由高亮的两种方法

    1.  绑定 :index, 可以设置路由高亮。:default-active="$route.path"，匹配的是根路径，不太好。 刷新页面不会恢复默认值。但是 :index =" /父路径/当前路径" 才行。
    ```
    <el-menu text-color="#fff" router :default-active="$route.path">
        <el-menu-item :index=":index="'/home/'+it.path"" > </el-menu-item>  
    </el-menu>
    ```

    2. 点击子菜单,存储路由路径到 sessionStorage。动态获取 存储的路径 给 default-active。还要在 created 钩子函数中中 最开始根据路径设置 default-active，为了防止直接改路径出现的路由高亮不变的情况。

    ```
    created() {
       this.getMenuList();
       this.savePath((this.$route.path).replace(this.currentRouter,'')); //this.currentRouter 为当前父路由的路径再加上 /
    },

    // methods
        savePath(path){
            window.sessionStorage.setItem("activePath",path);
            this.isActiveRouter = path;
        },

    ```

## 主要代码
```

 <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse?'64px':'200px'" >
        <div class="toggle-button" @click="toggle">|||</div>
        <el-menu text-color="#fff" unique-opened  router  :default-active="isActiveRouter"
            active-text-color="#409eff" :collapse='isCollapse' :collapse-transition='false'
            text-alian=left class="el-menu">
            <el-submenu  :index='i+" "' v-for="(item,i) in menuList" :key="i" >
                <!-- 这个 template 是一级菜单模板 -->
                <template slot="title" >
                    <!-- 图标 -->
                    <i :class='"icon-font iconfont icon"+item.path'></i>
                    <span>{{item.authName}}</span>
                </template>
                <el-menu-item :index="it.path" v-for='(it,ind) in item.children' :key='ind' @click="savePath(it.path)" >
                    <i class='el-icon-menu'></i>
                    <span>{{it.authName}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
    <el-container>
        <!-- 右侧主体 -->
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</el-container>

<script>
export default {
    name:'home',
    created() {
       this.getMenuList();
       this.savePath((this.$route.path).replace(this.currentRouter,''));
    },
    data(){
        return {
            menuList: null,
            isCollapse: false,
            isActiveRouter: '',
            currentRouter: '/home/',
        }
    },
    methods: {
        logout() {
            window.sessionStorage.removeItem("token");
            this.$router.push("/login")
        },
        // 获取所有的菜单
        async getMenuList() {
            let {data} = await this.$http.get("./menus");
            // 当获取数据错误时候的提示
            if(data.meta.status != 200) return this.$message.error(data.meta.msg);
            this.menuList = data.data;
             console.log(this.menuList)
        },
        toggle() {
            this.isCollapse = !this.isCollapse;
        },
        savePath(path,it,i){
            window.sessionStorage.setItem("activePath",path);
            this.isActiveRouter = path;
        }
    },
}
</script>

```