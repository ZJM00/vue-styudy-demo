<template>
    <div id='news'>
       
        <h4>{{info.title}}</h4> 
        <div class="title">
            <span>发布时间：{{ info.add_time | time}}</span>
            <span>点击次数：{{info.click}}次</span>
        </div>
        <hr>
        <div v-html='info.content' class="content">
        </div>
        <comment></comment>
    </div>
</template>
<script>
import comment from '../comment.vue'
export default {
    name:'news-info',
    data(){
        return {
            id:'',
            info:{}
        }
    },
    created(){
        this.id = this.$route.params.id;
         console.log(this.id)
        fetch( `http://www.liulongbin.top:3005/api/getnew/${this.id}`).then(data=>{
            return data.json();
        }).then(data=>{
           this.info = data.message[0];
        })
    },
    components:{
        comment,
    }
}
</script>
<style lang="less" scoped>
#news{
    padding-top: 3rem;
     padding-bottom: 4rem;
    text-align: left;
    .title{
        span{ 
            font-size:14px;
            padding: 0.3rem 1rem 0.3rem 0.8rem;
            &:nth-child(1){
                float: left;
            }
             &:nth-child(2){
                float: right;
            }
           
           
        }
        &:after{
            content: '';
            display: block;
            clear: both;
        }
    }
    .content{
        margin-top: 0.3rem;
        padding:0.3rem;
        padding-bottom:0.5em;
    }
    h4{
        font-weight: bold;
        text-align: center;
        color:red;
    }
    b{
        text-align: center;
    }
}
</style>
