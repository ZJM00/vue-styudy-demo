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
        <el-container >
            <!-- 侧边栏 -->
            <el-aside :width=" isCollapse||isWidth ?'64px':'200px'" >
                <div class="toggle-button" @click="toggle">|||</div>
                <el-menu text-color="#fff" unique-opened  router  :default-active="isActiveRouter"
                    active-text-color="#409eff" :collapse='isCollapse || isWidth' :collapse-transition='false'
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
            <el-container >
                <!-- 右侧主体 -->
                <el-main :class="isCollapse||isWidth?'is-bra-active':''">
                     
                    <div class="tag">  <!--tag 导航栏-->
                        <el-tag  closable :disable-transitions="false" 
                            v-for='(item,index) in tagRouter' :key="index"
                            effect="plain" @close=closeTag(index)>
                        {{item.name}}
                    </el-tag>
                    </div>
                    <keep-alive>
                        <router-view />
                    </keep-alive>
                   
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
        if(this.$route.path != this.tagRouter[0]['tagRouter']){
            this.tagRouter.push({tagRouter:this.$route.path,name:this.$route.matched[1].meta.title})
        }
       ;
    },
    data(){
        return {
            menuList: null,
            isCollapse: false,
            isActiveRouter: '',
            currentRouter: '/home/',
            isWidth: false,
            tagRouter: [{name: '首页',tagRouter: '/home/welcome'}],
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
            if(this.isCollapse || this.isWidth){
                this.isWidth = false;
                this.isCollapse = false;
            }else {
                this.isCollapse = true;
            }
        },
        savePath(path,it,i){
            window.sessionStorage.setItem("activePath",path);
            this.isActiveRouter = path;
        },
         //获取权限
        async getRoles() {
            let {data: res} = await this.$http.get(`roles`);
            this.$store.commit('getList',res);
            //this.$store.dispatch('getRoles');
        },
        // tag 导航栏
        closeTag(id){
            if(id - 1 >= 0 ){
                this.tagRouter.splice(id,1);
                this.$router.push(this.tagRouter[id - 1]['tagRouter']);
            }else{
                this.$router.push('/home/welcome');
            }
        }
    },
    watch: {
       "$route.path"(){
            let route = this.$route.path;
            let name = this.$route.matched[1].meta.title;
            let key = false;
            this.tagRouter.forEach(item => {
                if(item.name == name){ 
                    key = true;
                }
            });
            if(!key) this.tagRouter.push({name,tagRouter:route})
            this.savePath(route.replace(this.currentRouter,''));
        },
    },
    computed: {
        // eslint-disable-next-line vue/return-in-computed-property
        isFold(){
            this.$nextTick(() =>{
                this.$bus.$on('upFold',(val) => {
                   
                   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                   
                     if(this.isCollapse || this.isWidth){
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        this.isWidth = false;
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        this.isCollapse = false;
                    }else {
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        this.isWidth = true;
                    }
                })
            })
        }
    },

}
</script>
<style lang="less">
    .contain{
        height: 100%;
    }
    .el-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #fffffffa;
        color: #333;
        height: 60px;
        position: fixed;
        top: 0;
        z-index: 999;
        float:right;
        &::after{
            content: '';
            clear: both;
           display: block;
        }
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
            position: fixed;
            right: 30px;
        }
    }
  
    .el-aside {
        background-color: #545c64;
        color: #333;
        text-align: left;
        // line-height: 200px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 60px;
        &::after{
            content: '';
            clear: both;
           display: block;
        }
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
    margin-left: 200px;
    margin-top: 60px;
    .tag{
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
        .el-tag{
            margin: 10px 5px;
        }

    }
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
.is-bra-active{
    width:calc(~"100% + 136px")!important;
    margin-left: calc(~'200px - 136px');
    transition: all 0.05s;
}
</style>