<template>
    <div v-if='tuterm' class="tuterm">
        <ul class="wrap">
             <li v-for='(item,ind) in imgList' 
                :key=ind  class="img-tutrem">
                <img  :src="item.src" 
                @click='tuterm($event,ind)'>  
            </li>
        </ul>
        
    </div>
</template>
<script>
export default {
    name:'tutrem',
    data(){
        return {
            tuterm:true,
            imgList:this.$route.params.imgList,
            id:this.$route.params.id,
        }
    },    
}
</script>
<style lang="less" scoped>
 .tuterm{
    margin-top: 40px;
    width: 100%;
    height: 100%;
    //background: #000;
    //overflow: hidden;
    .wrap{
        width: 200%;
        display: flex;
        flex-direction:row;
        justify-content: center;
        .img-tutrem{
            overflow-x: auto;
            width: 100%;
            height: 100%;
        }
        img{
            width: auto;
        }
    }
    
}
</style>
