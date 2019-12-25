// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

// 示例 1:
// 输入: 121
// 输出: true

// 示例 2:
// 输入: -121
// 输出: false
// 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

// 示例 3:
// 输入: 10
// 输出: false
// 解释: 从右向左读, 为 01 。因此它不是一个回文数。

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
	let s = x.toString().split("").reverse();
    let k = 0;
    let m = x.toString();
    s.forEach((e,i) => {
    	if(e == m[i]){
    		k++;
    	}
    });
  
    return k == s.length?true:false;
};
// console.log(isPalindrome(121));


// 双指针问题
var removeDuplicates = function(nums) {
    let target = '';
    for( let i = 1; i < nums.length; i++) {
        if(nums[i] == target) {
            nums.splice(i,1);
            i--;
        }else{
            target = nums[i]
        }
    }
    return nums;
 return nums;
    
};
//console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))




var removeElement = function(nums, val) {
   //  for(let i = 0; i < nums.length;i++) {
   //      if(nums[i] == val) {
   //          nums.splice(i,1);
   //          i--;
   //      }
   // }
   // return nums; 
};
console.log(removeElement([0,1,2,2,3,0,4,2]
,2))


