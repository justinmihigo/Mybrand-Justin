function primeNumbers(arr){
    let prime=[];
    for(let i=0; i<arr.length;i++){
        let isPrime=true;
        if(arr[i]<2){
            isPrime=false;
        }
       for (let j=2;j<=Math.sqrt(arr[i]);j++){
        if(arr[i]%j==0){
            isPrime=false;
            break;
        }
        else {
            isPrime=true;
        }
       } 
       if(isPrime===true){
        prime.push(arr[i]);
       }
    }
    return prime;
}
console.log(primeNumbers([3,4,6,7,8,6]));