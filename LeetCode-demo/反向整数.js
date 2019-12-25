// 给定一个32位带符号整数，整数的反向数字。
// 范例1：
// 输入： 123
//  输出： 321
// 范例2：

// 输入： -123
//  输出： -321
// 范例3：

// 输入： 120
//  输出： 21
// 注意：假设我们正在处理这只能在32位带符号整数的范围内存储整数的环境：[-2^31  2^31  - 1] 
// 		出于此问题的目的，假定反向整数溢出时函数返回0。

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
	let max = 2**31;
	let m = (Math.sign(x)*(Number(Math.abs(x).toString().split("").reverse().join("")))).toString();
	return m < max - 1 && m > -max ?m:0;
};
console.log(reverse(123));