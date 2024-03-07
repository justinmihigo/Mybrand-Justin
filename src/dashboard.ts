let blogsCounter=document.getElementById("blogsNumber")!;
let commentsCounter=document.getElementById("commentsNumber")!;
let likesCounter=document.getElementById("likesNumber")!;
let queriesCounter=document.getElementById("queriesNumber")!;
let queriesRecent=document.getElementById("recents")!;
async function count(){
    let responseBlogs=await fetch('https://mybrand-be-1-mzvx.onrender.com/api/blogs');
    let responseQueries=await fetch('https://mybrand-be-1-mzvx.onrender.com/api/queries');
    let blogs=await responseBlogs.json();
    let queries= await responseQueries.json();
    queriesCounter.innerHTML=queries.queries.length;
    blogsCounter.innerHTML=blogs.length;
    let a=0, b=0;
    for(let blog of blogs){
        a+=blog.comments.length;
        b+=blog.likes.length;
    }
    if(isNaN(b)){
        b=0;
    } 
    commentsCounter.innerHTML=`${a}`;
    likesCounter.innerHTML=`${b}`;
    for(let i=0; i<5; i++){
        queriesRecent.innerHTML+=`
        <div class="message padding">
        <p><b>${queries.queries[i].name}</b> &nbsp; &nbsp;<span class="grey">58 min ago</span></p>
        <p class="justify">
        ${queries.queries[i].query}
        </p>
    </div>`;
    }
}
count();