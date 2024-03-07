let logo = document.getElementById("logo");
function showPopup(message) {
    let popup = document.getElementById('popup');
    popup.classList.toggle('hide');
    let div = document.createElement('div');
    popup.innerHTML = `
    <div>
    <i class="fa-solid fa-close" id="close-pop"></i>
    <p>${message}
    <p>
    </div>`;
    popup.addEventListener('click', e => {
        let target = e.target;
        if (target.id === 'close-pop') {
            popup.style.display = 'none';
        }
    });
}
export default showPopup;
// logo?.addEventListener("click", popup);
