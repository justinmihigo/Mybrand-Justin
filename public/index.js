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
let links = document.querySelector("#navlinks ul");
let linksid = links.cloneNode(true);
console.log(linksid);
let aside = document.getElementById('aside');
let hamburger = document.getElementById('bars');
let closeBtn = document.getElementById('close');
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
        console.log('from the render', data);
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
        <button class="special"><a href="./html-pages/singleBlog.html">Read more</a></button>
        <div class="reaction-btn">
           <span>${blog.likes} &nbsp;<i class="fa-solid fa-thumbs-up"></i></span> &nbsp;
           <span>${blog.comments.length} &nbsp;<i class="fa-solid fa-comment"></i></span>
        </div>
    </div>`;
            const articles = article.cloneNode(true);
            blogsContainer.appendChild(articles);
        }
    });
}
getblogs();
