<template>
   <blank-blog :blog='blog' :id='id'  :msg='msg' :ajax='"add"'></blank-blog>
</template>

<script>
// post和get数据的网址
//https://jsonplaceholder.typicode.com/
//https://jsonplaceholder.typicode.com/posts
import blankBlog from '@/components/blankBlog.vue'
export default {
    name:'add-blog', 
    components:{
        blankBlog,
    },
    data(){
        return { 
            msg: '添加博客',
            blog: {
                    title:"",
                    content:"",  
                    categories:[],
                    author:"",
            },
            id:""
        }
    },
}
</script>
<style lang="less" scoped>
*{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
@center:text-align;
.left(){
    text-align: left;
}
.pd5(){
      padding: 10px 5px; 
      margin: 10px 0px;
}
.mten(@d){
    margin:@d;
}
.mp0{
    padding: 5px 5px; 
    margin: 0px 0px;
}
    label{
        font-size: 18px;
    }
    p{
        padding: 5px;
        margin: 0;
    }
    .wrap{
        width:500px;
        height: 100%;
        margin:auto auto;
       .title{
           .pd5();
           .left;
            .theme,.checkbox{
                display: inline-block;
                font-size: 16px;
                .pd5();
            }
            .content{
                    @{center}:center;
                    .blog-content-title{
                    text-align: left;
                    display: block; 
                    margin-bottom: 10px;
                }
            }
            .inp-title{
                width: 420px;
                height:25px;
                border-radius: 3%;
            }
            .suc{
                text-align: center;
            }
            .box {
                @{center}:center;
                 display: inline-block;
                height: auto;
                width: auto;
                .checkbox{
                    display: inline-block;
                    padding: 5px;
                    .mten(0px 0px 10px 0);
                }
            }
            .authors{
                @{center}:center;
                padding: 5px;
            }
            .preview{
                padding: 10px 20px;
                border: 0.5px solid rgba(0, 0, 0, 0.4);
                ul{
                    padding: 0; 
                    li{
                        display: inline-block;
                        margin-right: 10px;
                    }
                }
                button{
                    border-width: 0;
                    background-color: red;
                    padding: 10px 10px;
                    color: #fff;
                    margin-top: 10px;
                }
               
            }
           
        } 
    }
</style>
