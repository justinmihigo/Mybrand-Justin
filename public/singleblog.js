"use strict";
let form = document.querySelector('form');
let inputs = document.querySelectorAll('.input');
let remarks = document.querySelectorAll('.alert');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
        remarks.forEach((remark, i) => {
            if (input.value === "") {
                console.log(input.value);
                remark.innerHTML = "The field can not be empty <i class='fa solid fa-close error'></i>";
            }
            else {
                remark.innerHTML = "<i class='fa solid fa-check success'></i>";
            }
        });
    });
});
function check(id, i) {
    let element = document.getElementById(id);
    if (element.value === "") {
        remarks[i].innerHTML = "The field can not be empty <i class='fa solid fa-close error'></i>";
    }
    else {
        remarks[i].innerHTML = "<i class='fa solid fa-check success'></i>";
    }
}
