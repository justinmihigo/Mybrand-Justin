function logout() {
    localStorage.removeItem('token');
    window.location.href='../html-pages/adminLogin.html';
}
const logoutBtn=document.getElementById('logout')!;
logoutBtn.addEventListener('click',logout);
function getToken() {
    let token=localStorage.getItem('token');
    if(!token){
        window.location.href='../html-pages/adminLogin.html';
    }
}
getToken();