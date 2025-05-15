const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3001;

// Clave secreta para JWT
const SECRET_KEY = 'clave_super_secreta_anahuarket';

// Conexión a MySQL
const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'monicaseijas1',
    database: 'Anahuarket'
});

bd.connect((err) => {
    if (err) {
        console.log("Error al conectarse a mysql: " + err.stack);
        return;
    }
    console.log("Conectado a MySQL");
});

// Middleware para validar token
function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    jwt.verify(token, SECRET_KEY, (err, usuario) => {
        if (err) return res.status(403).json({ error: 'Token inválido o expirado' });
        req.usuario = usuario;
        next();
    });
}

// Ruta de prueba
app.get('/api', (req, res) => {
    res.send('Bienvenido a la API de Anahuarket');
});


// ruta para searchbar
app.get('/api/buscar', (req, res) => {
    const palabraClave = req.query.q || null;

    const query = 'CALL BuscarProducto(?)';
    bd.query(query, [palabraClave], (err, results) => {
        if (err) {
            console.error('Error al buscar productos:', err);
            return res.status(500).json({ error: 'Error del servidor' });
        }
        // results[0] contiene el resultado de la llamada al procedimiento
        res.json(results[0]);
    });
});


// Obtener todos los productos con nombre del vendedor
app.get('/api/producto', (req, res) => {
    const query = `
        SELECT 
            p.idProducto,
            p.nombreProducto,
            p.precio,
            p.descripcion,
            p.fotoProducto,
            u.Nombre AS nombreVendedor
        FROM Producto p
        JOIN Usuarios u ON p.idUsuario = u.idUsuario
        WHERE p.isActive = TRUE
        ORDER BY p.fechaPublicacion DESC
    `;

    bd.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener productos:", err);
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

//  LOGIN 
app.post('/api/auth/login', (req, res) => {
    const { correo, contrasena } = req.body;
    const query = 'SELECT * FROM Usuarios WHERE Correo = ? AND isActive = TRUE';

    bd.query(query, [correo], async (err, results) => {
        if (err) {
            console.error(" Error SQL:", err);
            return res.status(500).json({ error: 'Error del servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        try {
            const user = results[0];
            console.log(" Usuario encontrado:", user);

            const match = await bcrypt.compare(contrasena, user.Contrasena);
            if (!match) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                { idUsuario: user.idUsuario, correo: user.Correo },
                SECRET_KEY,
                { expiresIn: '2h' }
            );

            res.json({
                mensaje: 'Login exitoso',
                token,
                usuario: {
                    id: user.idUsuario,
                    nombre: user.Nombre,
                    correo: user.Correo
                }
            });
        } catch (error) {
            console.error("💥 Error en login:", error);
            return res.status(500).json({ error: 'Error al procesar login' });
        }
    });
});

// Registro
app.post('/api/auth/register', async (req, res) => {
    const { nombre, correo, contrasena, telefono } = req.body;

    if (!nombre || !correo || !contrasena || !telefono) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const correoRegex = /^[\w.-]+@anahuac\.mx$/;
    if (!correoRegex.test(correo)) {
        return res.status(400).json({ error: 'El correo debe ser institucional (@anahuac.mx)' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const query = 'CALL RegistrarUsuario(?, ?, ?, ?)';
    bd.query(query, [nombre, correo, hashedPassword, telefono], (err, results) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            return res.status(500).json({ error: 'Error del servidor' });
        }
        res.status(200).json({ mensaje: 'Usuario registrado exitosamente' });
    });
});

// Obtener perfil de usuario por ID
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT idUsuario, nombre, correo, telefono FROM Usuarios WHERE idUsuario = ? AND isActive = TRUE';

    bd.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error del servidor' });
        if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(results[0]);
    });
});

// Obtener perfil autenticado
app.get('/api/users/me', autenticarToken, (req, res) => {
    const idUsuario = req.usuario.idUsuario;
    const query = 'SELECT idUsuario, nombre, correo, telefono FROM Usuarios WHERE idUsuario = ? AND isActive = TRUE';

    bd.query(query, [idUsuario], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error del servidor' });
        if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(results[0]);
    });
});

// Actualizar perfil
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono, contrasena } = req.body;

    let hashedPassword = contrasena;
    if (contrasena) {
        hashedPassword = await bcrypt.hash(contrasena, 10);
    }

    const query = 'UPDATE Usuarios SET nombre = ?, correo = ?, telefono = ?, contrasena = ? WHERE idUsuario = ? AND isActive = TRUE';

    bd.query(query, [nombre, correo, telefono, hashedPassword, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error del servidor' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json({ mensaje: 'Perfil actualizado exitosamente' });
    });
});

// Obtener productos del usuario autenticado
app.get('/api/producto/usuario/:id', (req, res) => {
    const idUsuario = req.params.id;

    const query = `
        SELECT 
            p.idProducto,
            p.nombreProducto,
            p.precio,
            p.descripcion,
            p.fotoProducto
        FROM Producto p
        WHERE p.idUsuario = ? AND p.isActive = TRUE
        ORDER BY p.fechaPublicacion DESC
    `;

    bd.query(query, [idUsuario], (err, results) => {
        if (err) {
            console.error("Error al obtener productos del usuario:", err);
            return res.status(500).json({ error: 'Error del servidor' });
        }
        res.json(results);
    });
});

// Obtener un solo producto por ID al seleccionar en home
app.get('/api/producto/:id', (req, res) => {
    const idProducto = req.params.id;

    const query = `
        SELECT 
            p.idProducto,
            p.nombreProducto,
            p.precio,
            p.descripcion,
            p.fotoProducto,
            u.Nombre AS nombreVendedor
        FROM Producto p
        JOIN Usuarios u ON p.idUsuario = u.idUsuario
        WHERE p.idProducto = ? AND p.isActive = TRUE
    `;

    bd.query(query, [idProducto], (err, results) => {
        if (err) {
            console.error("Error al obtener producto por ID:", err);
            return res.status(500).json({ error: 'Error del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(results[0]);
    });
});


// Documentación Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.1.0',
        info: {
            title: 'API Anahuarket',
            version: '1.0.0',
            description: 'API para la gestión de usuarios, productos y transacciones en Anahuarket',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['./server.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
