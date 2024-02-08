function inplace(arr){
    for(let i=0;i<arr.length/2;i++){
       [arr[i],arr[arr.length-1-i]]=[arr[arr.length-i-1],arr[i]];            
        //     if(i<=arr.length/2){
        //         arr[i]=arr[arr.length-i-1];
        // }
        // if(i<=arr.length/2){
        //     arr[i]=arr[arr.length-i-1];
        // }
        // if(i>=arr.length/2){
        //     arr[arr.length-i-1]=arr[i];
        }

    return arr;
    }

console.log(inplace([3,5,6,7]));