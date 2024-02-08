let inputText = document.querySelectorAll("input");
var message = document.querySelectorAll('.validate');
let email=document.getElementById('email');
let submit=document.getElementById('submit');
let password=document.getElementById("password");
email.addEventListener('keyup',()=>{
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(!pattern.test(email.value)){
        message[0].innerHTML=`&nbsp; &nbsp; &nbsp;<i class="fa-solid fa-close error"></i>
        <p class="red">Enter a valid email</p><br>`
    }
    else{
        message[0].innerHTML= `&nbsp; &nbsp; &nbsp; <i class="fa-solid fa-check success"></i>` 
     }
});
password.addEventListener('keyup',()=>{
    if(password.value.length<8){
        message[1].innerHTML= `<p class="red">The password is too short</p><br>` 
    }
    else{
        message[1].innerHTML= `&nbsp; &nbsp; &nbsp; <i class="fa-solid fa-check success"></i>`  
    }
});
submit.addEventListener('click',()=>{
    inputText.forEach((input,i)=>{
        if(input.value==""){
            message[i].innerHTML= `<i class="fa-solid fa-close error"></i>
            <p class="red">This field can not be empty</p><br>` 
        }
        else{
            message[i].innerHTML= `&nbsp; &nbsp; <i class="fa-solid fa-check success"></i>` 
         }
        });
})

function validate(target,i){
    let targetEl=document.getElementById(target);
        if (targetEl.value === "" && i==4) {
            message[i].innerHTML= `&nbsp; &nbsp; <i class="fa-solid fa-close error"></i>
        <p class="red">Please select an option</p><br>`
     }
     else if(targetEl.value === ""){
        message[i].innerHTML= `&nbsp; &nbsp; <i class="fa-solid fa-close error"></i>
        <p class="red">This field can not be empty</p><br>`
     }
     else{
        message[i].innerHTML= `&nbsp; &nbsp; <i class="fa-solid fa-check success"></i>` 
     }
    }