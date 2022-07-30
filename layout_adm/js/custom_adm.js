//Dropdown navbar
let avatar = document.querySelector('.avatar'),
    notification = document.querySelector('.notification');

// console.log(avatar)

dropMenu(avatar);
dropMenu(notification);

function dropMenu(selector) {
    selector.addEventListener('click', () =>{
        let dropdownMenu = selector.querySelector(".dropdow-menu")
        dropdownMenu.classList.contains("active")? dropdownMenu.classList.remove("active") : dropdownMenu.classList.add("active");
    })
}
