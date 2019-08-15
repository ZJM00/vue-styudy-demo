<template>
    <div>
          <div class='flash'  >
            <button @touchstart='getCount(true)'>&minus;</button>
            <input type="text"  v-model='count' @input='getNum($event)'  @blur='blur'>
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
    created(){
        this.count = this.num;
    },
    props:{
        max:{
            type:Number,
            required:0,
            //default:1000,
        },
        num:{
            type:Number,
            required:0,
            default:1,
        },
        emit:{   //是否发送 $emit
            type:Boolean,
            required:0,
            
        },
        carId:{
            type:Number,
            required:false,
            default:0,
        }
    },
    methods:{
        getNum(e){
            if(/\D/g.test(this.count)){
                this.count=this.count.replace(/\D/g,'');
            }
            if(parseInt(this.count) > this.max){
                this.count = this.max;
                this.sendEmit();
            }
            this.sendEmit();
            this.changeCount();
        },
        blur(){
            if(this.count == ""){
                this.count = 1;
            }else{
                this.sendEmit();
            }
            
        },
        getCount(flag){
            if(flag){
                this.count = this.count>1?--this.count:1;
                this.sendEmit();
            }else{
                this.count = this.count<60?++this.count:this.max;
                this.sendEmit();
            }
            this.changeCount();
        },
        sendEmit(){
            if(this.emit){
                this.$emit("getCarCount",this.count);
            }
        },
        changeCount(){
            if(!this.emit){
                this.$store.commit("updateCount",{id:this.carId,count:this.count})
            }
          
        }
    },

}
</script>
<style lang="less" scoped>
.flash{
    font-size: 16px;
    display: inline-block;
    border: 1px solid rgba(0,0,0,0.2);
    position: relative;
    input{
        width: 1.5em;
        height: 0.8em;
        padding: 0.4em 0.7em;
        border:none;
        text-align: center;
        letter-spacing: 0.07em;
    }
    button{
        border:none;
        width: 2.5em;
        height:1.9em;
        padding: 0.5em 0;
        font-size: 1em;
        background-color: #dcdcdc4d;
        line-height: 0.8em;
        &:active{
            background-color:  #dcdcdc;
        }
    }
}
    @media (max-width:410px) {
        .flash{
           font-size: 12px;
        }
    }
</style>