#  vue-demo  电商管理后台 

## 安装vue/cli
  全局安装：-g 表示全局安装vue-cli
  ```
    npm install -g @vue/cli  // 4.1.1 版本
  ```
## 安装 node.js
  [node官网](https://nodejs.org/en/)下载 node.js 

## 安装MySql
  [MySql社区版下载](https://dev.mysql.com/downloads/file/?id=490395)。

  [点击查看安装教程](https://blog.csdn.net/qq_33236248/article/details/80046448);

  [Navicat Premium (数据库连接工具) 教程](https://www.jianshu.com/p/5f693b4c9468)

## 安装接口测试工具 Postman
  [postman官网](https://www.getpostman.com/downloads/)

## 使用 [iconfont](https://www.iconfont.cn/)

  + 在 [iconfont](https://www.iconfont.cn/)  上的图标管理中创建 我的项目。

  + 搜索图标添加入库，购物车的图标会显示加入了几个图标，点击进去，把所有的图标添加入项目。

  + 有三种方式 可以引入到项目，我使用是 Font class 的方式，生成代码，在 punblic -> index.html 中 用 link的方式引入 ，需要加前缀 http:
   ```
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_1584797_1wwyhy1dfzh.css">
   ```
  + 在需要图标的地方加入类名, 第一个 iconfont 类名必须有，第二个是图标的名字(项目中点击图标复制代码)
  ```
    <i class="iconfont icon-full-screen"></i>
  ```
   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[官方教程](https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1584797)

## 初始化项目 
  + 运行下面的代码进行创建
    ```
    vue create shop
    ```
    进行手动配置选择 vuex，router，其他可以默认。
    
  + 或者，进入 vue ui 界面进行项目初始化。

## Element-UI 组件库
```
    npm i element-ui --save-dev  // yarn add element-ui
```

## 配置 axios 和 Element-UI
   
  + 在项目中引入 Element-UI ,在 src\main.js 中加入以下代码
     ```
      import ElementUI from 'element-ui';
      import 'element-ui/lib/theme-chalk/index.css';
      Vue.use(ElementUI);
     ```

    + 下载 axios并引入，再 设置 axios 的默认URL
     ```
     // 下载
      npm i axios --save

    //引入 axios 
    import axios from 'axios'
    //设置 axios 的默认URL
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    Vue.prototype.$http = axios;
     ```
   

## 配置服务端 (vue_api_server 文件)

   + 用 Navicat Premium 连接 MySql, 新建连接 shop , 右键新建数据库 mydb(这个数据库名必须一致)，点击mydb数据库，右键 运行 db 文件夹下的 mysql.sql文件，得到大佬写好的数据库表。

  + 有大佬写好的后台，只需要安装程序运行需要的模块即可。

  + 查看所有的 js 文件，把 require 的模块，全部 npm i 模块名 -- save，或者直接 运行 node ./app.js 会提示你那些模块没有安装。

  + 
## 创建分支 shop
```
 git checkout -b shop
```
## Login 页面

  1. 新建 Login.vue

  2. 给router 添加  Login 组件的路由 和路由重定向到登陆界面
  ```
    {
      path:"/",
      redirect:"/Login"
    },
    {
      path:'/Login',
      component:Login,
    },
  ```

  3. 绘制登录盒子，使其居中
   ```
    .login-bg{
        background: #2b4b6b;
        height: 100%;
        .box{
            width: 450px;
            height: 300px;
            background: #fff;
            border-radius: 5px;
            position: relative;
            left: 50%;
            top: 50%;
            margin: -150px 0  0 -225px;
           // transform: translate(-50%,-50%); margin 和  transform都行。
        }
    }
   ```

  4. 找到一个图标，当 [logo](https://www.iconfont.cn/)
  ```
   <div class="avatue-box">
      <img src="../assets/vue.png" alt="" class="login-img">
    </div>

    //
  .avatue-box{
      width: 130px;
      height: 130px;
      background: #eee;
      border: 1px solid #eee;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: -25%;
      transform: translateX(-50%);
      .login-img{
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background-size: contain;
      }
  }
  ```

  5. 使用 el-form ，el-input, el-button 搭建完成。并添加表单验证规则 rules
  ```
  <div class="login-from">
    <el-form  :model="form"  :rules=rules ref="loginForm">
        <el-form-item class="form-input" prop='username'>
            <el-input 
                prefix-icon="iconfont iconren"
                placeholder="用户名"
                v-model="form.username">
            </el-input>
        </el-form-item>
        <el-form-item class='form-input' prop='password'> 
            <el-input 
                prefix-icon="iconfont iconmima"
                placeholder="密码"
                show-password
                v-model="form.password">
            </el-input>
        </el-form-item> 
        <el-form-item class="form-bt">
            <el-button type="primary">登录</el-button>
            <el-button type="info" @click=resetFrom>重置</el-button>
            <!-- <el-button native-type="reset"></el-button> -->
        </el-form-item>
    </el-form>     
   </div>

    // 表单验证
   rules:{
      username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
      ],
      password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
      ],
  }

  //css
  .el-form{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      //align-items:flex-end;
      .login-from{
          height: 100%;
          width: 130%;
          display: flex;
          justify-content: center;
          align-items:flex-end;
      }
      .form-input{
          padding: 3px;
      }
      .form-bt{
          display: flex;
          justify-content: flex-end;
      }
  }
  ```

  ![Login页面](https://shop-element.oss-cn-shenzhen.aliyuncs.com/shop/element-ui/Login.png)

   <p style="height:10px"></p>

  6. 重置功能制作

   使用ref 获取表单，用element的内置 resetFields 方法，对整个表单进行重置，将所有字段值重置为初始值并移除校验结果。
  ```
   resetFrom(){
      this.$refs.loginForm.resetFields();
  }
  ```

  7. 登录之前的表单校验

  使用element的内置 validate  方法: 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise。

  ```
  login() {
    this.$refs.loginForm.validate(valid => {
        console.log(valid)
    });
  }
  ```
  >个人感觉就是 表单验证规则 全部通过才能进行登录

8. 登录功能 
  
 
   + 服务端开启 运行 node  ./app.js, 输入账号密码验证登录，状态码为200 时，登录成功

   + 登录成功提示，用 Message 消息提示，Element 为 Vue.prototype 添加了全局方法 $message。因此在 vue instance 中可以采用本页面中的方式调用 Message。我们也为 Message 的各种 type 注册了方法，如 his.$message.error/success/warning/info，

    + 将登陆成功之后的 token，保存到客户端的sessionStorage 中
    
      - (1) 项目中的 api ，只有在登陆成功之后，才能访问

       - (2) token 只在网站打开的期间生效，所以保存再  sessionStorage 中

     + 通过编程式导航跳转到主页，路由地址是 /home
   ```
    login() {
             this.$refs.loginForm.validate(async valid => {
                if(!valid ) return ;
                let {"data":res} = await this.$http.post("./login",this.form);
                if(res.meta.status != 200 ) return this.$message.error("登录失败");
                this.$message.success("登录成功");
                window.sessionStorage. setItem("token",res.data.token);
                this.$router.push("./home");

             });
        },
   ```

9. 控制访问权限，如果用户没有登录，但是通过特定的 URL 访问特定页面，需要导航到登录页面。

    ```
    // 挂载路由导航守卫
    router.beforeEach((to,from,next) => {
      // to 将要访问的路径
      // from 代表哪个路径跳转而来
      // next  是一个函数，表示放行
            //  next() 放行  next("./login") 强制跳转

      if(to.path == "/login")  return next();
      if(!window.sessionStorage.getItem("token"))  return next("./login");
      next();
    })

    ```

    + 可以伪造token，进行登录