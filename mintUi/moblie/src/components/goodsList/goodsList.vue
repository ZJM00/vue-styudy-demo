<template >
    <div class="goods">
        <div class="item">
            <img src="" alt="">
            <h3 class="title"></h3>
            <div class="info">
                <p class="price">
                    <span class="new-price"></span>
                    <span class="old-price"></span>
                </p>
                <p class="sell">
                    <span></span>
                    <span></span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.goods{
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    justify-content: space-between;
    margin:0.3rem 0;
    background: #ccccccaa;
    .item{
        width: 49%;
        border:1px solid #ccc;
        box-shadow: 0 0  8px #ccc0a;
    }

}
</style>
