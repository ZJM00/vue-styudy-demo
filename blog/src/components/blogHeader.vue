<template>
    <nav>
        <ul>
            <li>
                <router-link to='/' exact>博客</router-link>
                 <router-link to='/add' exact>写博客</router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    name:'blogHeader'
}
</script>
<style lang="less" scoped>
nav{
    background: crimson;
    padding: 30px 0;
    margin-bottom: 40px;
    ul{
    list-style: none;
    text-align: center;
    margin:auto auto;
        li{
            display: inline-block;
            margin: 0 10px;
            a{
                text-decoration: none;
                color:#fff;
                padding: 12px;
                border-radius: 5px;
            }
            .router-link-active{
                background: rgba(255,255,255,0.8);
                color:#444;
            }
        }
    }   
}
</style>
