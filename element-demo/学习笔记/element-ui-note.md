
1. el-input 要包裹在 el-form-item 中。

2. el-input 的 type 可以指定text，textarea 和其他 原生 input 的 type 值，实现 不同的input 

3. el-input 的 密码框 ，添加 show-password 属性，即可得到一个可切换显示隐藏的密码框。 或这 type=password

4. Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 el-form-Item 的 prop 属性设置为需校验的字段名即可。
```
  { required: true, message: '请输入活动名称', trigger: 'blur' },  // 必填，错误提示信息，触发条件: 失去焦点
  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }  //最小长度，最大长度，错误提示信息，触发条件: 失去焦点
   { type: 'array', trigger: 'change' }  // type 为值的类型

   // trigger 个人觉得是 input 的事件，focus，blur，input，change等
```

5. 重置按钮

   + 可以在 el-form 中的 el-button 添加原生的button属性  native-type="reset" ，可以达到 重置表单的效果，但不会移除校验结果。  

   + 也可以使用From组件的 resetFields 方法。获取到 from组件后，调用该方法，对整个表单进行重置，将所有字段值重置为表单的默认值并移除校验结果。(如果给表单数据设置默认值，resetFields会移除校验结果，回复默认值，而 native-type="reset"，会把默认值一起清空。但不会移除校验结果)
```
  // 两个基本等同
 <el-button  native-type="reset" @click='resetFrom'>重置</el-button>
 <button type="reset"></button>

resetFrom(){
    this.$refs.form.resetFields();
}
```


6. element的内置 resetFields 和 validate  方法

  + 先获取表单 el-form

 + resetFields 方法，对整个表单进行重置，将所有字段值重置为初始值并移除校验结果。

 + validate  方法: 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise。
 ```
  resetFrom() {
      this.$refs.loginForm.resetFields();
  },
  login() {
        this.$refs.loginForm.validate(valid => {
            console.log(valid)
        });
  }
 ```


7. el-menu 中的 :default-openeds="['1', '3']" 代表默认打开 el-submenu中的 index="1" 和  el-submenu中的 index="3", 如果你没有把 default-openeds 与 vue 中 data 的某个变量绑定，即使你手动下拉别的菜单，你选中的菜单也没法更新到一个变量中。这样一来如果此时vue 刷新 dom，此时默认展开的菜单还是 ‘1’

8. el-menu 的 :unique-opened="true" (即保持只有一个子菜单打开) , 必须加冒号进行属性绑定，或者 直接 unique-opened

9. 开启el-menu 的属性 router(是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转)。

+ 但是要注意: 写路由的时候，开头不能加 / ，会被当做根路径（一级路由）匹配。不加则会被当作当前路由的同级路由解析。
> 如: 当前路径为 http://localhost:8080/home/welcome,  (1) :index="/users" , 会匹配到 一级路由(home 路由) 同级别的路由;  (2) :index="users" , 会匹配到 welcome 路由 同级别的路由; 

+ 不能传参，如 :index=" users + ' ?a=1 ' ", 没有任何作用。

+ 绑定 :index, 可以设置路由高亮。:default-active="$route.path"，匹配的是根路径。 刷新页面不会恢复默认值。但是 :index =" /父路径/当前路径" 才行。

```
<!--当前路径为 http://localhost:8080/home/welcome ，重定向到二级路由 -->

<el-menu text-color="#fff" router :default-active="$route.path">
    <el-menu-item :index="/users" > </el-menu-item>   <!-- 当前路径为 http://localhost:8080/user -->
    <el-menu-item :index="users" > </el-menu-item>    <!-- 当前路径为 http://localhost:8080/home/user -->

    <el-menu-item :index="home/users" > </el-menu-item>  <!-- 当前路径为 http://localhost:8080/home/home/user -->
    <el-menu-item :index="/home/users" > </el-menu-item>  <!-- 当前路径为 http://localhost:8080/home/user -->
</el-menu>

```
> 所以只写当前路径的时候，只会同级路由之间可以匹配。
    
+ github上搜到对应的用法，绑定属性 :router ,也行。更加符合语义，不能设置路由高亮。

```
  <el-menu-item :index="1-2" :route="{path:users}"> </el-menu-item>  
```

10. Table 表格, 用插槽获取 el-table-column 中的数据。el-table-column 中slot 绑定的数据有两个 一个是 row,一个是 $index.

  - row: 是 el-table 中  data 所对应 的当前行的数据。 如果 ```< el-table :data= list>``` ,假如是 第二行，row = list[1]
  - $index: 是 所对应 的当前行的索引，,假如是 第二行，$index=1 
<el-table-column  label="状态">
  <template slot-scope="data">
      {{data.row}}
  </template>
</el-table-column>
```

11. el-input 的 clearable 属性， 是一个可清空的输入框，绑定事件 clear	在点击由 clearable 属性生成的清空按钮时触发
```
<el-input placeholder="请输入内容" v-model="input" class="input-with-select" clearable @clear='clear'></el-input>
```

12. 设置 min-width, 当 div 的宽度到最小的时候，内容不会换行，而是出现 横向滚动栏。保证内容的可读性。