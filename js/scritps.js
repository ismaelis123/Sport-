function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        seccion.classList.add('oculto');
        if (seccion.id === seccionId) {
            seccion.classList.remove('oculto');
            seccion.classList.add('activo');
        }
    });
}

let carrito = [];
let productos = [
    {
        nombre: 'Traje de Niño Inter de Miami',
        precio: 50,
        imagen: 'Imagenes/Trajesito de niño m.png',
        tallas: ['XS','S','M','L']
    },
    {
        nombre: 'Traje de Niño Cristiano Ronaldo',
        precio: 50,
        imagen: 'Imagenes/traje niño c.png',
        tallas: ['XS','S','M','L']
    },
    {
        nombre: 'Camiseta Deportiva FC BARCELONA',
        precio: 30,
        imagen: 'Imagenes/C barcelona.png',
        tallas: ['S', 'M', 'L', 'XL']
    },
    {
        nombre: 'Camiseta Deportiva Argentina LEO MESSI',
        precio: 30,
        imagen: 'Imagenes/C argentina.png',
        tallas: ['S', 'M', 'L', 'XL']
    },
    {
        nombre: 'Camiseta Deportiva CRISTIANO RONALDO',
        precio: 30,
        imagen: 'Imagenes/c ronaldo.png',
        tallas: ['S', 'M', 'L', 'XL']
    },
    {
        nombre: 'Balon de Futbol Mikasa',
        precio: 30,
        imagen: 'Imagenes/Balon Mikasa.png',
        tallas: ['dissfruta con la mejor calidad']
    },
    {
        nombre: 'Balon de Futbol Molten',
        precio: 30,
        imagen: 'Imagenes/balon molten.png',
        tallas: ['dissfruta con la mejor calidad']
    },
    {
        nombre: 'Camiseta Deportiva De BRAZIL',
        precio: 30,
        imagen: 'Imagenes/c brazil.png',
        tallas: ['S', 'M', 'L', 'XL']
    },
    {
        nombre: 'Camiseta Deportiva De Messi Inter de Miami',
        precio: 30,
        imagen: 'Imagenes/C inter de miami.png',
        tallas: ['S', 'M', 'L', 'XL']
    },
    {
        nombre: 'Camiseta Deportiva De Real Madrid',
        precio: 30,
        imagen: 'Imagenes/C real rosa.png',
        tallas: ['S', 'M', 'L', 'XL']
    },
    {
        nombre: 'Camiseta Deportiva De La Selección De NICARAGUA',
        precio: 30,
        imagen: 'Imagenes/C nica.png',
        tallas: ['S', 'M', 'L', 'XL']
    },
    {
        nombre: 'Camiseta Deportiva De RONALDO AL NASSAR',
        precio: 30,
        imagen: 'Imagenes/C Ronaldo A.png',
        tallas: ['S', 'M', 'L', 'XL']
    },

   
    // Más productos pueden ser añadidos aquí
];

function inicializarProductos() {
    const panelProductos = document.getElementById('panel-productos');
    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio}</p>
            <label for="talla${index}">Talla:</label>
            <select id="talla${index}">
                ${producto.tallas.map(talla => `<option value="${talla}">${talla}</option>`).join('')}
            </select>
            <label for="cantidad${index}">Cantidad:</label>
            <input type="number" id="cantidad${index}" value="1" min="1">
            <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, ${index})">Agregar al carrito</button>
        `;
        panelProductos.appendChild(productoDiv);
    });
}

function agregarAlCarrito(producto, precio, id) {
    const cantidad = document.getElementById('cantidad' + id).value;
    const talla = document.getElementById('talla' + id).value;
    carrito.push({ producto, precio, cantidad, talla });
    actualizarCarrito();
}

function actualizarCarrito() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    alert(`Total en el carrito: $${total}`);
}

function generarFactura() {
    const nombre = document.getElementById('nombre').value;
    const departamento = document.getElementById('departamento').value;
    let factura = `Factura\n\nCliente: ${nombre}\nDepartamento: ${departamento}\n\nProductos:\n`;

    let total = 0;
    carrito.forEach(item => {
        factura += `${item.cantidad} x ${item.producto} (Talla: ${item.talla}) - $${item.precio * item.cantidad}\n`;
        total += item.precio * item.cantidad;
    });

    factura += `\nTotal: $${total}\n\nGracias por su compra en PipoSport!`;

    // Crear archivo de factura
    const blob = new Blob([factura], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'factura.txt';
    link.click();
}

// Inicializa los productos cuando la página se carga
document.addEventListener('DOMContentLoaded', inicializarProductos);
