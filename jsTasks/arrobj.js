function convert(arr){
    let newArr=[];
    let fullArr=[];
    let obj={males:[], females:[]};
    let regex=/\W+/gi;
    arr.forEach(array=>{
        newArr=array.split(regex);
        console.log(newArr);
        fullArr.push(newArr);
        console.log(fullArr);
    });
    // return(fullArr[1][3]);
    for(let i=0;i<fullArr.length;i++){
        for(let j=0;j<fullArr[i].length;j++){
            if(fullArr[i][3]=="male"){
                let  names=fullArr[i][0];
                obj.males[names]={secondName:fullArr[i][1],age:fullArr[i][2]};
            }
            if(fullArr[i][3]=="female"){
                let  names=fullArr[i][0];
                obj.females[names]={secondName:fullArr[i][1],age:fullArr[i][2]};
            }
        }
    }
    return obj;
}
console.log(convert(["Patrick wyne, 30, male", "lil wyne, 32, male","Eric mimi, 21, female","Dodos deck, 21,male","Alian Dwine, 22,male","Patrick wyne, 33, male","Patrick wyne, 10,trans","Patrick wyne, 40,male"]));