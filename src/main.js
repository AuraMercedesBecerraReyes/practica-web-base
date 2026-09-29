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


const pedidosRegistrados = []
const ESTADOS = ['Pendiente', 'En preparación', 'Entregado']

const COLORES = { 
  'Pendiente': 'bg-yellow-100 border-yellow-400', 
  'En preparación': 'bg-blue-100 border-blue-400', 
  'Entregado': 'bg-green-100 border-green-400' 
}

let filtroEstadoActual = 'Todos'

// EJERCICIO 5. Datos del cliente que sirven para confirmar el pedid0
document.getElementById('form-cliente').addEventListener('submit', function(evento) {
  evento.preventDefault()
  const Nombre = document.getElementById('nombre')
  const Telefono = document.getElementById('telefono')
  const Correo = document.getElementById('correo')
  const errorNombre = document.getElementById('error-nombre')
  const errorTelefono = document.getElementById('error-telefono')
  const errorCorreo = document.getElementById('error-correo')
  const errorPedido = document.getElementById('error-pedido')
  const exitoPedido = document.getElementById('exito-pedido')

  let esValido = true;

  if (Nombre.value.trim() === ''){
    errorNombre.textContent = 'El nombre no puede estar vacío ni ser solo espacios'
    errorNombre.classList.remove('hidden')
    Nombre.classList.add('border-red-600')
    esValido = false
  } else {
    errorNombre.classList.add('hidden')
    Nombre.classList.remove('border-red-600')
  }

  if(!/^\d{10}$/.test(Telefono.value.trim())){
    errorTelefono.textContent = 'El teléfono debe tener 10 dígitos'
    errorTelefono.classList.remove('hidden')
    Telefono.classList.add('border-red-600')
    esValido = false
  } else {
    errorTelefono.classList.add('hidden')
    Telefono.classList.remove('border-red-600')
  }

  if(!/^\S+@\S+\.\S+$/.test(Correo.value.trim())){
    errorCorreo.textContent = 'La forma del correo debe ser algo@algo.algo'
    errorCorreo.classList.remove('hidden')
    Correo.classList.add('border-red-600')
    esValido = false
  } else {
    errorCorreo.classList.add('hidden')
    Correo.classList.remove('border-red-600')
  }

  if (pedido.length === 0) {
    errorPedido.textContent = 'El pedido no puede estar vacío.';
    errorPedido.classList.remove('hidden');
    esValido = false;
  } else {
    errorPedido.classList.add('hidden');
  }

  if (esValido) {
    const totalFinal = pedido.reduce((suma, p) => suma + (p.precio * p.cantidad), 0)
    const nuevoPedidoRegistrado = {
      id: Date.now(),
      cliente: {
        nombre : Nombre.value.trim(),
        telefono : Telefono.value.trim(),
        correo : Correo.value.trim(),
      },
      productos: [...pedido],
      total: totalFinal,
      estado: 'Pendiente',
    }
    
    pedidosRegistrados.push(nuevoPedidoRegistrado)

    exitoPedido.textContent = 'Pedido confirmado';
    exitoPedido.classList.remove('hidden');

    pedido.length = 0 
    mostrarPedido()
    this.reset()  

    mostrarPedidosRegistrados()

    setTimeout(() => {
      exitoPedido.classList.add('hidden');
    }, 2000);
  }
});

// EJERCICIO 6.
function mostrarPedidosRegistrados() {
  const contenedor = document.getElementById('pedidos-registrados')
  if (!contenedor) return;

  
  document.getElementById('cant-Todos').innerText = pedidosRegistrados.length;
  document.getElementById('cant-Pendiente').innerText = pedidosRegistrados.filter(p => p.estado === 'Pendiente').length;
  document.getElementById('cant-En-preparacion').innerText = pedidosRegistrados.filter(p => p.estado === 'En preparación').length;
  document.getElementById('cant-Entregado').innerText = pedidosRegistrados.filter(p => p.estado === 'Entregado').length;

  
  let pedidosFiltrados;
  if (filtroEstadoActual === 'Todos') {
    pedidosFiltrados = pedidosRegistrados; 
  } else {
    pedidosFiltrados = pedidosRegistrados.filter(p => p.estado === filtroEstadoActual);
  }

  
  contenedor.innerHTML = pedidosFiltrados.map(p => {
    const color = COLORES[p.estado] || '';

    let botonAvanzar = ''
    if (p.estado !== 'Entregado'){
      botonAvanzar = `<button data-avanzar="${p.id}" class="mt-2 bg-indigo-600 text-white py-1 px-2 rounded text-sm cursor-pointer">Avanzar estado</button>`
    }

    const productosDelPedido = p.productos.map(prod => `
      <li class="text-sm text-gray-700">${prod.nombre} x ${prod.cantidad}</li>
    `).join('');

    return `
      <article class="p-4 border-l-4 rounded shadow mt-3 ${color}">
        <h3 class="font-bold text-lg text-gray-900">Pedido #${p.id} — <span class="font-bold bg-white px-2 py-0.5 rounded border text-xs text-gray-700">${p.estado}</span></h3>
        <p class="text-sm mt-1"><strong>Cliente:</strong> ${p.cliente.nombre} | Tel: ${p.cliente.telefono} | Correo: ${p.cliente.correo}</p>
        <ul class="list-disc pl-5 my-2">
          ${productosDelPedido}
        </ul>
        <p class="font-bold text-gray-800">Total: $${p.total}</p>
        ${botonAvanzar}
      </article>
    `
  }).join('')
}

document.getElementById('pedidos-registrados').addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-avanzar]');
  if (!boton) return;
   
  const idPedido = Number(boton.dataset.avanzar)
  const pedidoEncontrado = pedidosRegistrados.find(p => p.id === idPedido)

  if (pedidoEncontrado){
    const indiceActual = ESTADOS.indexOf(pedidoEncontrado.estado)
      
    if (indiceActual < ESTADOS.length - 1){
      pedidoEncontrado.estado = ESTADOS[indiceActual + 1]
      mostrarPedidosRegistrados()
    }
  }
})

// extra 
const botonesFiltroPedidos = document.querySelectorAll('#filtros-pedidos button');

botonesFiltroPedidos.forEach(b => {
  b.addEventListener('click', (e) => {
    filtroEstadoActual = e.currentTarget.getAttribute('data-filtro-estado');
 
    mostrarPedidosRegistrados();

    botonesFiltroPedidos.forEach(btn => {
      if (btn === e.currentTarget) {
        btn.className = 'bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer transition';
      } else {
        btn.className = 'bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded cursor-pointer hover:bg-gray-300 transition';
      }
    });
  });
});
