<template>
   <blank-blog :blog='blog'  :msg='msg'  :id='id' :ajax='"patch"'></blank-blog>
  
</template>
<script>
import blankBlog from '@/components/blankBlog.vue'
export default {
    name:'editor-blog',
    data(){
        return {
            id:this.$route.params.id,
            blog:this.$route.params.blog,
            msg:'修改博客'
        }
    },
    components:{
        blankBlog,
    }
}
</script>
<style lang="less" scoped>

</style>
