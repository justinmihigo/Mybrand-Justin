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
function fetchLs(){
    let title=document.getElementById('title');
    let image=document.getElementById('image');
    let aside=document.querySelector('.aside');
    let update=document.getElementById('update');
    let content=document.getElementById('content');
    let url=new URLSearchParams(window.location.search);
    let id=url.get('id');
    let blog=JSON.parse(localStorage.getItem('Storedblogs'));
    title.innerText=blog[id].title;
    update.innerText=`Updated on ${blog[id].timeCreated}`;
    image.src=`../resources/${blog[id].image}`;
    content.innerHTML=blog[id].blogContent;
    
}
fetchLs();