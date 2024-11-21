const destinoSeleccionado = JSON.parse(localStorage.getItem("destinoSeleccionado"));

if (!destinoSeleccionado) {
    alert("No se encontró información del destino seleccionado.");
    window.location.href = "index.html";
} else {
    const destinoDetalle = document.getElementById("destino-detalle");
    destinoDetalle.innerHTML = `
        <h1>${destinoSeleccionado.nombre}</h1>
        <div class="destino-galeria">
            ${destinoSeleccionado.rutaImagen.map(img => `<img src="${img}" alt="${destinoSeleccionado.nombre}">`).join('')}
        </div>
        <div class="destino-info">
            <p><strong>Ciudad:</strong> ${destinoSeleccionado.ciudad}</p>
            <p><strong>Tipo:</strong> ${destinoSeleccionado.tipo}</p>
            <p><strong>Precio:</strong> ${destinoSeleccionado.precio === 0 ? "Gratis" : `${destinoSeleccionado.precio.toFixed(2)} €`}</p>
            <p><strong>Valoración:</strong> ${destinoSeleccionado.valoracion.toFixed(1)} ⭐</p>
            <a href="${destinoSeleccionado.ubicacion_url}" target="_blank" rel="noopener noreferrer" class="btn-ubicacion">Ver ubicación</a>
        </div>
    `;
}