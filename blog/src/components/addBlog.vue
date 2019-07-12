<template>
   <blank-blog :blog='blog' :id='id'  :msg='msg' :ajax='"add"'></blank-blog>
   
</template>
<script>
import blankBlog from '@/components/blankBlog.vue'
// post和get数据的网址
//https://jsonplaceholder.typicode.com/
//https://jsonplaceholder.typicode.com/posts
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
</style>
