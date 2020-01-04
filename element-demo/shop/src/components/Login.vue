<template>
    <div class="login-bg">
        <div class="box">
            <div class="avatue-box">
                <img src="../assets/vue.png" alt="" class="login-img">
            </div>
           <!--表单--> 
            <div class="login-from">
                <el-form  :model="form"  :rules=rules ref="loginForm">
                    <el-form-item class="form-input" prop='username'>
                        <el-input 
                            prefix-icon="iconfont iconuser"
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
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button type="info" @click=resetFrom>重置</el-button>
                        <!-- <el-button native-type="reset"></el-button> -->
                    </el-form-item>
                </el-form>
               
            </div>
        
        </div>
    </div>
</template>
<script>
export default {
    name:"Login",
    data(){
        return {
            form:{
                username: "admin",
                password: "123456",
            },
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
        }
    },
    methods: {
        resetFrom() {
            this.$refs.loginForm.resetFields();
        },
        login() {
             this.$refs.loginForm.validate(async valid => {
                if(!valid ) return ;
                let {"data":res} = await this.$http.post("./login",this.form);
                if(res.meta.status != 200 ) return this.$message.error("登录失败");
                this.$message.success("登录成功");
                window.sessionStorage. setItem("token",res.data.token);
                this.$router.push("./home");


                // this.$http.post("./login",this.form).then(res => {
                //     if(res.data.meta.status != 200 ) return console.log('fail')
                //     console.log("success")
                // });

             });
        },
        
    }
   
}
</script>
<style lang="less" scoped>
    .login-bg{
        background: #2b4b6b;
        height: 100%;
        .box{
            width: 350px;
            height: 180px;
            background: #fff;
            border-radius: 5px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -150px 0  0 -225px;
           // transform: translate(-50%,-50%);
           padding:90px 50px 30px 50px;
        }
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
            box-shadow: 0px 0px 10px #000000c9;
            .login-img{
                width: 130px;
                height: 130px;
                border-radius: 50%;
                background-size: contain;
            }
        }
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
        
       
    }
</style>