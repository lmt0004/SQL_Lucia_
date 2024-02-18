const express = require('express');
const mysql = require('mysql2/promise');
const fs = require('fs');
const app = express();
const port = 3000;
const path = require('path');

// Configuración de la conexión a la base de datos (reemplaza con tus detalles)
const dbConfig = {
    connectionLimit: 5,
    host: 'bwxqv0n8siqmtrexb8mo-mysql.services.clever-cloud.com',
    user: 'uw2jbutrvgewtazh',
    password: 'HBxReEObQYoiwe2jBEwu',
    database: 'bwxqv0n8siqmtrexb8mo'
};


app.use(express.json());
app.use(express.static('public'));


/*app.get('/', (req, response) => {
    
    var contenido=fs.readFileSync("public/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});*/
app.get('/', (req, res) => {
    // Lee el archivo JSON
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo HTML', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
    })
});




// Ruta para obtener la lista de cursos
app.get('/obtener_cursos', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows, fields] = await connection.execute('SELECT * FROM Cursos');
        connection.end();

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los cursos.' });
    }
});
app.get('/obtener_alumnos', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows, fields] = await connection.execute('SELECT * FROM Alumnos');
        connection.end();

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los cursos.' });
    }
});
app.get('/obtener_centros', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows, fields] = await connection.execute('SELECT * FROM Centros');
        connection.end();

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los cursos.' });
    }
});
app.delete('/eliminar_alumno/:id', async (req, res) => {
    const alumnoId = req.params.id;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM Alumnos WHERE id = ?', [alumnoId]);
        connection.end();

        res.json({ message: `El alumno con ID ${alumnoId} ha sido eliminado correctamente.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el alumno.' });
    }
});
app.get('/obtener_aprobados_por_curso', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        // Consulta SQL para obtener la cantidad de aprobados por curso
        const query = 'SELECT Cursos.nombre AS curso, COUNT(*) AS cantidad FROM AlumnoCurso ' +
                      'INNER JOIN Cursos ON AlumnoCurso.id_curso = Cursos.id ' +
                      'WHERE AlumnoCurso.estado = "Aprobado" GROUP BY Cursos.nombre';
        const [results] = await connection.execute(query);

        connection.end();

        // Formatear los resultados como un objeto JSON
        const data = {};
        results.forEach(result => {
            data[result.curso] = result.cantidad;
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener datos para el gráfico.' });
    }
});



// Configuración del servidor y conexión a la base de datos...

// Ruta para actualizar los cursos
app.put('/actualizar_cursos', async (req, res) => {

        try {
            const connection = await mysql.createConnection(dbConfig);
    
            // Ejemplo de actualización de cursos (ajusta según la estructura de tu base de datos)
            const updateQuery = 'UPDATE Cursos SET nombre = ?, descripcion = ?, lugar = ?, nivel = ? WHERE id = ?';
    
            // Ejemplo de datos de actualización (puedes recibirlos desde el cliente)
            const newData = {
                nombre: 'Nuevo nombre',
                descripcion: 'Nueva descripción',
                lugar: 'Nuevo lugar',
                nivel: 'Nuevo nivel',
                id: 1 // ID del curso que deseas actualizar
            };
    
            const [result] = await connection.execute(updateQuery, [
                newData.nombre,
                newData.descripcion,
                newData.lugar,
                newData.nivel,
                newData.id
            ]);
        connection.end();

        res.json({ message: 'Los cursos han sido actualizados correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar los cursos.' });
    }
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
