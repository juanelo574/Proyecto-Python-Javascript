import { obtenerProductos } from "./api.js";

export async function cargarProductos() {
    const contenedor = document.getElementById("product-list");
    contenedor.innerHTML = "";

    const loader = document.getElementById("loader");
    loader.style.display = "block";

    try {
        const productos = await obtenerProductos();
        loader.style.display = "none";

        if (productos.length === 0) {
            contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        productos.forEach((producto) => {
            const productCard = document.createElement("product-card");
            productCard.setAttribute("nombre", producto.nombre);
            productCard.setAttribute("precio", producto.precio);
            productCard.setAttribute("habilitado", producto.habilitado);
            productCard.setAttribute("id", producto.id);
            productCard.setAttribute("imagen", producto.imagen || "");
            contenedor.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error al cargar productos:", error);
        loader.style.display = "none";
        contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
    }
}
