### 1. toString(radix)  radix   可选。规定表示数字的基数，是 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。
	但是要注意，如果该参数是 10 以外的其他值，则 ECMAScript 标准允许实现返回任意值。
		2 - 数字以二进制值显示
		8 - 数字以八进制值显示
		16 - 数字以十六进制值显示
	```
	var num = 15;            
	var a = num.toString();     // 15
	var b = num.toString(2);  //  1111
	var c = num.toString(8);  // 17
	var d = num.toString(16);  // f
	```

### 2. 递归：程序调用自身的编程技巧称为递归,是函数自己调用自己.
 - 注意： 需要 return 所需的递归函数。不然就是undefined
 ```
 function recursion(arr) {
	 .
	 .
	 .
	 return recursion(x);
	 // 如果没有 return 。只会得到 undefined
 }
 ```

 