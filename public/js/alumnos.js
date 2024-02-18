
document.addEventListener('DOMContentLoaded', (event) => {
 obtenerAlumnos();
event.preventDefault();
 
 // Función para mostrar los resultados de alumnos
function mostrarResultadosAlumnos(data) {
   
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h2>Resultados:</h2>`;
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
    // Función para obtener y mostrar datos de alumnos
    function obtenerAlumnos() {
        $.ajax({
            url: '/obtener_alumnos',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                mostrarResultadosAlumnos(data, 'alumnos');
            },
            error: function (error) {
                console.error('Error al obtener datos de alumnos:', error);
            }
        });
    }
    $(document).ready(function() {
        $("#eliminarAlumnoBtn").click(function() {
            // Pedir al usuario que ingrese el ID del alumno
            const alumnoId = prompt('Ingresa el ID del alumno a eliminar:');
    
            // Verificar si el usuario ingresó un ID válido
            if (alumnoId !== null && alumnoId !== '') {
                // Realizar la petición AJAX
                $.ajax({
                    url: `/eliminar_alumno/${alumnoId}`,
                    type: 'DELETE',
                    success: function(response) {
                        // Manejar la respuesta del servidor
                        console.log(response);
                        alert(`Alumno con ID ${alumnoId} ha sido eliminado correctamente.`);
                    },
                    error: function(error) {
                        // Manejar errores
                        console.error(error);
                        alert('Error al eliminar el alumno.');
                    }
                });
            } else {
                alert('ID inválido. Por favor, ingresa un ID válido.');
            }
        });
    });

})