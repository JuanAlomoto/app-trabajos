document.addEventListener("DOMContentLoaded", () => {
    const detalleProductoContainer = document.getElementById("detalle-producto");

    // obtener el id del producto de la URL 
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id"); // id es el nombre del parámetro en la URL

    if (productId) {
        cargarDetalleProducto(productId); // si hay un id cargar el detalle del producto
    } else {
        // si no hay id en la url mostrar un mensaje de error
        detalleProductoContainer.innerHTML = "<p class='text-red-500 text-center'>ID de producto no encontrado en la URL.</p>";
    }

    // función asincrona para cargar los detalles de un producto desde la api
    async function cargarDetalleProducto(id) {
        try {
            // realizar la petición a la api para el producto especifico
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            if (!response.ok) { 
                throw new Error("Error al cargar el detalle del producto Codigo: " + response.status);
            }
            const producto = await response.json(); 

            // mostrar la informacion del producto en el contenedor
            detalleProductoContainer.innerHTML = `
                <img src="${producto.image}" alt="${producto.title}" class="w-64 h-64 object-contain mr-8">
                <div class="flex-1">
                    <h2 class="text-3xl font-bold mb-4">${producto.title}</h2>
                    <p class="text-xl text-blue-600 font-semibold mb-4">$${producto.price}</p>
                    <p class="text-gray-700 mb-4">${producto.description}</p>
                    <p class="text-gray-500 text-sm">Categoría: <span class="font-medium">${producto.category}</span></p>
                </div>
            `;
        } catch (error) {
            console.error("Error cargando el detalle del producto:", error);
            detalleProductoContainer.innerHTML = `<p class='text-red-500 text-center'>No se pudo cargar el detalle del producto: ${error.message}</p>`;
        }
    }
});