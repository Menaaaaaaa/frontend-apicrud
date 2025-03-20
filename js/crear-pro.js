//variables globales 
const d= document;
let nameInput= d.querySelector('#productos-select')
let priceInput = d.querySelector('#precio-pro')
let stockInput = d.querySelector('#stock-pro')
let descripcionInput = d.querySelector('#des-pro')
let imagen= d.querySelector('#imagen-pro')
let btnCreate = d.querySelector('.btn-create')
let productUptade;
let nameUser = d.querySelector("#nombre-usuario")
let btnLogout = d.querySelector("#btnLogout")
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
//agg evento al btn
btnCreate.addEventListener("click", ()=>{
    //alert("producto:"+nameInput.value)
    let dataProduct = getDataProduct()
    sendDataProduct(dataProduct)
})

//evento al nav para comprobar si recargo la pag
d.addEventListener("DOMContentLoaded", ()=>{
    productUptade = JSON.parse(localStorage.getItem("productEdit"))
    if(productUptade != null){
        uptadeDataProduct();
    }
    getUser()
})

//funcion para validar el form y obtner los datos
//validar formulario
let getDataProduct = ()=>{
    let product;
    if (nameInput.value && priceInput.value && stockInput.value && descripcionInput.value && imagen.src) {
        product = {
            nombre: nameInput.value,
            descripcion: descripcionInput.value,
            precio:priceInput.value,
            stock: stockInput.value,
            imagen: imagen.src

        }
        priceInput.value = "";
        descripcionInput.value = "";
        stockInput.value ="";
        imagen.src="https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg"
        console.log(product);
        
    }else{
        alert("Todos los campos son obligatorios")
    }
    //console.log(user);
    
    return product;

}
//funcion para recibir los datos y realizar la petición al server
let sendDataProduct= async(data) =>{
    let url = "http://localhost/backend-apiCrud/productos"
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });
        if(respuesta.status===406){ alert ("Los datos enviados no son admitidos")}
        else {let Mensaje = await respuesta.json();
            alert(Mensaje.message)
        }
        
    } catch (error) {
        console.log(error);
        
    }
}; 

//funcion para editar el producto 
let uptadeDataProduct = ()=>{
    //agg datos a editar en el form
    nameInput.value = productUptade.nombre;
    priceInput.value = productUptade.precio
    stockInput.value = productUptade.stock
    descripcionInput.value = productUptade.descripcion
    imagen.src = productUptade.imagen
    let product;
    //alternar el btn de edi y crear
    let btnEdit = d.querySelector(".btn-update")
    btnCreate.classList.toggle("d-none")
    btnEdit.classList.toggle("d-none")
    //agg al btn de editar
    btnEdit.addEventListener("click", ()=>{
        product = {
            id: productUptade.id,
            nombre: nameInput.value,
            descripcion: descripcionInput.value,
            precio:priceInput.value,
            stock: stockInput.value,
            imagen: imagen.src
        }
        //borrar info guardada en local 
        localStorage.removeItem("productEdit")
        // pasar datos a la funcion
        sendUpdateProduct(product);
    })
}

//funcion para hacer peticiones al server
let sendUpdateProduct = async (pro) =>{
    let url = "http://localhost/backend-apiCrud/productos"
    try {
        let respuesta = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(pro)
        });
        if(respuesta.status===406){ alert ("Los datos enviados no son admitidos")}
        else {let Mensaje = await respuesta.json();
            alert(Mensaje.message)
            location.href = "../listado-pro.html"
        }
        
    } catch (error) {
        console.log(error);
        
    }
}