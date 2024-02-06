function rev(arr){
    let arrRev=[];
    for(let i=arr.length-1;i>=0;i--){
        arrRev.push(arr[i]);
    }
    return arrRev;
}
console.log(rev([1,2,3,4,5]));