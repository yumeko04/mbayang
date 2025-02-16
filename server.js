const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Servir les fichiers statiques (HTML, CSS, etc.)
app.use(express.static(__dirname));

// Gérer les connexions des clients
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('chat message', (data) => {
        console.log('Message reçu : ', data);
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté');
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

// Gérer proprement l'arrêt du serveur
process.on('SIGINT', () => {
    console.log('\nFermeture du serveur...');
    server.close(() => {
        console.log('Serveur fermé proprement.');
        process.exit(0);
    });
});
