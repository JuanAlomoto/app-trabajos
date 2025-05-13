const contenedorProductos = document.getElementById("productos");
const inputBusqueda = document.getElementById("busqueda");
const contenedorCategorias = document.getElementById("categorias");

let productos = [];
let categoriaSeleccionada = "all";

// Cargar productos desde la API
async function cargarProductos() {
    try {
        const respuesta = await fetch("https://fakestoreapi.com/products");
        if (!respuesta.ok) throw new Error("Error al cargar los productos.");
        productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Cargar categorías desde la API
async function cargarCategorias() {
    try {
        const respuesta = await fetch("https://fakestoreapi.com/products/categories");
        if (!respuesta.ok) throw new Error("Error al cargar las categorías.");
        const categorias = await respuesta.json();
        mostrarCategorias(["all", ...categorias]);
    } catch (error) {
        console.error("Error al cargar las categorías:", error);
    }
}

// Mostrar botones de categoría
function mostrarCategorias(categorias) {
    contenedorCategorias.innerHTML = "";
    categorias.forEach((cat) => {
        const btn = document.createElement("button");
        btn.textContent = cat === "all" ? "Todos" : cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.className = `px-4 py-2 rounded-full ${categoriaSeleccionada === cat
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
            } hover:bg-blue-600 hover:text-white transition-colors duration-300`;

        btn.addEventListener("click", () => {
            categoriaSeleccionada = cat;
            mostrarCategorias(categorias);
            filtrarProductos();
        });

        contenedorCategorias.appendChild(btn);
    });
}

// Filtrar productos por categoría y búsqueda
function filtrarProductos() {
    let filtrados = productos;

    if (categoriaSeleccionada !== "all") {
        filtrados = filtrados.filter((p) => p.category === categoriaSeleccionada);
    }

    const texto = inputBusqueda.value.toLowerCase().trim();
    if (texto !== "") {
        filtrados = filtrados.filter((p) =>
            p.title.toLowerCase().includes(texto) ||
            p.description.toLowerCase().includes(texto)
        );
    }

    mostrarProductos(filtrados);
}

// Mostrar productos
function mostrarProductos(lista) {
    contenedorProductos.innerHTML = "";
    lista.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.className =
            "bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300";

        productoDiv.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" class="w-32 h-32 object-contain mb-4">
            <h3 class="text-lg font-semibold mb-2 text-center">${producto.title}</h3>
            <p class="text-gray-600 text-sm mb-2 line-clamp-3 text-center">${producto.description}</p>
            <p class="text-blue-500 font-bold mb-2">$${producto.price}</p>
            <button class="agregar-carrito bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300" data-id="${producto.id}">
                Agregar al Carrito
            </button>
        `;

        contenedorProductos.appendChild(productoDiv);
    });
}

// Eventos
inputBusqueda.addEventListener("input", filtrarProductos);

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    cargarCategorias();
});

