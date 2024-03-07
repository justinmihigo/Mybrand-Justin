let logo=document.getElementById("logo");
function showPopup(message: string){
    let popup = document.getElementById('popup') as HTMLDivElement;
    popup.classList.toggle('hide');
    let div=document.createElement('div');
    popup.innerHTML=`
    <div>
    <i class="fa-solid fa-close" id="close-pop"></i>
    <p>${message}
    <p>
    </div>`;
    popup.addEventListener('click',e=>{
        let target = e.target as HTMLElement;
        if (target.id === 'close-pop') {
            popup.style.display = 'none';
        }
    });
}
export default showPopup;
// logo?.addEventListener("click", popup);