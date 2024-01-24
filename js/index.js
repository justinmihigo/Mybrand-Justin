document.addEventListener("DOMContentLoaded",()=>{
    collapse();    
    close();  
    collapse();  
});
let bars=document.getElementById("bars");
let aside=document.getElementById("aside");
let navlinks=document.querySelector("#navlinks ul");
let closeBtn=document.getElementById("close");
function collapse(){
if(window.innerWidth<=1000){
bars.addEventListener('click',()=>{
    aside.classList.remove("hidden");
    navlinks.style.display="flex";
    navlinks.style.flexDirection="column";
    navlinks.style.gap="20px";
    aside.appendChild(navlinks);
    bars.style.display="none";
    closeBtn.style.display="block";
    if(aside.classList.contains("hide")){
        closeBtn.style.display="block"; 
    }
    if(aside.style.display=="block" && !aside.classList.contains("hide")){
        aside.style.display="none";
    }
});
}
}
function close(){
    closeBtn.addEventListener('click',()=>{
        bars.style.display='block';
        aside.classList.toggle('hide');
        closeBtn.style.display="none";
    });
}
