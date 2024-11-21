const paisSeleccionado = JSON.parse(localStorage.getItem("paisElegido"));
const nombrePais = localStorage.getItem("nombrePais");

if (!paisSeleccionado || !nombrePais) {
    alert("No se encontró información del país seleccionado.");
    window.location.href = "index.html";
} else {
    document.getElementById("titulo-pais").textContent = `Destinos en ${nombrePais}`;
    const destinosPaisContainer = document.getElementById("destinos-pais");

    paisSeleccionado.forEach(destino => {
        const destinoElement = crearDestinoElement(destino);
        destinosPaisContainer.appendChild(destinoElement);
    });
}

function crearDestinoElement(destino) {
    const destinoDiv = document.createElement('div');
    destinoDiv.className = 'destino-card';
    destinoDiv.innerHTML = `
        <img src="${destino.rutaImagen[0]}" alt="${destino.nombre}">
        <div class="destino-info">
            <h3>${destino.nombre}</h3>
            <p>${destino.ciudad}</p>
            <p>Valoración: ${destino.valoracion.toFixed(1)} ⭐</p>
            <button class="btn-ver-mas" data-destino='${JSON.stringify(destino)}'>Ver más</button>
        </div>
    `;
    
    destinoDiv.querySelector('.btn-ver-mas').addEventListener('click', (e) => {
        const destinoData = JSON.parse(e.target.dataset.destino);
        localStorage.setItem("destinoSeleccionado", JSON.stringify(destinoData));
        window.location.href = "destino.html";
    });
    
    return destinoDiv;
}