let bars = document.getElementById("bars");
let aside = document.getElementById("aside");
let navlinks = document.querySelector("nav");
let closeBtn = document.getElementById("close");
let body = document.querySelector("body");
let testimonialsContainer = document.querySelector(".testimony-list");
let testimonials = document.querySelectorAll(".testimony");
let sliders = document.querySelectorAll(".slider");
function collapse() {
    if (window.innerWidth <= 1000) {
        bars.addEventListener('click', () => {
            aside.classList.toggle("hide");
            bars.style.display = "none";
            closeBtn.style.display = "block";
        });
    }
}
function close() {
    closeBtn.addEventListener('click', () => {
        bars.style.display = 'block';
        aside.classList.toggle('hide');
        closeBtn.style.display = "none";
    });
}
body.addEventListener('click', (event) => {
    if (!navlinks.contains(event.target)) {
        aside.classList.add("hide");
        bars.style.display = "block";
        closeBtn.style.display = "none";
    }

});
collapse();
close();
// for the sliding testimonies
let currentIndex = 0;
function showSlide(index) {
    currentIndex = index;
    testimonials.forEach((testimonial, i) => {
        // Display only the testimonial at the current index
        testimonial.style.display = i === index ? 'flex' : 'none';
        testimonial.style.opacity="1";
    });
    sliders.forEach((slider, i) => {
        slider.classList.remove("background");
        if (i === index) {
            slider.classList.add("background");
        }
    });
}
function changeTestimonial(index) {
    showSlide(index);
}
function nextSlide() {
    if (currentIndex < testimonials.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    showSlide(currentIndex);
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = testimonials.length - 1;
    }
    showSlide(currentIndex);
}

// Auto-slide every 3 seconds (adjust as needed)
setInterval(nextSlide, 3000);

// making the forms validated
let inputText = document.querySelectorAll("input");
var message = document.querySelectorAll('.validate');
let textarea=document.querySelector("textarea");
let select=document.querySelector('select');
let email=document.getElementById('email');
let submit=document.getElementById('submit');
let phone=document.getElementById('phone');
inputText.forEach((input, i) => {
    input.addEventListener('keyup', () => {
        if (input.value === "") {
            message[i].innerHTML= `<i class="fa-solid fa-close error"></i>
        <p class="red">this field can not be empty</p>`
     }
     else{
        message[i].innerHTML= `<i class="fa-solid fa-check success"></i>` 
     }
        
    });

});

function validate(target,i){
    let targetEl=document.getElementById(target);
        if (targetEl.value === "" && i==4) {
            message[i].innerHTML= `&nbsp; &nbsp; <i class="fa-solid fa-close error"></i>
        <p class="red">Please select an option</p><br>`
     }
     else if(targetEl.value.trim() === ""){
        message[i].innerHTML= `&nbsp; &nbsp; <i class="fa-solid fa-close error"></i>
        <p class="red">This field can not be empty</p><br>`
     }
     else{
        message[i].innerHTML= `&nbsp; &nbsp; <i class="fa-solid fa-check success"></i>` 
     }
}
phone.addEventListener("keyup",()=>{
let regex=/^(\+\d{3})([7238]\d{4,6})$/;
    if(!regex.test(phone.value)){
        message[1].innerHTML=`<i class="fa-solid fa-close error"></i>
        <p class="red">Enter a valid phone number</p><br>`
    }
});
email.addEventListener('keyup',()=>{
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(!pattern.test(email.value)){
        message[2].innerHTML=`<i class="fa-solid fa-close error"></i>
        <p class="red">Enter a valid email</p><br>`
    }
});
submit.addEventListener('click',()=>{
    inputText.forEach((input,i)=>{
        if(input.value.trim()==""){
            message[i].innerHTML= `<i class="fa-solid fa-close error"></i>
            <p class="red">This field can not be empty</p><br>` 
        }
        });
})
function retrieveLs(){
    let blogList=document.querySelector('.blog-list');
    let retrieved=localStorage.getItem("Storedblogs");
    let objects=JSON.parse(retrieved);
    let blog=document.createElement("article");
    blog.classList.add('blog');
    // for(let i=0; i<objects.length;i++){
    //     blog.innerHTML=`<img src='resources/${objects[i].image}' width="200" height="auto" alt="react js">
    //     <p class="center"><b>${objects[i].title}</b></p>
    //     <p class="desc">${objects[i].blogContent}
    //     </p>
    //     <div class="reactions">
    //         <button class="special">Read more</button>
    //         <div class="reaction-btn">
    //            <span>823 &nbsp;<i class="fa-solid fa-thumbs-up"></i></span> &nbsp;
    //            <span>237 &nbsp;<i class="fa-solid fa-comment"></i></span>
    //         </div>
    //     </div>`
    //     blogList.appendChild(blog);
    // }
    objects.forEach((object,i)=>{
        blog.innerHTML=`<img src='resources/${object.image}' width="200" height="auto" alt="react js">
        <p class="center"><b>${object.title}</b></p>
        <p class="desc">${objects[i].blogContent.substr(0,30)+'...'}
        </p>
        <div class="reactions">
            <button class="special">Read more</button>
            <div class="reaction-btn">
               <span>823 &nbsp;<i class="fa-solid fa-thumbs-up"></i></span> &nbsp;
               <span>237 &nbsp;<i class="fa-solid fa-comment"></i></span>
            </div>
        </div>`
        let clone=blog.cloneNode(true);
        blogList.appendChild(clone);
        blogList.addEventListener('click',(e)=>{
            let target=e.target;
            let url="../html-pages/singleBlog.html"
            if(target.classList.contains('special')){
                window.location.href=url+'?id='+i;
            }
        });
    });

}
window.onload=retrieveLs();

function modes(){
    let header=document.querySelector('header');
    let a=document.querySelector('#navlinks ul a');
    document.body.classList.toggle('body'); 
    header.classList.toggle('body');
}
