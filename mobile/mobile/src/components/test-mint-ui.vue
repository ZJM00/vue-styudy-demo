<template>
     <mt-button size='large' type='primary' icon='more' @click='getList'>按钮</mt-button>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    name:'test',
    data(){
        return {
            toastId:""
        }
    },
    methods:{
        getList(){
            this.show();
            setTimeout(()=>{
                this.toastId.close();
            },3000)
        },
        show(){
            this.toastId = Toast({
                message:"这是消息",
                duration:-1,
                position:"top",
                className:"my-toast"
            })
        }
    }
}
</script>
<style lang="less" >
    .my-toast{
        background-color: aqua !important;
        color:red !important;
    }
</style>
