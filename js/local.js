//variables globales
let nameUser = document.querySelector("#nombre-usuario")
let btnLogout = document.querySelector("#btnLogout")

document.addEventListener("DOMContentLoaded", ()=>{
    getUser()
})
// funcion para poner el nombre del usuario
let getUser = ()  => {
    let user = JSON.parse(localStorage.getItem("userLogin"))
    nameUser.textContent = user.nombre;
}

// evento para el btn logout 
btnLogout.addEventListener("click" , ()=>{
    localStorage.removeItem("userLogin")
    location.href="../login.html"
})