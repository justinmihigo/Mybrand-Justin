var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const imagePath = document.getElementById("image");
const contentEl = document.getElementById("editors");
const titleEl = document.getElementById("title");
const formEl = document.querySelector("form");
let url = new URLSearchParams(window.location.search);
import { showPopup } from "./popup.js";
const blogId = url.get('id');
console.log(blogId);
formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!blogId) {
        createBlog();
        return;
    }
    else {
        editBlog();
        return;
    }
});
if (blogId) {
    const heading = document.getElementById("heading");
    heading.innerHTML = "Edit a  Blog";
}
function getToken() {
    let token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../html-pages/adminLogin.html';
    }
}
getToken();
function logout() {
    localStorage.removeItem('token');
    window.location.href = '../html-pages/adminLogin.html';
}
const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', logout);
function createBlog() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('this is create');
            const content = contentEl.value;
            const title = titleEl.value;
            const token = localStorage.getItem("token");
            if (!imagePath.files || !imagePath.files[0]) {
                console.error("No image selected");
                return;
            }
            const formData = new FormData();
            formData.append("image", imagePath.files[0]);
            formData.append("title", title);
            formData.append("content", content);
            const response = yield fetch("https://mybrand-be-1-mzvx.onrender.com/api/blogs", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token
                },
                body: formData
            });
            if (response.status === 401) {
                alert(response.statusText);
                return;
            }
            const data = yield response.json();
            showPopup('Blog created successfully');
            window.setTimeout(() => { window.location.href = '../html-pages/articleList.html'; }, 2000);
        }
        catch (err) {
            console.log(err);
        }
    });
}
function editBlog() {
    return __awaiter(this, void 0, void 0, function* () {
        const imagePath = document.getElementById("image");
        const contentEl = document.getElementById("editors");
        const titleEl = document.getElementById("title");
        const editor = contentEl.value;
        let url = new URLSearchParams(window.location.search);
        let id = url.get("id");
        const formData = new FormData();
        if (imagePath.files) {
            formData.append("image", imagePath.files[0]); // Set the value of imagePath.files[0] instead of imagePath.value
        }
        formData.append("title", titleEl.value);
        formData.append("content", editor); // Get HTML content from Froala Editor
        console.log(id);
        const token = localStorage.getItem("token");
        console.log(token);
        const responseUpdate = yield fetch(`https://mybrand-be-1-mzvx.onrender.com/api/blogs/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });
        if (responseUpdate.status === 401) {
            alert(responseUpdate.statusText);
            return;
        }
        const data = yield responseUpdate.json();
        console.log(data);
        showPopup('Blog updated successfully');
        window.setTimeout(() => { window.location.href = '../html-pages/articleList.html'; }, 2000);
    });
}
