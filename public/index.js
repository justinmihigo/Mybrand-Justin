var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let links = document.querySelector("#navlinks ul");
let linksid = links.cloneNode(true);
console.log(linksid);
let aside = document.getElementById('aside');
let hamburger = document.getElementById('bars');
let closeBtn = document.getElementById('close');
import { showPopup } from "./popup.js";
hamburger.addEventListener('click', () => {
    hamburger.style.display = 'none';
    links.style.display = 'none';
    closeBtn.style.display = 'block';
    aside.appendChild(linksid);
});
closeBtn.addEventListener('click', () => {
    hamburger.style.display = 'block';
    links.style.display = 'flex';
    closeBtn.style.display = 'none';
    aside.removeChild(linksid);
});
function getblogs() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('https://mybrand-be-1-mzvx.onrender.com/api/blogs');
        let data = yield response.json();
        let blogsContainer = document.getElementById('blogs-list');
        console.log(blogsContainer);
        let article = document.createElement('article');
        article.setAttribute('class', 'blog');
        for (let blog of data) {
            const subcontent = blog.content;
            article.innerHTML =
                `<img src=${blog.image} width="200" height="auto" alt="react js">
    <p class="center"><b>${blog.title}</b></p>
    <p class="desc">${subcontent.substring(0, 50) + '...'}</p>
    </p>
    <div class="reactions">
        <button class="special">Read more</button>
        <div class="reaction-btn">
           <span>${blog.likes} &nbsp;<i class="fa-solid fa-thumbs-up"></i></span> &nbsp;
           <span>${blog.comments.length} &nbsp;<i class="fa-solid fa-comment"></i></span>
        </div>
    </div>`;
            const articles = article.cloneNode(true);
            blogsContainer.appendChild(articles);
            articles.addEventListener('click', (e) => {
                let target = e.target;
                if (target.classList.contains('special')) {
                    window.location.href = './html-pages/singleBlog.html?id=' + blog._id;
                }
            });
        }
    });
}
getblogs();
function createQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let fullnames = document.getElementById('fname');
            let email = document.getElementById('email');
            let query = document.getElementById('message');
            let response = yield fetch('https://mybrand-be-1-mzvx.onrender.com/api/queries', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.value,
                    name: fullnames.value,
                    query: query.value
                })
            });
            let data = yield response.json();
            console.log(data);
            if (data.error) {
                showPopup('Invalid Inputs');
            }
            else {
                showPopup('Query sent successfully');
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        createQuery();
    });
});
