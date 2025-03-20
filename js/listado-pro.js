//variables globales
let tablePro = document.querySelector("#table-pro > tbody")
let searchInput = document.querySelector("#search-input")
let nameUser = document.querySelector("#nombre-usuario")
let btnLogout = document.querySelector("#btnLogout")
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
// evento para probar el campo de busqueda
searchInput.addEventListener("keyup", ()=>{
    //console.log(searchInput.value);  
    searchProductTbale();
})

//evento para el navegador
document.addEventListener("DOMContentLoaded", ()=>{
    getTableData()
    getUser()
})
//funcion para traer los datos de la db a la tabla
let getTableData = async () =>{
    let url = "http://localhost/backend-apiCrud/productos"
    try {
        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
        });
        if(respuesta.status===204){ console.log("No hay datos en la Data Base")}
        else {
            let tableData= await  respuesta.json();
            //console.log(tableData)
            //agg datos al local
            localStorage.setItem("datosTabla", JSON.stringify(tableData))
            //agg datos a tabla
            tableData.forEach((dato, i)=>{
                let row = document.createElement("tr")
                row.innerHTML = `
                <td>${i+1}</td>
                <td>${dato.nombre}</td> 
                <td>${dato.descripcion}</td>
                <td>${dato.precio}</td>
                <td>${dato.stock}</td>
                <td><img src="${dato.imagen}" width="80px"></td>
                <td> <button id="btn-edit" onclick="editDataTable(${i})" type ="button" class="btn">✏️</button>  
                ${nameUser.textContent=="vendedor"? "" :
                `<button id="btn-delete" onclick="deleteDataTable(${i})" type ="button" class="btn">❌</button>`}</td>`;
                tablePro.appendChild(row)
            });

        }
     } catch (error) {
        console.log(error);
        
    }
};
 
// funcion para editar productos
let editDataTable = (pos)=>{
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"))
    if(productsSave!= null){
        products=productsSave;
    } //console.log(products)
    let singleProduct = products[pos]
    //console.log(singleProduct)
    localStorage.setItem("productEdit", JSON.stringify(singleProduct))
    localStorage.removeItem("datosTabla")
    location.href = "../crear-pro.html"
}
//funcion eliminar productos
let deleteDataTable = (pos)=>{
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"))
    if(productsSave!= null){
        products=productsSave;
    } //console.log(products)
    let singleProduct = products[pos]
    //console.log("producto a elimina "+singleProduct.nombre)
    let IDProduct = {id: singleProduct.id}
    let confirmar = confirm(`¿Deseas eliminar la : ${singleProduct.nombre}`);
    // llamar a al funcion para la peticion 
    sendDeleteProduct(IDProduct);
}
// funcion para la peticon de elimnar en la db
let sendDeleteProduct = async (id) => {
    let url = "http://localhost/backend-apiCrud/productos"
    try {
        let respuesta = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(id)
        });
        if(respuesta.status===406){ alert ("El ID enviado no fue admitido")}
        else {let Mensaje = await respuesta.json();
            alert(Mensaje.message)
            location.reload();
        }
        
    } catch (error) {
        console.log(error);
        
    }
}


// funcion para quitar productos d ela tabla mientras se busca 
let clearDataTable=()=>{
    let rowTable = document.querySelectorAll("#table-pro >tbody>tr")
    //console.log(rowTable)
    rowTable.forEach((row)=>{
        row.remove();
    })
}

//funcion para buscar un producto
let searchProductTbale=()=>{
    let products = [];
    let productsSave = JSON.parse(localStorage.getItem("datosTabla"))
    if(productsSave!= null){
        products=productsSave;
    } 
    //console.log(products)
    //obtener lo escrito en el campo de texto
    let textSearch=searchInput.value.toLowerCase(); // sirve pa pasar el texto a min
    products.forEach(element =>{
        clearDataTable();
        let i = 0;
        for (let pro of products) {
            // comprobar  coincidencia de los pro
            if(pro.nombre.toLowerCase().indexOf(textSearch)!= -1){
               // console.log("hay algo")
               let row = document.createElement("tr")
                row.innerHTML = `
                <td>${i++}</td>
                <td>${pro.nombre}</td> 
                <td>${pro.descripcion}</td>
                <td>${pro.precio}</td>
                <td>${pro.stock}</td>
                <td><img src="${pro.imagen}" width="80px"></td>
                <td> <button id="btn-edit" onclick="editDataTable(${i+1})" type ="button" class="btn">✏️</button>  
                ${nameUser.textContent=="vendedor"? "" :
                `<button id="btn-delete" onclick="deleteDataTable(${i+1})" type ="button" class="btn">❌</button>`}</td>`;
                tablePro.appendChild(row)
            }
        }
    })
}