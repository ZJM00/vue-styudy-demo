/* eslint-disable vue/no-unused-vars */
<template>

    <el-container class='contain'>
        <!-- 头部 -->
        <el-header>
            <div class="title">
                <i class="iconfont iconhoutaiguanli"></i>
                <h3>电商管理后台</h3>
            </div>
            <el-button type="info" @click='logout' class='tit-bt'>退出</el-button>
        </el-header>
        <!-- 页面主体 -->
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
    </el-container>
</template>
<script>
export default {
    name:'home',
    created() {
       this.getMenuList();
       this.savePath((this.$route.path).replace(this.currentRouter,''));
       this.getRoles();
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
        },
        toggle() {
            this.isCollapse = !this.isCollapse;
        },
        savePath(path,it,i){
            window.sessionStorage.setItem("activePath",path);
            this.isActiveRouter = path;
        },
         //获取权限
        getRoles() {
           this.$store.dispatch('getRoles');
        }
    },
    watch: {
       "$route.path"(){
            this.savePath((this.$route.path).replace(this.currentRouter,''));
        },
    },

}
</script>
<style lang="less" scope>
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
            .iconhoutaiguanli{
                padding: 15px;
                font-size: 40px;
                color: #3434edb8;
            }
            h3{
                font-size: 25px;
            }
        }
        .tit-bt{
            height: 70%;
        }
    }
  
    .el-aside {
        background-color: #545c64;
        color: #333;
        text-align: left;
        // line-height: 200px;
        height: 100%;
        .toggle-button{
            text-align: center;
            color: #fff;
            letter-spacing: 8px;
            background-color: #4a5064fa;
            font-size: 10px;
            line-height: 30px;
            cursor: pointer;
        }
        .el-menu{
            height: auto;
            background-color: #545c64;
            border-right: none;
            .icon-font{
                font-size: 25px;
                padding-right: 10px;
               
            }
        }
    }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
.el-icon-arrow-down{
    font-size: 20px;
}
.el-menu--popup{
    min-width: 150px;
}
.el-menu--popup-right-start{
    .el-menu-item{
        text-align: center;
        color:#303133!important;
    }
    .el-submenu{
        text-align: center;
    }
}
  

</style>