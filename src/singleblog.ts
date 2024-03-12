let form = document.querySelector('form')!;
let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input');
let remarks: NodeListOf<HTMLDivElement> = document.querySelectorAll('.alert');
import { showPopup } from "./popup.js";
form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
        remarks.forEach((remark, i) => {
            if (input.value === "") {
                console.log(input.value);
                remark.innerHTML = "The field can not be empty <i class='fa solid fa-close error'></i>";
            }
            else {
                remark.innerHTML = "<i class='fa solid fa-check success'></i>"
            }
        });

    });
    addcomment();
});
function check(id: string, i: number): void {
    let element = document.getElementById(id) as HTMLInputElement;
    if (element.value === "") {
        remarks[i].innerHTML = "The field can not be empty <i class='fa solid fa-close error'></i>";
    }
    else {
        remarks[i].innerHTML = "<i class='fa solid fa-check success'></i>"
    }
}
async function loadSingle() {
    let commentsNumber = document.getElementById("comments")!;
    let likesNumber = document.getElementById("likes")!;
    let content = document.getElementById("content")!;
    let heading = document.getElementById("heading")!;
    let recents = document.getElementById("recents")!;
    let title = document.getElementById("title")!;
    let dateEl = document.getElementById("date")!;
    let image = document.getElementById("blogImg") as HTMLImageElement;

    const url = new URLSearchParams(window.location.search);
    const blogId = url.get('id');
    const response = await fetch(`https://mybrand-be-1-mzvx.onrender.com/api/blogs/${blogId}`);
    const blog = await response.json();
    console.log(blog);
    commentsNumber.innerHTML = blog.comments.length;
    likesNumber.innerHTML = blog.likes;
    content.innerHTML = blog.content;
    heading.innerHTML = blog.title;
    title.innerHTML = blog.title;
    image.src = blog.image;
    dateEl.innerHTML = `Updated on ${(blog.date).substring(0, 10)}`;
    console.log(blog.comments);
    if (blog.comments.length !== 0) {
        for (let comment of blog.comments) {
            recents.innerHTML += `
        <div class="message padding">
        <p><b>${comment.name}</b> &nbsp; &nbsp;<span class="grey">${(comment.date).replace('T', ' ').substring(0, 16)}</span></p>
        <p class="justify">
        ${comment.comment}
        </p>
        <p class='del'>
        <i class="fa-solid fa-trash" data-commentId='${comment._id}'></i>
        </p>
    </div>
        `
        }
    }
    recents.addEventListener('click', e => {
        let target = e.target as HTMLElement;
        if (target.classList.contains('fa-trash')) {
            let commentId = target.getAttribute('data-commentId')!;
            console.log(commentId);
            deletecomment(commentId);
        }
    });
    let deleteIcons: NodeListOf<HTMLElement> = document.querySelectorAll('.del');
    let token = localStorage.getItem('token');
    if (!token) {
        deleteIcons.forEach(delIcon => {
            delIcon.style.display = 'none';
        })
    }
}

loadSingle();
async function addlike() {
    const url = new URLSearchParams(window.location.search);
    const blogId = url.get('id');
    const response = await fetch(`https://mybrand-be-1-mzvx.onrender.com/api/blogs/${blogId}/likes`, {
        method: 'POST',
    });
    const blog = await response.json();
    const likesCountElement = document.getElementById('likes')!;
    let count = 0;
    if (likesCountElement) {
        likesCountElement.textContent = blog.blog.likes.toString();
        count++;
        localStorage.setItem('count', `${count}`);
    }
}
async function deleteLike() {
    const url = new URLSearchParams(window.location.search);
    const blogId = url.get('id');
    const response = await fetch(`https://mybrand-be-1-mzvx.onrender.com/api/blogs/${blogId}/likes`, {
        method: 'DELETE',
    });
    const blog = await response.json();
    const likesCountElement = document.getElementById('likes')!;
    if (likesCountElement) {
        likesCountElement.textContent = blog.blog.likes.toString();
    }
}
let likebtn = document.getElementById('addLike');
likebtn?.addEventListener('click', () => {
    let getcount = localStorage.getItem('count') as any;
    if (getcount == '1') {
        deleteLike();
        localStorage.setItem('count', '0');
        localStorage.removeItem('count');
    }
    else {
        addlike();
    }


});

async function addcomment() {
    try {
        const url = new URLSearchParams(window.location.search);
        const blogId = url.get('id');

        const comment = document.getElementById('comment') as HTMLTextAreaElement;
        const email = document.getElementById('email') as HTMLInputElement;
        const names = document.getElementById('name') as HTMLInputElement;
        const response = await fetch(`https://mybrand-be-1-mzvx.onrender.com/api/blogs/${blogId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: names.value,
                email: email.value,
                comment: comment.value
            })
        });
        const blog = await response.json();
        console.log(blog);
        showPopup('Comment created successfully');
        const commentsCountElement = document.getElementById('comments');
        if (commentsCountElement) {
            commentsCountElement.textContent = blog.data.comments.length.toString();
        }
        window.location.reload();
    }
    catch (err) {
        showPopup('Error creating comment check your inputs');
    }
}

async function deletecomment(commentId: string) {
    try {
        const url = new URLSearchParams(window.location.search);
        const blogId = url.get('id');
        const response = await fetch(`https://mybrand-be-1-mzvx.onrender.com/api/blogs/${blogId}/comments/${commentId}`, {
            method: 'DELETE',
        });
        const blog = await response.json();
        console.log(blog);
        showPopup('Comment deleted successfully');
        window.setTimeout(() => {window.location.reload},2000);
        // const commentsCountElement = document.getElementById('comments');
        // if (commentsCountElement) {
        //     commentsCountElement.textContent = blog.data.comments.length.toString();
        // }
        // window.location.reload();
    }
    catch (err) {
        showPopup('Error deleting comment');
        console.log(err);
    }
}
