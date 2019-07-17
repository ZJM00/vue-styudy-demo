<template>
    <div id="single-blog">
        <h2>{{blog.title | to-uppercase}}</h2>
        <div class="content">
             <article>内容：{{blog.content}}</article>
            <p>作者：{{blog.author}}</p>
            <p>分类：
                <ul>
                    <li v-for='(category,ind) in blog.categories' :key=ind>
                        {{category}}
                    </li>
                </ul>
            </p>
        </div>
       
        <router-link :to='{name:"editor",params:{id:id,blog:blog}}' tag="button">编辑</router-link> <button @click='deleteBlog'>删除</button>
    </div>
</template>
<script>
export default {
    name:'single-blog',
    data(){
        return {
            //blog:this.$route.params.blog,  showBlog 中已经拿到数据了 ，用命名路由的方式传输数据, 
            id:this.$route.params.id,
            blog:{}
        }
    },
    created() {
        // this.id = this.$route.params.id;
        // this.blog = this.$route.params.blog;

       this.$ajax.get('https://blog-2f8f5.firebaseio.com/posts/' + this.id + '.json')
            .then(data=>{
                //console.log(data)
                this.blog = data.data; 
                this.blog.id= this.id; 
               
                console.log(this.blog)
            })
        
    },
    methods:{
        deleteBlog(){
            this.$ajax.delete('https://blog-2f8f5.firebaseio.com/posts/' + this.id + ".json")
                .then(response=>{
                    this.$router.push({name:"Blog"})
                })
        }
    }
}
</script>
<style lang="less" scoped>
#single-blog{
    max-width: 960px;
    margin:0 auto;
    text-align: center;
    border: 1px solid #aaa;
    padding: 20px;
    background: #eee;
    .content{
        text-align: left;
    }
    ul{
        width: 200px;
        list-style: none; 
        display: inline-block;
        padding: 5px 8px;
        li{
            display: inline-block;
            width: auto;
            padding: 5px 8px;
        }
    }
}
</style>

