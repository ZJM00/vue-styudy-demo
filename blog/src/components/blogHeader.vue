<template>
    <nav>
        <ul>
            <li>
<<<<<<< HEAD
                <router-link to='/blog/show' exact>博客</router-link>
                 <router-link to='/blog/add' exact>写博客</router-link>
=======
                <router-link to='/' exact>博客</router-link>
                 <router-link to='/add' exact>写博客</router-link>
>>>>>>> 72f934c8bd661a5e7996c4c8ed863d1f34a705c8
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
<<<<<<< HEAD
    name:'blogHeader',
    data() {
        return {
            blog:{},
            id:null,
        }
    },
=======
    name:'blogHeader'
>>>>>>> 72f934c8bd661a5e7996c4c8ed863d1f34a705c8
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
