const listaCarrito = document.querySelector('#lista-carrito tbody')
const carrito = document.querySelector('#carrito')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const listaCursos = document.querySelector('#cursos')
let arrayCarrito = [];

// Funcion para poner los EventListener
Eventos();

function Eventos() {

    listaCursos.addEventListener('click', agregarCurso);

    // evento paa eliminar un curso 
    carrito.addEventListener('click',eliminarCurso)

    // Evento para vaciar el carrito 
    vaciarCarrito.addEventListener('click', limpiarCarrito)

}


// funcion para agregar el curso
function agregarCurso(e) {

    // Ponemos una excepcion para que al momento de hacer clic sobre el div solo se seleccione una clase
    e.preventDefault();

    if (e.target.classList.contains('boton')) {

        const cursoSeleccionado = e.target.parentNode;

        console.log(cursoSeleccionado)
        listarCursos(cursoSeleccionado);
    }

}

// Function listaCursos para enlistar los cursos seleccionados
function listarCursos(curso) {

    const objCarrito = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h3').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // arrayCarrito.push(objCarrito);

    console.log(arrayCarrito)

    // Verificamos si existe el id
    const existe = arrayCarrito.some(curso => curso.id === objCarrito.id)

    console.log(existe)
    if (existe) {

        const curso = arrayCarrito.map(curso => {

            if (curso.id === objCarrito.id) {

                curso.cantidad++;
                return curso

            } else {
                curso
            }

        })

        arrayCarrito = [...arrayCarrito]

    } else {
        arrayCarrito = [...arrayCarrito, objCarrito]
    }

    carritoHtml();

}


// function para crear el html
function carritoHtml() {

    // funcion para limpiar el carrito
    limpiartHtml();

    arrayCarrito.forEach(compra => {

        const {
            imagen,
            nombre,
            precio,
            cantidad,
            id
        } = compra

        const row = document.createElement('tr')

        row.innerHTML =
            `<td>
         <img src = "${imagen}" width="80px;"
         </td>
         
         <td>
         ${nombre}
         </td>

         <td style = "text-align:center;">${precio}</td>
         
         <td style = "text-align:center">
         ${cantidad}
         </td>
         
         <td>
         <a href="#" class ="borrar-curso vacio" data-id = ${id} style = "text-align:center;"> X </a>
         </td>`

         listaCarrito.appendChild(row)
    })

}


// Eliminamos curso del tbody
function limpiartHtml(){

    while(listaCarrito.firstChild) {

        listaCarrito.removeChild(listaCarrito.firstChild)

    }

}


// funcion para limpiar el carrito
function limpiarCarrito(e){


        arrayCarrito = []

        limpiartHtml();

}

// function para Eliminar el curso 
function eliminarCurso(e){

    e.preventDefault();

    
    if(e.target.classList.contains("borrar-curso")){

        const idCurso = e.target.getAttribute('data-id')
        console.log(idCurso)

        arrayCarrito = arrayCarrito.filter(curso => curso.id !== idCurso)

        carritoHtml();
    }

}