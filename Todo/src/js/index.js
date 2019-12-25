// var vm = new Vue({
//     el:"#todo-app",
//     data:{
//         todo:[
//             {id:1,title:"学习vue",completed:false,finsh:false},
//             {id:2,title:"完成vue",completed:false,finsh:false},
//             {id:3,title:"进阶vue",completed:false,finsh:false},
//         ],
//         newValue:'',
//         editValue:'',
//         editorOld:'',
//         todoOld:"all"

//     },
//     methods:{
//         addTodo: function() {
//             if(this.newValue){
//                this.todo.push({id:this.todo.length,title:this.newValue,completed:false,finsh:false}); 
//                this.newValue = '';
//             }
//         },
//         dec(id){
//             console.log(id)
//             id.completed = true;
//         },
//         remove(t){
//             this.todo.splice(this.todo.indexOf(t),1);
//         },
//         edit(t){
//             t.finsh = true;
//             this.editorOld = t.title;
//             t.focus = true;
//         },
//         editorEnter(t){
//             if(this.editValue.length > 0){
//                 t.title = this.editValue;
//             } 
//             t.finsh = false;
//             t.focus = false;
          
//         },
//         cancel(t){
//             t.title = this.editorOld;
//             this.editorOld = '';
//             t.finsh = false;
//             t.focus = false;
//         },
//         allCompleted(){
//             this.todo.map((val)=>{
//                 if(!val.completed){
//                     val.completed = true;
//                 }
//             });
//         },
//        succ(){
//             return this.todo = this.todo.filter(val=>{
//                     return !val.completed;
//             })
//        },
//         allTodo(){
//              return this.todo = [];
//         }
               
//     },
//     directives:{
//         focus:{
//             inserted:function (el,bind){
//                 el.focus();
//             }
//         }
//     },
//     computed:{
//         lastTodo:function(){
//             return this.todo.filter((val)=>{
//                return !val.completed;
//             }).length;
//         },
//         filterTodo(){
//             switch (this.todoOld) {
//                 case "all":
//                     return this.todo;
//                     break;
//                 case "on":
//                     return this.todo.filter(val=>{
//                         return !val.completed;
//                     });
//                     break;
//                 case "todoCom":
//                         return this.todo.filter(val=>{
//                             return val.completed;
//                         })
//                     break;
//                 default:
//                     return this.todo;
//                     break;
//             }
//         }
//     },
//     components:{
//         "todoapp":{
//             template:'#todos',
//             data(){
//                 return {
//                    editor:null,
//                 }
//             },
         
//             props:["todo"],
//             directives:{
//             },
//             methods:{
               
//             },
//             computed:{
//             }
//         }
//     },
// });


