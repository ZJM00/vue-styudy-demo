<template>
    <div class="comment">
        <div>
            <h3>发表评论</h3>
        </div> 
        <hr> 
        <textarea name="" id="" placeholder="不要发评论了" v-model='content'></textarea>
        <mt-button type='primary' size='large' @click='submit'>发表评论</mt-button>
        <div class="all-comment">
            <div class='commit-title' v-for='(item,ind) in comments' :key='ind'>
                <div class='bac'>
                    <p>
                        <span>第{{ind+1}}楼</span>
                        <span> 用户：{{item.user_name}}</span> 
                    </p>
                    <span>发表时间：{{item.add_time | time}}</span>  
                </div>
                <p class="content">{{item.content == ''?'很烂':item.content}}</p>
            </div>
           
        </div>
        <mt-button size='large' plain  type="danger" @click='getMOre'>加载更多</mt-button>
    </div>
</template>
<script>
export default {
    name:'comment',
    data(){
        return {
            pageIndex:1,
            comments:[],
            content:''
        }
    },
    props:{
        arrId:{
            type:String,
            required:''
        }
    },
    created(){
        this.getComment(this.pageIndex);
    },
    methods:{
        getComment(){
            this.$ajax.get(`/getcomments/${this.arrId}?pageindex=${this.pageIndex++}`).then(data=>{
                this.comments = [...this.comments,...data.data.message];
            })
        },
        getMOre(){
           
            console.log( this.pageIndex)
            this.getComment();
        },
        submit(){
            let data = {

            }
            if(this.content.trim()){
                this.$ajax.post(`/postcomment/${this.arrId}`,JSON.stringify({"content":this.content.trim()})).then(response=>{
                    if(response.data.status == 0){
                        this.comments.unshift({add_time:Date.now(),"content":this.content.trim(),"user_name":"匿名用户"})
                        this.content = ''
                    }
                },err=>{
                    console.log(err)
                })
            }
          
        },
    }
}
</script>
<style lang="less" scoped>
.comment{
    hr{
        border: none;
        margin:0.3rem 0;
    }
    textarea{
        width:99%;
        height: 10rem;
        &:focus{
            outline: none;
            border-color: #2453d3d7;
            box-shadow: 1px 2px 8px 1px #999 inset;
        }
    }
    .all-comment{
        margin-top:0.3rem;
        .commit-title{
            .bac{
                background-color: rgba(153, 153, 153, 0.612);
                display: flex;
                flex-direction: nowrap;
                flex: 1;
                justify-content: space-between;
                flex-wrap: nowrap;
                width: 100%;
                p{
                    padding: 0 0 0 10px;
                }
                span{
                    font-size: 12px;
                    padding: 0.2rem 0.2rem;
                    display: inline-block;
                } 
                > span{
                    padding: 0 10px 0 0 ;
                }
              
            }
           
            .content{
                height: 2rem;
                line-height: 2rem;
                margin-left: 2rem;
                font-size: 16px;
                height: auto;
            }
        }
      
    }
}
</style>

