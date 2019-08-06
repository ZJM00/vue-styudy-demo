<template>
    <div id='nav-swiper'>
        <ul class="nav">
            <li v-for="(item,ind) of list" :key="item.id" class="list" @click='change(ind,item.id)'>
                <a href="javascript:void(0)">
                    <span :class='item["flag"]?"min-active":""'>{{item.title}}</span>
                </a> 
            </li>
        </ul>
        <ul class="photo">
            <router-link v-for='item in imgList' :key='item.id' 
                class="list-photo" :to="{'name':'photoComment',params:{id:item.id,info:item}}"
                tag=li>
                
                <img v-lazy='item.img_url' :src='item.img_url' >
                <div class="info">
                    <h3>{{item.seo_title?item.seo_title:item.title}} </h3>
                    <div>{{item.seo_description?item.seo_description:item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
    name:"nav-swiper",
    data(){
        return {
            list:'',
            imgList:""
        }
    },
    created(){
        this.getAll();
        this.getPhotoList(0);
    },
    methods:{
        //点击改变颜色
        change(ind,id){
            this.list[ind]["flag"] =true
            //this.$set(this.list[ind],"flag",true)
            this.list.forEach((e,i) => {
                if(i != ind){
                   this.$set(e,"flag",false) //修改属性，视图不更新，用此方法
                }
            });
            this.getPhotoList(id)
        },
        getPhotoList(id){
            this.$ajax.get('/getimages/' + id).then(response=>{
                if(response){
                     if(response.data.status == 0){
                        this.imgList = response.data.message; 
                    }
                }else{

                }
               
            })
        },
        getAll(){
            this.$ajax.get('/getimgcategory').then(data=>{
                if(data.data.status == 0){
                    this.list = data.data.message;
                    this.list.unshift({id:0,title:'全部'})
                    this.list.forEach((e,ind)=>{
                       this.$set(e,'flag',false)
                    })
                    this.list[0]["flag"] = true;
                    
                }
            })
        },

    },
}
</script>
<style lang="less" scope>
#nav-swiper{
    margin-top: 0px;
    overflow: hidden;
    position: absolute;
    width: 100%;
    .nav{
        list-style: none;
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap; 
        -webkit-overflow-scrolling: touch;
        padding-bottom: 10px;
        margin-bottom: -10px;
        display: flex;
        flex-wrap: nowrap;
        &:after{
            content: '';
            display: block;
            clear: both;
            height: 0;
        }
        &::-webkit-scrollbar {
            display: none;/*隐藏滚轮*/
            }
        .list{   
            width: auto;
            text-align: center;
            flex:1;
            padding: 0.1rem 1.3rem; 
            //width: 70px;;   
            &:hover{
                cursor: pointer;
            }
            &:active {
                opacity: 0.4;
            }
            a{
                -webkit-tap-highlight-color:rgba(0,0,0,0);
                &:hover{
                    color: red!important;
                }
                &:active{
                    color: red;
                }
                span{
                    width:20%; 
                    color: #000;
                }  
            }
         
        }
        @media (min-width: 450px) {
            .list{
                //flex:1;
                //float: left;
                display: inline-block;
            }
        }
        .min-active{
            color:red!important;
        }  
    }    
    .photo{ 
        text-align: center;
         padding: 0.5rem 0.8rem 0rem 0.8rem;
        margin:auto;
        list-style: none;
        li{
            margin-bottom: 0.9rem;
              position: relative;
            box-shadow: 0 0  9px #999;
        }
        img{
            width: 100%;
            background-size: contain;
           vertical-align: bottom;
        }
    }   
    .info{
        max-height: 5.1rem;
        color:#fff;
        position: absolute;
        bottom: 0;
        text-align: left;
        background-color: #0000003d;
        overflow: hidden;
        h3{
            font-size: 14px;
            padding: 2px 0;        }
       div{
            font-size: 0.8rem;
            line-height: 1.5;
        }
    }
}
</style>
