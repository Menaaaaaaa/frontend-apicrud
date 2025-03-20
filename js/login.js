//VARIABLES GLOBALES DEL FORM DE LOGIN
userInput = document.querySelector("#usuarioForm");
passInput = document.querySelector("#contraForm");
btnLogin = document.querySelector(".btnLogin");

btnLogin.addEventListener("click", () =>{
  let dataForm= getData();
  sendData(dataForm);
})
// funcion para validar l formulario y obtner los datos 
let getData = () => {
    //validar formulario
    let user;
    if (userInput.value && passInput.value) {
        user = {
            usuario: userInput.value,
            contrasena: passInput.value
        }
        userInput.value = "";
        passInput.value = "";
    }else{
        alert("El usuario y contraseña es obligatoria")
    }
    //console.log(user);
    
    return user;
}

//funcion para recibir los datos y realizar la petición al server
let sendData= async(data) =>{
    let url = "http://localhost/backend-apiCrud/login"
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });
        if(respuesta.status===401){ alert ("El usuario y/o contraseña es icorrecto")}
        else {let userLogin= await  respuesta.json();
            //console.log(userLogin);
            alert(`Bienvenido: ${userLogin.nombre}`)
            //Guardar datos en el local
            localStorage.setItem("userLogin", JSON.stringify(userLogin))
            location.href="../index.html"}
        
    } catch (error) {
        console.log(error);
        
    }
}; 