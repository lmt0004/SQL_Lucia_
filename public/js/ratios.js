document.addEventListener('DOMContentLoaded', (event) => {
    mostrarGrafico();
   event.preventDefault();


// Función para obtener datos y mostrar el gráfico
function mostrarGrafico() {
    // Realizar la petición AJAX para obtener datos
    $.ajax({
        url: '/obtener_aprobados_por_curso',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Manejar la respuesta del servidor
            console.log(data);

            // Crear un array para almacenar etiquetas y datos
            var etiquetas = [];
            var datos = [];

            // Iterar sobre los datos para llenar los arrays
            for (var curso in data) {
                etiquetas.push(curso);
                datos.push(data[curso]);
            }

            // Configurar y mostrar el gráfico con Chart.js
            var ctx = document.getElementById('graficoAprobados').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: etiquetas,
                    datasets: [{
                        label: 'Aprobados por Curso',
                        data: datos,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        error: function(error) {
            // Manejar errores
            console.error(error);
            alert('Error al obtener datos para el gráfico.');
        }
    });
}

// Llamar a la función al cargar la página
$(document).ready(function() {
    mostrarGrafico();
});
});