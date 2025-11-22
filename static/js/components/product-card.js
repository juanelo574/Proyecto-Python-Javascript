import {
    eliminarProducto as eliminarProductoAPI,
    habilitarProducto as habilitarProductoAPI,
    obtenerComentarios,
} from "../api.js";

import { cargarProductos } from "../utils.js";

import { mostrarMensaje } from "../ui.js";

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const nombre = this.getAttribute("nombre") || "Producto";
        const precio = this.getAttribute("precio") || "0.00";
        const habilitado = this.getAttribute("habilitado") === "true";
        const id = this.getAttribute("id") || "";
        const imagen = this.getAttribute("imagen") || "static/default-image.webp";

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin: 5px 0;
                    border-radius: 5px;
                    background-color: ${habilitado ? "#fff" : "#f8d7da"};
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 5px;
                    object-fit: cover;
                }

                button {
                    background: crimson;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 3px;
                    cursor: pointer;
                }
                
                #btnHabilitar {
                    background: ${habilitado ? "gray" : "green"};
                }

                .comentarios {
                    margin-top: 10px;
                    font-size: 0.9em;
                    color: #555;
                }

                .comentarios p {
                    margin: 5px 0;
                }
            </style>
            <div>
                <div class="card">
                    <img src="${imagen}" alt="${nombre}" />
                    <span><strong>${nombre}</strong> - Q${precio}</span>
                    <div>
                        <button id="btnHabilitar">${
                            habilitado ? "Deshabilitar" : "Habilitar"
                        }</button>
                        <button id="btnEliminar">Eliminar</button>
                    </div>
                </div>
                <div id="comentarios" class="comentarios">Cargando comentarios...</div>
            </div>
        `;

        // Cargar comentarios
        const comentariosDiv = this.shadowRoot.getElementById("comentarios");
        const comentarios = await obtenerComentarios(id);
        if (comentarios.length === 0) {
            comentariosDiv.innerHTML = "<em>No hay comentarios.</em>";
        } else {
            comentariosDiv.innerHTML =
                "<strong>Comentarios:</strong><ul>" +
                comentarios
                    .map((c) => `<p><strong>${c.usuario}</strong>: ${c.texto}</p>`)
                    .join("") +
                "</ul>";
        }

        this.shadowRoot.getElementById("btnEliminar").addEventListener("click", async () => {
            eliminarProducto(id);
        });
        this.shadowRoot.getElementById("btnHabilitar").addEventListener("click", async () => {
            habilitarProducto(id);
        });
    }
}

customElements.define("product-card", ProductCard);

async function eliminarProducto(id) {
    if (!confirm("¿Está seguro de que desea eliminar este producto?")) {
        return;
    }
    await eliminarProductoAPI(id);
    mostrarMensaje("Producto eliminado correctamente.");
    cargarProductos();
}

async function habilitarProducto(id) {
    await habilitarProductoAPI(id);
    mostrarMensaje("Producto habilitado/deshabilitado correctamente.");
    cargarProductos();
}
