import { agregarProducto, agregarComentario, actualizarProducto } from "./api.js";

import { mostrarMensaje, limpiarFormularioProducto, limpiarFormularioComentario } from "./ui.js";

import { cargarProductos } from "./utils.js";

import "./components/product-card.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();


const formBuscar = document.getElementById("form-buscar");
if (formBuscar) {
    formBuscar.addEventListener("submit", async (e) => {
        e.preventDefault();
        const inputBuscar = document.getElementById("buscar-producto");
        const query = inputBuscar ? inputBuscar.value : "";
        try {
            await cargarProductos(query);
        } catch (error) {
            console.error("Error al buscar productos:", error);
        }
    });
}
   
});




const formProducto = document.getElementById("form-product");
if (formProducto) {
    formProducto.addEventListener("submit", async (e) => {
        e.preventDefault();
        const inputNombre = document.getElementById("nombre-producto");
        const inputPrecio = document.getElementById("precio-producto");
        const inputImagen = document.getElementById("imagen-producto");
        const inputEditar = document.getElementById("editar");
        const btnSubmit = document.getElementById("btn-submit-product");

        const editId = inputEditar ? inputEditar.value : "";

        if (editId) {
            const formData = new FormData();
            formData.append("nombre", inputNombre.value);
            formData.append("precio", parseFloat(inputPrecio.value));
            if (inputImagen && inputImagen.files && inputImagen.files[0]) {
                formData.append("imagen", inputImagen.files[0]);
            }
            try {
                await actualizarProducto(editId, formData);
                mostrarMensaje("Producto actualizado correctamente.");
                limpiarFormularioProducto();
                inputEditar.value = "";
                if (btnSubmit) btnSubmit.textContent = "Agregar";
                if (inputImagen) inputImagen.required = true;
                cargarProductos();
            } catch (error) {
                console.error("Error al actualizar producto:", error);
                mostrarMensaje("Error al actualizar el producto.", "error");
            }
        } else {
            const formData = new FormData();
            formData.append("nombre", inputNombre.value);
            formData.append("precio", parseFloat(inputPrecio.value));
            formData.append("imagen", inputImagen.files[0]);
            try {
                await agregarProducto(formData);
                mostrarMensaje("Producto agregado correctamente.");
                limpiarFormularioProducto();
                cargarProductos();
            } catch (error) {
                console.error("Error al agregar producto:", error);
                mostrarMensaje("Error al agregar el producto.", "error");
            }
        }
    });
}

// Escuchar evento disparado por product-card para iniciar edición
document.addEventListener("editar-producto", (e) => {
    const detail = e.detail || {};
    const id = detail.id;
    const nombre = detail.nombre || "";
    const precio = detail.precio || "";
    // Rellenar formulario
    const inputNombre = document.getElementById("nombre-producto");
    const inputPrecio = document.getElementById("precio-producto");
    const inputImagen = document.getElementById("imagen-producto");
    const inputEditar = document.getElementById("editar");
    const btnSubmit = document.getElementById("btn-submit-product");

    if (inputNombre) inputNombre.value = nombre;
    if (inputPrecio) inputPrecio.value = precio;
    if (inputEditar) inputEditar.value = id;
    if (btnSubmit) btnSubmit.textContent = "Actualizar";
    if (inputImagen) inputImagen.required = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const formComentario = document.getElementById("form-comentario");
if (formComentario) {
    formComentario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const idProducto = document.getElementById("idProducto");
        const usuario = document.getElementById("usuario-comentario");
        const texto = document.getElementById("texto-comentario");

        try {
            await agregarComentario(idProducto.value, {
                usuario: usuario.value,
                texto: texto.value,
            });
            mostrarMensaje("Comentario agregado correctamente.");
            limpiarFormularioComentario();
            cargarProductos();
        } catch (error) {
            console.error("Error al agregar comentario:", error);
            mostrarMensaje("Error al agregar el comentario.", "error");
        }
    });
}
