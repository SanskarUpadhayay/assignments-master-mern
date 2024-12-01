/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  let temp1 = "";
  for(let i=str.length-1;i>=0;i--){
    if(str[i]!=' ' && str[i]!='.' && str[i]!=',' && str[i]!='!' && str[i]!='?' ){
      temp1+=str[i];
    }
  }
  let temp2 = "";
  for(let i=0;i<str.length;i++){
    if(str[i]!=' ' && str[i]!='.' && str[i]!=',' && str[i]!='!' && str[i]!='?' ){
      temp2+=str[i];
    }
  }
  if(temp1 === temp2){
    return true;
  }
  return false;
}

module.exports = isPalindrome;
