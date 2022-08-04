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

// Sidebar
let sidebar = document.querySelector(".sidebar"),
bars = document.querySelector(".bars")

bars.addEventListener("click", () => {
    sidebar.classList.contains("active") ? sidebar.classList.remove("active") : sidebar.classList.add("active");
})

window.matchMedia("(max-width: 768px)").matches ? sidebar.classList.remove("active") : sidebar.classList.add("active");