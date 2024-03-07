"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let form = document.querySelector('form');
let inputs = document.querySelectorAll('.input');
let remarks = document.querySelectorAll('.alert');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
        remarks.forEach((remark, i) => {
            if (input.value === "") {
                console.log(input.value);
                remark.innerHTML = "The field can not be empty <i class='fa solid fa-close error'></i>";
            }
            else {
                remark.innerHTML = "<i class='fa solid fa-check success'></i>";
            }
        });
    });
    addcomment();
});
function check(id, i) {
    let element = document.getElementById(id);
    if (element.value === "") {
        remarks[i].innerHTML = "The field can not be empty <i class='fa solid fa-close error'></i>";
    }
    else {
        remarks[i].innerHTML = "<i class='fa solid fa-check success'></i>";
    }
}
function loadSingle() {
    return __awaiter(this, void 0, void 0, function* () {
        let commentsNumber = document.getElementById("comments");
        let likesNumber = document.getElementById("likes");
        let content = document.getElementById("content");
        let heading = document.getElementById("heading");
        let recents = document.getElementById("recents");
        let title = document.getElementById("title");
        let date = document.getElementById("date");
        let image = document.getElementById("blogImg");
        const url = new URLSearchParams(window.location.search);
        const blogId = url.get('id');
        const response = yield fetch(`https://mybrand-be-1-mzvx.onrender.com/api/blogs/${blogId}`);
        const blog = yield response.json();
        console.log(blog);
        commentsNumber.innerHTML = blog.comments.length;
        likesNumber.innerHTML = blog.likes;
        content.innerHTML = blog.content;
        heading.innerHTML = blog.title;
        title.innerHTML = blog.title;
        image.src = blog.image;
        console.log(blog.comments);
        if (blog.comments.length !== 0) {
            for (let comment of blog.comments) {
                recents.innerHTML += `
        <div class="message padding">
        <p><b>${comment.name}</b> &nbsp; &nbsp;<span class="grey">58 min ago</span></p>
        <p class="justify">
        ${comment.comment}
        </p>
    </div>
    
        `;
            }
        }
    });
}
loadSingle();
function addlike() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URLSearchParams(window.location.search);
        const blogId = url.get('id');
        const response = yield fetch(`https://mybrand-be-1-mzvx.onrender.com/api/blogs/${blogId}/likes`, {
            method: 'POST',
        });
        const blog = yield response.json();
        const likesCountElement = document.getElementById('likes');
        let count = 0;
        if (likesCountElement) {
            likesCountElement.textContent = blog.blog.likes.toString();
            count++;
            localStorage.setItem('count', `${count}`);
        }
    });
}
function deleteLike() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URLSearchParams(window.location.search);
        const blogId = url.get('id');
        const response = yield fetch(`https://mybrand-be-1-mzvx.onrender.com/api/blogs/${blogId}/likes`, {
            method: 'DELETE',
        });
        const blog = yield response.json();
        const likesCountElement = document.getElementById('likes');
        if (likesCountElement) {
            likesCountElement.textContent = blog.blog.likes.toString();
        }
    });
}
let likebtn = document.getElementById('addLike');
likebtn === null || likebtn === void 0 ? void 0 : likebtn.addEventListener('click', () => {
    let getcount = localStorage.getItem('count');
    if (getcount == '1') {
        deleteLike();
        localStorage.setItem('count', '0');
    }
    else {
        addlike();
    }
});
function addcomment() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URLSearchParams(window.location.search);
        const blogId = url.get('id');
        const comment = document.getElementById('comment');
        const email = document.getElementById('email');
        const names = document.getElementById('name');
        const response = yield fetch(`https://mybrand-be-1-mzvx.onrender.com/api/blogs/${blogId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: names.value,
                email: email.value,
                comment: comment.value
            })
        });
        const blog = yield response.json();
        console.log(blog);
        alert('Comment created successfully');
        const commentsCountElement = document.getElementById('comments');
        if (commentsCountElement) {
            commentsCountElement.textContent = blog.data.comments.length.toString();
        }
    });
}
