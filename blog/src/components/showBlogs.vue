<template>
    <div id="show-blogs" v-theme:column='"wide"'>
        <h2>博客总览</h2> 
        <input type="text" name="" id="" placeholder="搜索" v-model="search">
        <div class="single-blog" v-for='(blog,ind) in filterBlogs' :key="ind"  >
            <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
            <article>{{blog.body | sinppet}}</article>
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
        }
    },
    created(){
        // this.$ajax.get("http://jsonplaceholder.typicode.com/posts")
        //     .then(data=>{
               
        //         this.blogs = data.data.slice(0,10); 
        //         console.log(this.blogs);
        //         }
        // );
         this.$ajax.get("../../static/posts.json")  //static文件夹是vue-cli向外暴露点的静态文件夹，只能放在这
            .then(data=>{
               
                this.blogs = data.data.slice(0,10); 
                console.log(this.blogs);
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
    .single-blog{
        padding: 20px;
        margin: 20px 0;
        box-sizing: border-box;
        background: #eee;
        article{
            text-align: left;
        }
    }
}
    
</style>