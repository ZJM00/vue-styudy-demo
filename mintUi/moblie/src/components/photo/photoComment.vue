<template>
    <div id="photoInfo">
        <h3>{{info.title}}</h3>
        <p class="sub-title">
            <span>发表时间：{{info.add_time | time}}</span>
            <span>点击次数：{{info.click}}次</span>
        </p>
        <div class="img-list">
             <div class="swiper" > 
                 <!-- router-link不能把从方法中获取的数据，带到路由信息上，所以采用this.$router.push -->
                <vue-preview :slides='img'></vue-preview>
            </div>
        </div>
       
        <div v-html=info.content class="content"></div>
        <comment :arrId=id class='com'></comment>
    </div>
    
</template>
<script>
import comment from '../comment.vue'
import tutrem from './tutrem.vue'
export default {
    naem:" photo-comment",
    data(){
        return {
            id:this.$route.params.id,
            info:'',
            img:"",
            tuterms:true,
        }
    },
    created(){
        this.getInfo();
        this.getImg();
    },
    methods:{
        getInfo(){
            fetch('http://www.liulongbin.top:3005/api/getimageInfo/'+this.id).then(data=>{
                return data.json();
            }).then(data=>{
                if(data.status == 0){
                      this.info = data.message[0];
                }
                console.log(data)
            });
        },
        getImg(){
             this.$ajax.get('/getthumimages/'+this.id).then(data=>{
                if(data.data.status == 0){
                    this.img = data.data.message;
                    //循环图片数组，补全图片的宽和高
                    this.img.forEach(e => {
                        e.w=600;
                        e.h=400;
                        e.msrc = e.src;
                    });
                }
                
            })
        },
//缩略图想法
        // tuterm(event,id){
        //     console.log(this.img)
        //     this.$router.push({
        //         name:'tutrem',
        //         params:{
        //             id:this.id,
        //             imgList:this.img,
        //         }
               
        //     })
        // }
    },
    components:{
        comment,tutrem
    }
}

</script>
<style lang="less" >
#photoInfo{
    margin-top: 40px;
    padding: 3px;
    h3{
        font-size: 1.1rem;
        text-align: center;
        padding: 5px;
        color:#26a2ff;
    }
    .sub-title{
        display: flex;
        font-size: 0.8rem;
        padding: 0 5px;
        justify-content: space-between;
        span{
            letter-spacing: 0.05rem;
        }
    }
    .img-list{
        overflow: hidden;
        margin-top: 1rem;
        .swiper{
            cursor: pointer;
           
             > div:first-child{ 
                 overflow:hidden; 
                  margin-bottom: -20px;
                padding-bottom: 20px;
                 > div:first-child{
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        width: 100%;
                        overflow-x:scroll;
                        justify-content: space-around;
                         img{
                            padding: 5px 10px;
                            width: 7.5rem;
                            height: 5rem;
                        }
                    }
                }
            
            }
        
        }
    .content{
        padding-top: 1rem;
        line-height: 1.8;
    }
    .com{
        padding-bottom: 4rem;
    }
}
</style>
