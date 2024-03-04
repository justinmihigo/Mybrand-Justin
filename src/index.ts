let links = document.querySelector("#navlinks ul") as HTMLUListElement;
let linksid = links.cloneNode(true);
console.log(linksid);
let aside = document.getElementById('aside')!;
let hamburger = document.getElementById('bars')!;
let closeBtn = document.getElementById('close')!;
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
async function getblogs() {
    let response = await fetch('https://mybrand-be-1-mzvx.onrender.com/api/blogs');
    let data = await response.json();
    console.log('from the render', data);
    let blogsContainer = document.getElementById('blogs-list') as HTMLDivElement;
    console.log(blogsContainer)
    let article = document.createElement('article');
    article.setAttribute('class', 'blog');

    for (let blog of data) {
        const subcontent: string = blog.content;
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
    const articles=article.cloneNode(true);
    blogsContainer.appendChild(articles);
    }
}
getblogs();