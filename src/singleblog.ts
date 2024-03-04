let form=document.querySelector('form')!;
let inputs: NodeListOf<HTMLInputElement>=document.querySelectorAll('.input');
let remarks:NodeListOf<HTMLDivElement>=document.querySelectorAll('.alert');
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    inputs.forEach((input)=>{
        remarks.forEach((remark,i)=>{
            if(input.value===""){
                console.log(input.value);
                remark.innerHTML="The field can not be empty <i class='fa solid fa-close error'></i>";
            }
            else{
                remark.innerHTML="<i class='fa solid fa-check success'></i>"
            }
        });
        
    });
});
function check(id:string, i: number): void{
    let element = document.getElementById(id) as HTMLInputElement;
        if (element.value===""){
            remarks[i].innerHTML="The field can not be empty <i class='fa solid fa-close error'></i>";
        }
        else{
            remarks[i].innerHTML="<i class='fa solid fa-check success'></i>"
        }
}
