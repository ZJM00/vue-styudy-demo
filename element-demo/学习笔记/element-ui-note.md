
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