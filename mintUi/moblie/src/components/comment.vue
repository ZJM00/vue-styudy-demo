<template>
    <div class="comment">
        <div>
            <h3>发表评论</h3>
           
        </div> 
        <hr> 
        <textarea name="" id="" placeholder="不要发评论了"></textarea>
        <mt-button type='primary' size='large'>发表评论</mt-button>
        <div>
            
        </div>
    </div>
</template>
<script>
export default {
    name:'comment',
    data(){
        return {

        }
    },
    created(){

    }
}
</script>
<style lang="less" scoped>
.comment{
    textarea{
        width:99%;
        height: 10rem;
        &:focus{
             outline: none;
            border-color: #2453d3d7;
            box-shadow: 1px 2px 8px 1px #999 inset;
        }
    }
}
</style>

