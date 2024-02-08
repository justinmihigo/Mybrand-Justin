function palindrome(str){
    let newStr=str.split(" ").join("").toLowerCase();
    for(let i=0;i<newStr.length/2;i++){
            if(newStr[i]!==newStr[newStr.length-i-1]){
                return false;
            }
        }
        return true;
    }
if(palindrome("mamam")){
    console.log("the string is palindrome");
}
else{
    console.log("the string is not palindrome");
}
