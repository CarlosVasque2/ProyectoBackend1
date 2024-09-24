const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Configuración de Handlebars
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'hbs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

module.exports = { app, httpServer, io };
