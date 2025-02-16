// Connexion au serveur Socket.io
const socket = io();

// Sélection des éléments HTML
const messageInput = document.getElementById('messageInput');
const messagesList = document.getElementById('messages');
const sendButton = document.getElementById('sendButton');

// Envoyer un message au serveur
sendButton.addEventListener('click', () => {
    sendMessage();
});

// Permettre d'envoyer avec la touche "Entrée"
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Fonction pour envoyer un message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        socket.emit('chat message', message); // Envoi du message au serveur
        messageInput.value = ''; // Effacer le champ après l'envoi
    }
}

// Recevoir un message du serveur et l'afficher
socket.on('chat message', (message) => {
    const li = document.createElement('li');
    li.textContent = message;
    messagesList.appendChild(li);
});



