document.addEventListener('DOMContentLoaded', (event) => {
    obtenerCentros();
    event.preventDefault();

function obtenerCentros() {
    $.ajax({
        url: '/obtener_centros',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            mostrarResultadosCentro(data, 'Centros');
        },
        error: function (error) {
            console.error('Error al obtener datos de centros:', error);
        }
    });
}

function mostrarResultadosCentro(data, tipo) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h2>Resultados :</h2>`;
    if (data.length > 0) {
        resultsDiv.innerHTML += `<ul>`;
        data.forEach(item => {
            resultsDiv.innerHTML += `
                <li>
                    <strong>ID:</strong> ${item.id}, 
                    <strong>Nombre:</strong> ${item.nombre}
                </li>`;
        });
        resultsDiv.innerHTML += `</ul>`;
    } else {
        resultsDiv.innerHTML += '<p>No hay datos disponibles.</p>';
    }
}   
});