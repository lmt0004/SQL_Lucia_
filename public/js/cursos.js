document.addEventListener('DOMContentLoaded', (event) => {
    obtenerCursos();
    event.preventDefault();


function obtenerCursos() {
    $.ajax({
        url: '/obtener_cursos',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            mostrarResultadosCursos(data, 'Cursos');
        },
        error: function (error) {
            console.error('Error al obtener datos de cursos:', error);
        }
    });
}


function mostrarResultadosCursos(data, tipo) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h2>Resultados :</h2>`;
    if (data.length > 0) {
        resultsDiv.innerHTML += `<ul>`;
        data.forEach(item => {
            resultsDiv.innerHTML += `
                <li>
                    <strong>Nombre:</strong> ${item.nombre}, 
                    <strong>Descripción:</strong> ${item.descripcion}, 
                    <strong>Lugar:</strong> ${item.lugar}, 
                    <strong>Nivel:</strong> ${item.nivel}
                </li>`;
        });
        resultsDiv.innerHTML += `</ul>`;
    } else {
        resultsDiv.innerHTML += '<p>No hay datos disponibles.</p>';
    }
}
});