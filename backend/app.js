const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const { getTrendAnalysis, getProcessStatus } = require('./dashboardQueries');
const { getUsers } = require('./userQueries');
const { getProjects } = require('./projectQueries');
const { authenticate } = require('./authQueries');

const app = express();

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '@SebaNi208865064210901',
  database: 'jordb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ruta para obtener el análisis de tendencias
app.get('/api/dashboard/trend-analysis', async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const data = await getTrendAnalysis(pool, year);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener el estado de los procesos
app.get('/api/dashboard/process-status', async (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().split('T')[0];
    const data = await getProcessStatus(pool, date);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await getUsers(pool);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener proyectos
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await getProjects(pool);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para autenticación
app.post('/api/auth', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authenticate(pool, username, password);
    if (user) {
      res.json({ message: 'Autenticación exitosa', user });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/api/ping', async (req, res) => {
  try {
    // Verificamos la conexión a la base de datos con una consulta simple
    const [rows] = await pool.query('SELECT 1');
    res.json({ message: 'pong', dbStatus: 'Connection successful' });
  } catch (error) {
    res.status(500).json({ message: 'Database connection error', error: error.message });
  }
});