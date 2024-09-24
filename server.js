const { httpServer, io } = require('./app');
const PORT = 8080;

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('addProduct', (product) => {
        io.emit('productAdded', product);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


