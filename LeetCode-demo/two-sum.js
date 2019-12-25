/***
给定一个整数数组，返回两个数字的索引，以便它们加起来成为一个特定的目标。

您可以假定每个输入都只有一个解决方案，并且您可能不会两次使用同一元素。

例：
    给定nums = [2，7，11，15]，目标= 9，
    因为nums [ 0 ] + nums [ 1 ] = 2 + 7 = 9，返回[ 0，1 ]。

***/

var twoSum = function(nums, target) {
    let x = [];
    let o = [];
    nums.forEach((e,i)=>{
        let m = target - e;
        x = nums.slice(i+1,this.length);
        x.filter((el,it)=>{
            if(el == m) {
                o.push(it+i+1,i);
            }
        });
    });
    return o.reverse();
};
console.log(twoSum([2,7,11,15],9)) // [0,1]
