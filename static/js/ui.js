export function mostrarMensaje(texto, tipo = "info") {
    const alerta = document.createElement("div");
    alerta.textContent = texto;
    alerta.style.padding = "10px";
    alerta.style.margin = "10px 0";
    alerta.style.borderRadius = "5px";
    alerta.style.fontSize = "0.9rem";
    alerta.style.border = "1px solid";
    alerta.style.background = tipo === "error" ? "#ffe4e4" : "#e0ffe8";
    alerta.style.borderColor = tipo === "error" ? "#f87171" : "#34d399";
    alerta.style.position = "fixed";
    alerta.style.top = "10px";
    alerta.style.right = "10px";
    alerta.style.zIndex = "1000";
    document.body.prepend(alerta);
    setTimeout(() => alerta.remove(), 2500);
}

export function limpiarFormularioProducto() {
    const nombre = document.getElementById("nombre");
    const precio = document.getElementById("precio");
    const imagen = document.getElementById("imagen");
    if (nombre) nombre.value = "";
    if (precio) precio.value = "";
    if (imagen) imagen.value = "";
}

export function limpiarFormularioComentario() {
    const idProducto = document.getElementById("idProducto");
    const usuarioComentario = document.getElementById("usuario-comentario");
    const textoComentario = document.getElementById("texto-comentario");
    if (idProducto) idProducto.value = "";
    if (usuarioComentario) usuarioComentario.value = "";
    if (textoComentario) textoComentario.value = "";
}
