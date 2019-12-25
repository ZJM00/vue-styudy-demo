/***给定一个字符串小号，发现最长的回文子小号。
范例1：
输入： “ babad”
 输出： “ bab”
 注意： “ aba”也是有效答案。

范例2：
输入： “ cbbd”
 输出： “ bb”
 **/

// 第一版
	// var longestPalindrome = function(s) {	
	//  	let sLen = s.length;
	//  	if(sLen <= 2){
	// 		if(s[0] == s[1]){
	// 			cons
	// 			return s;
	// 		}
	// 	}else{
	// 		let t = s[0];
	// 	 	let target = s.slice(1,sLen);
	// 	 	let k = 0;
	// 		for(let i = target.length - 1; i >= 0; i--) {
	// 	 		if(target[i] == t){
	// 	 			let m = s.slice(0,i+1);
	// 	 			let len = m.length;
	// 	 			if( len == 2){
	// 	 				if( m[0] == m[1]){
	// 	 					return m;
	// 	 				}
	// 	 			}else{
	// 	 				for(let j = 0; j <= parseInt(len/2);j++) {
	// 		 				if(m[j] == m[len - j - 1]){
	// 		 					k++;
	// 		 				}
	// 		 			}
	// 		 			if( k == parseInt(len/2) || k == parseInt(len/2) + 1){
	// 		 				return m;
	// 		 			}else{
	// 		 				longestPalindrome(target);
	// 		 			}
	// 	 			}
	// 	 		}else{
	// 		 		longestPalindrome(target);
	// 		 	}
	// 	 	}
	// 	}
	//  	// if(target.search(t) !== -1){
	//  	// 	let m = t + target;

	//  	// 	// let it = target.search(t);
	//  	// 	// console.log(it)
	// 	 // 	// let m = s.substring(0,it);
	// 	 // 	let k=0;
	// 	 //    for(let i = 0; i < parseInt(m.length/2); i++){
	// 	 //    	if(m[i] == m[m.length-1-i]){
	// 	 //    		k++;
	// 	 //    	}
	// 	 //    } 
	// 		// if(k == parseInt(m.length/2) || k == parseInt(m.length/2)+1){
	// 		// 	return m;
	// 	 //    }else{
	// 	 //    	longestPalindrome(m);
	// 	 //    }
	//  	// }else{
	//  	// 	longestPalindrome(target);
	//  	// }
	// };

// 第二版
	// var longestPalindrome = function(s) {	
	// 	if(s.length > 2) {
	// 		let key = true;
			

	// 		for(let i = 0;i<s.length;i++) {
	// 			for(let j = s.length - 1;j > i;j--) {
	// 				if(s[i] == s[j]){
	// 					//key = false;
	// 					let m = s.slice(i,j+1);
	// 					let k = 0;
	// 					let len = m.length;
	// 					for(let y = 0; y < parseInt(len/2); y++){
	// 						if(m[y] == m[len - 1 -y]){
	// 							k++;
	// 						}
	// 					}
	// 					if( k ==  parseInt(len/2) ||  k == parseInt(len/2) + 1){
	// 						return m;
	// 					}else{
	// 						longestPalindrome(s.slice(i+1,s.length) + s[i]);
	// 					}
	// 				}
	// 			}
	// 		}
	// 		// if(key){
	// 		// 	return s[i];
	// 		// }
	// 	}else if(s.length == 2){
	// 		if(s[0] == s[1]) {
	// 			return s;
	// 		}else{
	// 			return s[0];
	// 		}
	// 	}else{
	// 		return s;
	// 	}
	// };

// 第三版 超时
	// var longestPalindrome = function(s) {	
	// 	let slen = s.length;
	// 	if(slen == 2){
	// 		return s[0] == s[1] ? s:s[0];
	//     }
	//     if(slen < 2){
	//     	return s;
	//     }
	// 	const recursive = (arr) =>{
	// 		let sm = s.slice(parseInt(arr[0]),parseInt(arr[1])+1);
	// 		let len = sm.length;
	//     	if(len >=  2) {
	//     		let k = 0;
	// 			for(let y = 0; y < parseInt(len/2); y++){
	// 				if(sm[y] == sm[len - 1 -y]){
	// 					k++;
	// 				}
	// 			}
	// 			if( k >=  parseInt(len/2) ){
	// 				return sm;
	// 			}
	// 		}else 
	// 			return sm;
	//     }

	// 	let arr = [];
	// 	for(let i = 0; i < s.length - 1; i++){
	// 		for(let j = i; j < s.length; j++){
	// 			if(s[i]==s[j]){
	// 				arr.push([i,j]);
	// 			}	
	// 		}
			
	// 	}
	// 	arr.sort((a,b)=>{
	// 		let m = a[1] - a[0];
	// 		let n = b[1] - b[0]
	// 		return n-m;
	// 	});
	// 	let ov = [];
	// 	for(let j=0;j < arr.length;j++){
	// 		ov.push(recursive(arr[j]));
	// 	}
	// 	let noUnd = e =>{
	// 		if(e){
	// 			return false;
	// 		}else{
	// 			return true;
	// 		}
	// 	}
	// 	console.log(ov)
	// 	if(ov.every(noUnd)){
	// 		return s[0];
	// 	}else{
	// 		for (var x = 0; x < ov.length; x++) {
	// 			if(ov[x]){
	// 				return ov[x];
	// 			}
	// 		}
	// 	}
	// };
// 第四版 超时
var longestPalindrome = function(s) {	
	let slen = s.length;
	if(slen == 2){
		return s[0] == s[1] ? s:s[0];
    }
    if(slen < 2){
    	return s;
    }
	const recursive = (arr) =>{
		let sm = s.slice(parseInt(arr[0]),parseInt(arr[1])+1);
		let len = sm.length;
    	if(len >=  2) {
    		let k = 0;
			for(let y = 0; y < parseInt(len/2); y++){
				if(sm[y] == sm[len - 1 -y]){
					k++;
				}
			}
			if( k >=  parseInt(len/2) ){
				return sm;
			}
		}else 
			return sm;
    }
    let target = s[0];
    let ov =  null;
	let arr = [];
	for(let i = 0; i < slen - 1; i++){
		for(let j = slen - 1; j > i; j--){
			if(s[i]==s[j]){
				ov = recursive([i,j]);
				if(ov) {
					target = ov.length>target.length?ov:target;
				}
			}
		}
	}
	return target;
}
	// let noUnd = e =>{
	// 	if(e){
	// 		return false;
	// 	}else{
	// 		return true;
	// 	}
	// }
	// if(!arr.every(noUnd)){
	// 	return s[0];
	// }
	// };
let mm = longestPalindrome("abcd");
console.log(mm)
