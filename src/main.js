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
  // 2. agrégalo a pedido con push
  if (productoEncontrado){
    pedido.push(productoEncontrado)
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
      <p>$${p.precio}</p>
    </li>
  `).join('')

  listaPedido.innerHTML = itemsHTML

  const total = pedido.reduce((suma, p) => suma + p.precio, 0)
  totalContenedor.innerText = `Total: $${total}`
}

document.getElementById('btn-vaciar').addEventListener('click', () => {
  pedido.length = 0
  mostrarPedido()
}
)

// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// Botones de categoría que llamen a mostrarProductos() con
// productos.filter(...). El botón "Todos" muestra la lista completa.
// ------------------------------------------------------------

// Escribe aquí tu código del Ejercicio 4
