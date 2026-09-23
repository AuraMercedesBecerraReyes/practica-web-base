import './style.css'
 import { productos } from './datos.js'

// Elemento donde se dibujan las tarjetas (lo creas en el Ejercicio 1)
const catalogo = document.getElementById('catalogo')

// ------------------------------------------------------------
// EJERCICIO 2 — mostrarProductos(lista)
// Convierte una lista de productos en tarjetas HTML y las pone en la página.
// Forma general:
//   catalogo.innerHTML = lista.map(p => `
//     <article class="...las mismas clases de tu Ejercicio 1...">
//       <h3>${p.nombre}</h3>
//       ...
//       <button data-id="${p.id}">Agregar</button>
//     </article>
//   `).join('')
// ------------------------------------------------------------
function mostrarProductos(lista) {
  // Escribe aquí tu código
  catalogo.innerHTML = lista.map(p => `
   <article class = "bg-white rounded-lg shadow p-4 flex flex-col justify-between transition duration-200 hover:shadow-md">
    <h3 class = "text-lg font-bold text-center text-blue-900">${p.nombre}</h3>
    <p class = "text-xl text-center text-gray-500 mt-2">$${p.precio}</p>
    <button data-id="${p.id}" class = "w-full mt-4 bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 hover:bg-blue-300 cursor-pointer">
      Agregar
    </button>
  </article>
  `).join('')
}
mostrarProductos(productos)

// ------------------------------------------------------------
// EJERCICIO 3 — Armar el pedido
// El pedido es un arreglo con los productos que la persona va agregando.
// Pasos (detalle en el README):
//   1. Escucha el clic en el contenedor #catalogo (delegación de eventos).
//   2. Busca el producto por id con .find() y agrégalo con .push().
//   3. Dibuja el pedido con mostrarPedido() y calcula el total con .reduce().
//   4. Botón "Vaciar pedido".
// ------------------------------------------------------------

const pedido = []

// Escribe aquí tu código del Ejercicio 3
catalogo.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-id]')
  if (!boton) return
  const id = Number(boton.dataset.id)
  
  // 1. busca el producto con productos.find(...)
  const productoEncontrado = productos.find(p => p.id === id)
  
  if (productoEncontrado){
    // Condicional para ver si ya estaba el productoo
    const itemExistente = pedido.find(item => item.id === id)

    if (itemExistente) {
      
      itemExistente.cantidad = (itemExistente.cantidad || 1) + 1
    } else {
      //2. Push
      pedido.push({ ...productoEncontrado, cantidad: 1 })
    }

    // 3. llama a mostrarPedido()
    mostrarPedido()
  }
})

function mostrarPedido(){
  const listaPedido = document.getElementById('lista-pedido')
  const totalContenedor = document.getElementById('total')

  listaPedido.innerHTML = ''

  const itemsHTML = pedido.map(p => `
    <li>
      
        <p>${p.nombre}</p>
        <p>${p.cantidad}</p>
      <p>$${p.precio}</p>
    </li>
  `).join('')

  listaPedido.innerHTML = itemsHTML

  // Multiplicamos el precio por la cantidad de cada producto para el total
  const total = pedido.reduce((suma, p) => suma + (p.precio * p.cantidad), 0)
  totalContenedor.innerText = `Total: $${total}`
}

document.getElementById('btn-vaciar').addEventListener('click', () => {
  pedido.length = 0
  mostrarPedido()
})

// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// Botones de categoría que llamen a mostrarProductos() con
// productos.filter(...). El botón "Todos" muestra la lista completa.
// ------------------------------------------------------------

// Escribe aquí tu código del Ejercicio 4
const botones = document.querySelectorAll('#categorias button')
botones.forEach(boton => {
  boton.addEventListener('click', (e) => {
    const categoria = e.currentTarget.getAttribute('data-categoria')

    let productosFiltrados
    if (categoria === 'Todos') {
      productosFiltrados = productos
    } else {
      productosFiltrados = productos.filter(p => p.categoria === categoria)
    }
    mostrarProductos(productosFiltrados)

    botones.forEach(b => {
      if (b ===e.target){
        b.className = 'btn-filtro bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 hover:bg-blue-300 cursor-pointer'
      } else {
        b.className = 'btn-filtro bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-200 hover:bg-gray-300 cursor-pointer'
      }
    })
  })
})

