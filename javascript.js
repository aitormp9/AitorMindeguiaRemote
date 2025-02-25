/*--------------MENU HAMBURGUESA--------------*/
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");
const nav = document.getElementById("nav");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

/*--------------LLAMADA JSON PRODUCTOS--------*/
const request = new XMLHttpRequest();
const archivoJSON = "http://localhost//Productos.json";

request.open("GET", archivoJSON);
request.responseType = "json";

request.onload = function () {
    localStorage.setItem('productosJSON', JSON.stringify(request.response));
};

productosJSON = JSON.parse(localStorage.getItem('productosJSON'));

request.send();

/*--------------INDEX----------------*/
function productosIndex() {
    //Definimos la variable y limpiamos el contenido
    let productos = document.getElementById("productos-index");
    productos.innerHTML = '';

    //Recoger los datos de nuestros productos mediante el Local Storage
    const nuestrosProductos = localStorage.getItem('productosJSON');
    const productosJSON = JSON.parse(nuestrosProductos);
    
    // Mostrar solo los primeros 3 productos
    const firstThreeProducts = productosJSON.productos.slice(0, 3);

    //Insertar los datos de los productos a mostrar
    firstThreeProducts.forEach((producto, index) => {
        productos.innerHTML += `
            <section class="producto">
                <a href="producto.html?id_producto=${producto.id_producto}">
                    <div class="contenedor-imagen">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <h2>${producto.nombre}</h2>
                    <h3>${producto.precio} €</h3> 
                    <p>${producto.descripcion}</p>
                </a>
                <button class="boton agregarAlCarrito" data-index="${index}">Añadir al carrito</button>
            </section>
        `;
    });

    // Añadir event listeners a los botones de "Añadir al carrito"
    const botonesCarrito = document.querySelectorAll('.agregarAlCarrito');
    botonesCarrito.forEach(boton => {
        boton.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const producto = firstThreeProducts[index];
            agregarAlCarrito(producto);
        });
    });
}

/*--------------PRODUCTOS--------------*/
function cargarProductos() {
    //Definimos la variable y limpiamos el contenido
    let productos = document.getElementById("productos");
    productos.innerHTML = '';

    //Recoger los datos de nuestros productos mediante el Local Storage
    const nuestrosProductos = localStorage.getItem('productosJSON');
    const productosJSON = JSON.parse(nuestrosProductos);

    //Añadimos el contenido en cada producto
    productosJSON.productos.forEach((producto, index) => {  
        productos.innerHTML += `
        <section class="producto">
            <a href="producto.html?id_producto=${producto.id_producto}">
                <div class="contenedor-imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <h2>${producto.nombre}</h2>
                <h3>${producto.precio} €</h3> 
                <p>${producto.descripcion}</p>
            </a>
            <button class="boton agregarAlCarrito" data-index="${index}">Añadir al carrito</button>
        </section>
        `;
    });

    //Definimos la variable
    const botonesCarrito = document.querySelectorAll('.agregarAlCarrito');

    //Si hacemos click en el botón, llama a la función de agregarlo al carrito
    botonesCarrito.forEach(boton => {
        boton.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const producto = productosJSON.productos[index];
            agregarAlCarrito(producto);
        });
    });
}


/* FILTROS */
function cargarCategoria(categoria) {
    //Función para eliminar los tildes, para que la categoría de pantalones funcione correctamente
    function eliminarTildes(categoria) {
        return categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    //Definimos las variables y limpiamos el contenido
    let categoriaSeleccionada = document.getElementById(categoria);
    let productos = document.getElementById("productos");
    productos.innerHTML = '';

    //Ocultamos los títulos de las categorías
    document.getElementById('pantalon').style.display = 'none';
    document.getElementById('camiseta').style.display = 'none';
    document.getElementById('sudadera').style.display = 'none';
    document.getElementById('camisa').style.display = 'none';
    document.getElementById('chaqueta').style.display = 'none';

    //Recoger los datos de nuestros productos mediante el Local Storage
    const nuestrosProductos = localStorage.getItem('productosJSON');
    const productosJSON = JSON.parse(nuestrosProductos);

    //Eliminamos las tíldes a las categorías y las pasamos a minúsculas
    const categoriaNormalizada = eliminarTildes(categoria).toLowerCase();

    //Recorremos todos los productos y añadimos el contenido en cada producto
    productosJSON.productos.forEach(producto => {
        const nombreProductoNormalizado = eliminarTildes(producto.nombre).toLowerCase();

        if (nombreProductoNormalizado.includes(categoriaNormalizada)) {
            //Mostramos el título de la categoría seleccionada
            categoriaSeleccionada.style.display = 'flex';
            productos.innerHTML += `
            <section class="producto">
                <div class="contenedor-imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <h2>${producto.nombre}</h2>
                <h3>${producto.precio} €</h3> 
                <p>${producto.descripcion}</p>
                <button class="boton agregarAlCarrito">Añadir al carrito</button>
            </section>
            `;
        }
    });
}

/*--------------PÁGINA PRODUCTO--------------*/
function cargarProducto() {
    //Recogemos el ID del producto concreto mediante la URL
    const urlParams = new URLSearchParams(window.location.search);
    const ID_producto = urlParams.get('id_producto');

    //Recoger los datos de nuestros productos mediante el Local Storage
    const nuestrosProductos = localStorage.getItem('productosJSON');
    const productosJSON = JSON.parse(nuestrosProductos);

    //Busca el elemento ID_producto
    const producto = productosJSON.productos.find(item => item.id_producto == ID_producto);

    //Insertamos el texto correspondiente en cada elemento del HTML
    document.getElementById('nombre-prod').innerText = producto.nombre;
    document.getElementById('imagen-prod').src = producto.imagen;
    document.getElementById('descripcion-prod').innerText = producto.descripcion;
    document.getElementById('precio-prod').innerText = `Precio: ${producto.precio} €`;
    document.getElementById('stock').innerText = `Stock: ${producto.stock}`;

    //Si hacemos click en el botón, llama a la función de agregarlo al carrito
    const botonAlCarrito = document.querySelector('.agregarAlCarrito');
    botonAlCarrito.addEventListener('click', function () {
        agregarAlCarrito(producto);
    });
}

let carrito;

function agregarAlCarrito(producto) {
    //Recoge los datos guardados en el Local Storage
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    //Busca el elemento ID_producto
    const productoExistente = carrito.find(item => item.id_producto === producto.id_producto);

    //Guardar la cantidad en el carrito
    if (productoExistente) {
        //Si existe, incrementa el valor
        productoExistente.cantidad += 1;
    } else {
        //Si no existe lo establece a 1
        producto.cantidad = 1;
        carrito.push(producto);
    }

    //Se guarda en el Local Storage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    //Se muestra una alerta
    alert("Producto añadido al carrito");

    //Se redirecciona a la página de carrito
    window.location.href = "carrito.html";
}

/*--------------PÁGINA DE ESTADÍSTICAS--------------*/
function cargarEstadisticas() {
    //Llamada al JSON de estadísticas
    const request = new XMLHttpRequest();
    const url = "http://localhost//Estadisticas.json";

    request.open("GET", url);
    request.responseType = "json";

    //Al cargar, llama a las funciones para mostrar las estadísticas
    request.onload = function () {
        localStorage.setItem('estadisticasJSON', JSON.stringify(request.response));
        mostrarGanancias();
        mostrarProductosMasComprados();
        mostrarClientes();
        mostrarStockBajo();
        mostrarNuncaComprados();
        mostrarGananciasPorMeses();
    };

    request.send();
}
    
//TOTAL GANANCIAS
function mostrarGanancias(){
    //Recoger los datos de nuestros productos mediante el Local Storage
    const nuestrasEstadisticas = localStorage.getItem('estadisticasJSON');
    const estadisticasJSON = JSON.parse(nuestrasEstadisticas);

    //Definimos variables
    let ganancias = document.getElementById("total_ganancias");
    const gananciasTotales = estadisticasJSON.estadisticas[0].ganancias_totales;

    //Insertamos el dato en el documento
    ganancias.innerHTML = `
        <h2>${gananciasTotales.toFixed(2)} €</h2>
        `;
}

function mostrarProductosMasComprados() {
    //Recoger los datos de nuestros productos mediante el Local Storage
    const nuestrasEstadisticas = localStorage.getItem('estadisticasJSON');
    const estadisticasJSON = JSON.parse(nuestrasEstadisticas);
    
    //Definimos variables
    let masComprados = document.getElementById("productos_mas_500");
    const producto = estadisticasJSON.estadisticas[29].productos_mas_500.nombre;
    const ID = estadisticasJSON.estadisticas[29].productos_mas_500.id_producto;
    const generado = estadisticasJSON.estadisticas[29].productos_mas_500.productos_mas_500;

    //Insertamos los datos en el documento
    masComprados.innerHTML += `
    <a href="producto.html?id_producto=${ID}">
        <h3>${producto + ": &ensp;" + generado} €</h3>
    </a>`;

}

//CLIENTES CON MÁS PEDIDOS
function mostrarClientes(){
    //Recoger los datos de nuestros productos mediante el Local Storage
    const nuestrasEstadisticas = localStorage.getItem('estadisticasJSON');
    const estadisticasJSON = JSON.parse(nuestrasEstadisticas);
    
    let clientes = document.getElementById("clientes_mas_pedidos");
    
    //Recorremos los datos de los clientes que más compras han realizado y mostramos su usario
    for (let i = 6; i < 16; i++) {
        const clientesMasPedidos = estadisticasJSON.estadisticas[i].clientes_mas_pedidos.nombre_usuario;
        clientes.innerHTML += `<h3>${clientesMasPedidos}</h3>`;
    }
}

//STOCK BAJO
function mostrarStockBajo(){
    //Recoger los datos de nuestros productos mediante el Local Storage
    const nuestrasEstadisticas = localStorage.getItem('estadisticasJSON');
    const estadisticasJSON = JSON.parse(nuestrasEstadisticas);

    let stock = document.getElementById("productos_bajo_stock");

    //Recorremos los datos de los productos con bajo stock y mostramos los datos
    for (let i = 1; i < 6; i++) {
        const stockBajo = estadisticasJSON.estadisticas[i].productos_bajo_stock.nombre;
        const stockBajoCantidad = estadisticasJSON.estadisticas[i].productos_bajo_stock.stock;
        stock.innerHTML += `<h3>${stockBajo + ": &ensp;" + stockBajoCantidad}</h3>`;
}
}

//NUNCA COMPRADOS
function mostrarNuncaComprados(){
    //Recoger los datos de nuestros productos mediante el Local Storage
    const nuestrasEstadisticas = localStorage.getItem('estadisticasJSON');
    const estadisticasJSON = JSON.parse(nuestrasEstadisticas);
    
    let nuncaComprados = document.getElementById("productos_nunca_comprados");

    //Recorremos los datos de los productos nunca comprados y mostramos los datos
    for (let i = 23; i < 29; i++) {
        const producto = estadisticasJSON.estadisticas[i].productos_nunca_comprados.nombre;
        const ID = estadisticasJSON.estadisticas[i].productos_nunca_comprados.id_producto;

        nuncaComprados.innerHTML += `
        <a href="producto.html?id_producto=${ID}">
            <h3>${producto}</h3>
        </a>`;
    }
}

//GANANCIAS POR MESES
function mostrarGananciasPorMeses(){
    //Recoger los datos de nuestros productos mediante el Local Storage
    const nuestrasEstadisticas = localStorage.getItem('estadisticasJSON');
    const estadisticasJSON = JSON.parse(nuestrasEstadisticas);

    //Definimos las variables y las inicializamos a 0
    let enero = 0;
    let febrero = 0;
    let marzo = 0;
    let abril = 0;
    let mayo = 0;
    let junio = 0;
    let julio = 0;
    let agosto = 0;
    let septiembre = 0;
    let octubre = 0;
    let noviembre = 0;
    let diciembre = 0;

    //Recorremos los datos para obtener las ganancias obtenidas en cada mes
    for (let i = 16; i < 23; i++) {
        const estadistica = estadisticasJSON.estadisticas[i];
       if (estadistica.ganancias_mensuales) {
            const mes = estadistica.ganancias_mensuales.mes;
            const ganancias = estadistica.ganancias_mensuales.ganancias_mensuales.toFixed(2);

           //Definimos la correspondencia entre número - mes
            switch (mes) {
                case 1: enero = ganancias; break;
                case 2: febrero = ganancias; break;
                case 3: marzo = ganancias; break;
                case 4: abril = ganancias; break;
                case 5: mayo = ganancias; break;
                case 6: junio = ganancias; break;
                case 7: julio = ganancias; break;
                case 8: agosto = ganancias; break;
                case 9: septiembre = ganancias; break;
                case 10: octubre = ganancias; break;
                case 11: noviembre = ganancias; break;
                case 12: diciembre = ganancias; break;
            }
        }
    } 
    
    //Insertamos los datos a mostrar en el gráfico
    const xValues = ["", "Enero ", "Febrero ", "Marzo ", "Abril ", "Mayo ", "Junio ", "Julio ", "Agosto ", "Septiembre ", "Octubre ", "Noviembre ", "Diciembre "];
    const yValues = [0, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre];

    //Estética del gráfico
    new Chart("grafico-meses", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(42,10,222,1.0)",
                borderColor: "rgba(42,10,222,0.1)",
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: 0, max: 1000 } }],
            }
        }
    });
}


/*-------------CARRITO----------*/
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoCarrito = document.getElementById('productoDelCarrito');
    const totalCarrito = document.querySelector('.total-carrito h2');

    if (carrito.length === 0) {
        productoCarrito.innerHTML = `<p>No hay productos en el carrito.</p>`;
    } else {
        let total = 0;
        carrito.forEach(producto => {
            productoCarrito.innerHTML += `
                <div class="producto-carrito">
                    <div>
                        <h3>${producto.nombre}</h3>
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <div>
                        <p>Precio: ${producto.precio} €</p>
                        <p>Cantidad: ${producto.cantidad}</p>
                    </div>
                </div>
            `;
            total += producto.precio * producto.cantidad;
        });
        totalCarrito.innerText = `${total.toFixed(2)} €`;
    }
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    alert("Carrito vaciado");
    window.location.href = "carrito.html";
}