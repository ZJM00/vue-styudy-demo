<template>
    <div id="show-blogs" v-theme:column='"wide"'>
        <h2>博客总览</h2> 
        <input type="text" name="" id="" placeholder="搜索" v-model="search">
        <div class="single-blog" v-for='(blog,ind) in filterBlogs' :key="ind"  >
            <router-link :to="{name:'singleBlog',params:{id:blog.id,blog:blog}}">
                <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>   
            </router-link>
           
            <article>{{blog.content | sinppet}}</article>
        </div>
    </div>
</template>
<script>
export default {
    name:'show-blogs',
    data(){
        return {
            blogs:[],
            search:"",
            id:null,
            blog:{}
        }
    },
    created(){
        // this.$ajax.get("http://jsonplaceholder.typicode.com/posts")
        //     .then(data=>{
               
        //         this.blogs = data.data.slice(0,10); 
        //         console.log(this.blogs);
        //         }
        // );

        //this.$ajax.get("../../static/posts.json")   //static文件夹是vue-cli向外暴露点的静态文件夹，只能放在这
            // .then(data=>{
            //         this.blogs = data.data.slice(0,10); 
            //         // console.log(this.blogs);
            //         }
            // );
        //

        // 使用免费的firebase云端数据库，读取数据
         this.$ajax.get("https://blog-2f8f5.firebaseio.com/posts.json") 
            .then(data=>{
                //console.log(data.json()) data.json()是返回一个promise对象，但是报错，不知道为什么
                let d =  data.data;
                for(let val in d){
                    d[val].id = val;
                    this.blogs.push(d[val]);
                }
                console.log(this.blogs)
                // this.blogs = data.config.data.content.slice(0,10); 
            }
        );
    },
    computed: {
        filterBlogs(){
            return this.blogs.filter((blog) => {
                //console.log(blog.title.match(this.search))
                return blog.title.match(this.search);
            });
        }
    },
    filters:{
       'to-uppercase':function(val){
            return val.toUpperCase();
        },
    },
    directives:{
       "rainbow":{
            bind(el,binding,vnode){
                el.style.color =  `#${Math.random().toString().slice(2,8)}`;
            }
        }
    }
}
</script>
<style lang="less" scoped>
#show-blogs{
    max-width: 800px;
    margin:0 auto;
    text-align: center;  
    padding: 20px;
    .single-blog{
       padding: 20px;
        margin: 20px 0;
        box-sizing: border-box;
        background: #eee;
        article{
            text-align: left;
        }
    }
    a{
        text-decoration: none;
    }
    input[type='text']{
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
}
    
</style>