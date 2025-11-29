// api.js - Todas las funciones relacionadas con llamadas a la API (Las que interactuan con Flask)

export async function obtenerProductos(search = "") {
    const url = search && search.trim() ? `/productos?search=${encodeURIComponent(
        search.trim()
    )}` : "/productos";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los productos");
    return await response.json();
}

export async function agregarProducto(formData) {
    const response = await fetch("/productos", {
        method: "POST",
        body: formData,
    });
    if (!response.ok) throw new Error("Error al agregar el producto");
    return await response.json();
}

export async function eliminarProducto(id) {
    await fetch(`/productos/${id}`, {
        method: "DELETE",
    });
}

export async function habilitarProducto(id) {
    await fetch(`/productos/${id}/habilitar`, {
        method: "GET",
    });
}

export async function obtenerComentarios(id) {
    const response = await fetch(`/productos/${id}/comentarios`);
    if (!response.ok) throw new Error("Error al obtener los comentarios");
    return await response.json();
}

export async function agregarComentario(id, data) {
    console.log("Agregar comentario API:", id, data);
    const response = await fetch(`/productos/${id}/comentarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al agregar el comentario");
    return await response.json();
}

export async function actualizarProducto(id, data) {
    const options = { method: "PUT" };
    if (data instanceof FormData) {
        options.body = data;
    } else {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`/productos/${id}`, options);
    if (!response.ok) throw new Error("Error al actualizar el producto");
    return await response.json();
}
