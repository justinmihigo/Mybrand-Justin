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
let blogsCounter = document.getElementById("blogsNumber");
let commentsCounter = document.getElementById("commentsNumber");
let likesCounter = document.getElementById("likesNumber");
let queriesCounter = document.getElementById("queriesNumber");
let queriesRecent = document.getElementById("recents");
function count() {
    return __awaiter(this, void 0, void 0, function* () {
        let responseBlogs = yield fetch('https://mybrand-be-1-mzvx.onrender.com/api/blogs');
        let responseQueries = yield fetch('https://mybrand-be-1-mzvx.onrender.com/api/queries');
        let blogs = yield responseBlogs.json();
        let queries = yield responseQueries.json();
        queriesCounter.innerHTML = queries.queries.length;
        blogsCounter.innerHTML = blogs.length;
        let a = 0, b = 0;
        for (let blog of blogs) {
            a += blog.comments.length;
            b += blog.likes.length;
        }
        if (isNaN(b)) {
            b = 0;
        }
        commentsCounter.innerHTML = `${a}`;
        likesCounter.innerHTML = `${b}`;
        for (let i = 0; i < 5; i++) {
            queriesRecent.innerHTML += `
        <div class="message padding">
        <p><b>${queries.queries[i].name}</b> &nbsp; &nbsp;<span class="grey">58 min ago</span></p>
        <p class="justify">
        ${queries.queries[i].query}
        </p>
    </div>`;
        }
    });
}
count();
