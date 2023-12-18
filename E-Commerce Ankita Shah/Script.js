const header = document.querySelector("header");

window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",this.window.screenY > 0);
})

let menu = document.querySelector('#menu-icon')
let navmenu = document.querySelector('.navmenu')

menu.onclick =()=>{
    menu.classList.toggle('bx bx-menu');
    navmenu.classList.toggle(".open");
}

