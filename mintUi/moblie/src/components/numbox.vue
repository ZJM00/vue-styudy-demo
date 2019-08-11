<template>
    <div>
          <div class='flash'>
            <button @touchstart='getCount(true)'>&minus;</button>
            <input type="number" value="1"  v-model='count' @input='getNum($event)' 
            @blur='blur'>
            <button @touchstart='getCount(false)'>+</button>
        </div>
    </div>
</template>
<script>
export default {
    name:'num-box',
    data(){
        return {
            count:1,
        }
    },
    props:{
        max:{
            type:Number,
            required:0,
        }
    },
    methods:{
        getNum(e){
            if(/\D/g.test(this.count)){
                this.count=this.count.replace(/\D/g,'');
            }
            if(parseInt(this.count) > this.max){
                this.count = 60;
                this.$emit("getCarCount",this.count);
            }
            this.$emit("getCarCount",this.count);

        },
        blur(){
            if( this.count == ""){
                 this.count = 1;
            }
        },
        getCount(flag){
            if(flag){
                this.count = this.count>1?--this.count:1;
                this.$emit("getCarCount",this.count);
            }else{
                 this.count = this.count<60?++this.count:this.max;
                 this.$emit("getCarCount",this.count);
            }
        }
    },

}
</script>
<style lang="less" scoped>
.flash{
    display: inline-block;
    border: 1px solid rgba(0,0,0,0.2);
    position: relative;
    input{
        width: 1.3rem;
        height: 0.8rem;
        padding: 0.4rem 0.7rem;
        border:none;
        text-align: center;
        letter-spacing: 0.07rem;
    }
    button{
        border:none;
        width: 2.5rem;
        height:1.9rem;
        padding: 0.5rem 0;
        font-size: 16px;
        background-color: #dcdcdc4d;
        line-height: 0.8rem;
        &:active{
            background-color:  #dcdcdc;
        }
    }
}
</style>