import paises from '../data/lugares.json' with{ type: 'json' };

const navLinks = document.querySelectorAll('nav a');
const destinosContainer = document.getElementById('destinos-container');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pais = e.target.dataset.pais;
        console.log(`Click en ${pais}`);
        localStorage.setItem("paisElegido", JSON.stringify(paises[pais]));
        localStorage.setItem("nombrePais", pais);
        window.location.href = "pais.html";
    });
});

// Mostrar destinos populares en la página principal
const destinosPopulares = obtenerDestinosPopulares();
destinosPopulares.forEach(destino => {
    const destinoElement = crearDestinoElement(destino);
    destinosContainer.appendChild(destinoElement);
});

function obtenerDestinosPopulares() {
    return Object.values(paises).flat().sort((a, b) => b.valoracion - a.valoracion).slice(0, 6);
}

function crearDestinoElement(destino) {
    const destinoDiv = document.createElement('div');
    destinoDiv.className = 'destino-card';
    destinoDiv.innerHTML = `
        <img src="${destino.rutaImagen[0]}" alt="${destino.nombre}">
        <div class="destino-info">
            <h3>${destino.nombre}</h3>
            <p>${destino.ciudad}, ${obtenerPaisPorCiudad(destino.ciudad)}</p>
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

function obtenerPaisPorCiudad(ciudad) {
    for (const [pais, destinos] of Object.entries(paises)) {
        if (destinos.some(destino => destino.ciudad === ciudad)) {
            return pais;
        }
    }
    return 'Desconocido';
}