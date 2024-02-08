let inputText = document.querySelectorAll("input");
var message = document.querySelectorAll('.validate');
let email = document.getElementById('email');
let submit = document.getElementById('submit');
let title = document.getElementById("title");
let editors = document.getElementById("editors")
let image = document.getElementById('image');
let form = document.querySelector('form');
title.addEventListener('keyup', () => {
    if (title.value.length < 5) {
        message[0].innerHTML = `<p class="red">The title is too short</p><br>`
    }
    else {
        message[0].innerHTML = `&nbsp; &nbsp; &nbsp; <i class="fa-solid fa-check success"></i>`
    }
});


submit.addEventListener('click', () => {
    inputText.forEach((input, i) => {
        if (input.value == "") {
            message[i].innerHTML = `<i class="fa-solid fa-close error"></i>
            <p class="red">This field can not be empty</p><br>`
        }
        // else{
        //     message[i].innerHTML= `&nbsp; &nbsp; <i class="fa-solid fa-check success"></i>` 
        //  }
    });
})


function validate(target, i) {
    let targetEl = document.getElementById(target);
    if (targetEl.value === "") {
        message[i].innerHTML = `&nbsp; &nbsp; <i class="fa-solid fa-close error"></i>
        <p class="red">This field can not be empty</p><br>`
    }
    else {
        message[i].innerHTML = `&nbsp; &nbsp; <i class="fa-solid fa-check success"></i>`;
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
})

function saveLs() {
    submit.addEventListener('click', () => {
        let timeStamp = new Date();
        let timeCreated = timeStamp.getFullYear().toString() + '-' + (timeStamp.getMonth() + 1).toString() + '-' + timeStamp.getDate().toString() + ' ' + timeStamp.getHours().toString() + ':0' + timeStamp.getMinutes().toString();
        let blogTitle = title.value;
        let imgPath = image.value;
        let fileName = imgPath.split('\\').pop().split('/').pop();
        let blogContent = editors.value;
        let obj = { title: blogTitle, image: fileName, blogContent, timeCreated };
        let adding = [];
        adding = localStorage.getItem("Storedblogs");
        adding = adding ? JSON.parse(adding) : [];
        adding.push(obj);
        localStorage.setItem("Storedblogs", JSON.stringify(adding));
    });

}
function edit() {
    let id
    let timeStamp = new Date();
    let timeCreated = timeStamp.getFullYear().toString() + '-' + (timeStamp.getMonth() + 1).toString() + '-' + timeStamp.getDate().toString() + ' ' + timeStamp.getHours().toString() + timeStamp.getMinutes().toString();
    let url = new URLSearchParams(window.location.search);
    title.value = url.get('title');
    image.src = url.get('image');
    id = url.get('id');
    let editor = new FroalaEditor("#editors");
    editor.html.set(url.get('content'));
    let content = editor.html.get();
    console.log(content);
    let Storedblogs = JSON.parse(localStorage.getItem("Storedblogs"));
    submit.addEventListener('click', () => {
        Storedblogs[id].title = document.getElementById('title').value;
        Storedblogs[id].image = document.getElementById('image').src;
        Storedblogs[id].blogContent = document.getElementById('editors').value;
        Storedblogs[id].timeCreated=timeCreated;
        console.log(Storedblogs[id].title);
        console.log(Storedblogs[id].blogContent);
        // localStorage.removeItem('Storedblogs');
        localStorage.setItem('Storedblogs', JSON.stringify(Storedblogs));
        alert("The blog was edited successfully");
        window.location.href = "../html-pages/articleList";
    });


}
let url = new URLSearchParams(window.location.search);
if (url.get('title')) {
    edit();
    console.log('edited');
}
else {
    saveLs();
    console.log('created');
}
