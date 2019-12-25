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
   
   + 在项目中引入 Element-UI 和 使用 axios ，在 src\main.js 中加入以下代码
     ```
      import ElementUI from 'element-ui';
      import 'element-ui/lib/theme-chalk/index.css';
      Vue.use(ElementUI);
      Vue.prototype.axios = $http;
     ```