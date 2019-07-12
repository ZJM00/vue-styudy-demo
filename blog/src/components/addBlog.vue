<template>
    <div class="wrap"> 
        <h2>{{blog.msg}}</h2>
        <div class="title">
            <form action="" v-if='!sublimted'>
                <div>
                    <label class="theme">主题：</label>
                    <input type="text" placeholder="博客主题" class='inp-title' v-model="blog.title">
                </div>
                <div class="content">
                    <label class="blog-content-title">博客内容</label>
                    <textarea name="" id="" cols="70" rows="10" v-model='blog.content'></textarea>
                </div>
                <span>分类：</span>
                <div class="box">
                     <div class="checkbox" v-for='i in blog.checkbox' :key="i"   >
                        <label >{{i}}</label>
                        <input type="checkbox" name="" id="" :value='i' v-model='blog.categories'>
                    </div>
                </div>
               
                <div class="authors">
                    <label for="">作者</label>
                    <select  v-model="blog.author" >
                        <option  :value="author" v-for='(author,ind) in blog.authors' :key='ind'
                        :selected="ind==0?true:false">{{author}}</option>
                    </select>
                </div>
            </form>
            <div v-if='sublimted' class="suc">
                <h2>您的博客添加成功</h2>
            </div>
           <div class="preview">
               <h3>博客总览</h3>
               <p>博客标题：{{blog.title}}</p>
               <p>博客内容：{{blog.content}}</p> 
               <ul>博客类别：
                   <li v-for='(category,id) in blog.categories' :key='id'>
                       {{category}}
                   </li>
               </ul>
               <p>作者：{{blog.author}}</p>
               <button @click.prevent='post'>{{blog.msg}}</button>
           </div>
        </div>
    </div>
   
</template>
<script>
// post和get数据的网址
//https://jsonplaceholder.typicode.com/
//https://jsonplaceholder.typicode.com/posts
export default {
    name:'add-blog',
    data(){
        return {
            blog:{
                msg:'添加博客',
                title:"",
                inpTitle:'',
                content:"",
                checkbox:["vue.js","Node.js","Angular.js","Rect.js"],
                categories:[],
                author:"",
                authors:["Hemiah","hemty","honey"]
            },
            sublimted:false,

        }
    },
    methods:{
        post(){
            this.$ajax.post("https://jsonplaceholder.typicode.com/posts",
                {
                    title:this.blog.title,
                    body:this.blog.content,
                    userId:1
            }).then(data=>{
                console.log(data);
                this.sublimted = true;
            });
        },
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
    input{

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
