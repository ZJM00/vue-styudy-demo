<template>
    <div class="header">
        <div class="back">
            <span class="iconfont">&#xe624;</span>
        </div>
        <div class="search">
            <svg class="icon icon-symbol " aria-hidden="true">
                <use xlink:href="#iconsousuo1"></use>
            </svg>
            <input type="text" name="" id="" placeholder="输入城市/景点">
        </div>
        <div class="city iconfont iconjiantou-after" >城市</div>
    </div>
</template>
<script>
export default {
    name:"homeHead",
}
</script>
<style lang="less" scope>
.pad(@x){
    padding: @x;
}
    .header{
        display: flex;
        //position: fixed;
        top:0;
        height: 2.15rem;
        background-color: #00bcd4;
        width: 100%;
        color: #fff;
        .back{
          
           line-height: 2.15rem;
           font-size: 0.6rem;
           padding: 0 0.5rem;
        }
        .search{
            position: relative;
            height: 100%;
            //line-height: 2.15rem;
            flex:1;
            display: flex;
            flex-direction: row;
            align-items: center;
            input{
                border-width: 0;
                width: 100%;
                border-radius: 0.2rem;
                background: #fff;
                font-size: 0.6rem;
                padding: 0.3rem 0;
                text-indent: 1.2rem;
                // &::placeholder{
                //     white-space:10px;
                // }
                // &:before{
                //    content:"\e62b";
                //     position: absolute;
                //     top:50px;
                //     width: 50px;
                //     height: 50px;
                //     font-size: 16px;
                //     z-index: 100;
                // }
            }
        }
        .city{
            //height: 1.6rem;
            line-height: 2.15rem;
            text-align: center;
             font-size: 0.6rem;
             padding: 0 0.4rem;
        }
    }
    .icon{
         width: 0.9rem; height: 0.9rem;
         position: absolute;
         left: 0.2rem;

    }
</style>