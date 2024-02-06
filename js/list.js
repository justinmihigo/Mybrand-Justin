function retrieveLs(){
    let blogList=document.querySelector('.listing');
    let retrieved=localStorage.getItem("Storedblogs");
    let objects=JSON.parse(retrieved);
    for(let i=0; i<objects.length;i++){
        blogList.innerHTML+=`
        <div><b>${i+1}</b></div>
        ${objects[i].title}
        <p>${objects[i].timeCreated}</p>
        ${objects[i].blogContent.substr(0,30)+'...'}
        <p>
            <span class="blue" data-index="${i}">View</span>&nbsp;
            <span class="green" data-index="${i}">Edit</span>&nbsp;
            <span class="red" data-index="${i}">Delete</span>
        </p>`
}
blogList.addEventListener('click',(event)=>{
    let target=event.target;
    if(target.classList.contains("red")){
        const index=target.getAttribute('data-index');
        let storedBlogs=localStorage.getItem("Storedblogs");
        let blogsArray= storedBlogs ? JSON.parse(storedBlogs) : [];
        blogsArray.splice(index,1);
        localStorage.setItem("Storedblogs",JSON.stringify(blogsArray));
        window.location.reload();
        }
    if(target.classList.contains("green")){
        let index=target.getAttribute('data-index');
        let storedBlogs=localStorage.getItem("Storedblogs");
        let blogsArray= storedBlogs ? JSON.parse(storedBlogs) : [];
        let url="../html-pages/articleCreate.html"
        blogsArray[index].title;
        blogsArray[index].image;
        let desc=blogsArray[index].blogContent;
        blogsArray[index].blogContent;
        console.log(desc.substr(0,20));
        window.location.href=url+'?title='+blogsArray[index].title+'&image='+blogsArray[index].image+'&content='+blogsArray[index].blogContent+'&id='+index;
    }
    if(target.classList.contains('blue')){
        let i=target.getAttribute('data-index');
        window.location.href="./singleBlog.html?id="+i;
        console.log(i);
    }
});
}
retrieveLs();