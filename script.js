// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, push } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://murmur-716ee-default-rtdb.europe-west1.firebasedatabase.app/", // Adicione sua URL aqui
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elementos da tela de senha e do chat
const passwordScreen = document.getElementById('password-screen');
const chatContainer = document.getElementById('chat-container');
const passwordInput = document.getElementById('password-input');
const passwordBtn = document.getElementById('password-btn');
const errorMessage = document.getElementById('error-message');

// Função para verificar a senha ao clicar no botão "Entrar"
passwordBtn.addEventListener('click', () => {
    const enteredPassword = passwordInput.value.trim();
    if (enteredPassword === '123') { // Altere para sua senha
        unlockChat();
    } else {
        errorMessage.textContent = 'Senha incorreta. Tente novamente.';
        passwordInput.value = '';
    }
});

// Função que desbloqueia o chat e esconde a tela de senha
function unlockChat() {
    passwordScreen.style.display = 'none';
    chatContainer.classList.remove('hidden');

    // Carregar mensagens do Firebase
    loadMessages();
}

// Elementos do chat
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Função para enviar a mensagem
function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        const messageObj = { text: message, sender: 'self' };
        push(ref(db, 'messages'), messageObj); // Enviar mensagem para o Firebase
        messageInput.value = ''; // Limpa o campo de entrada
    }
}

// Adicionando evento de clique ao botão Enviar
sendBtn.addEventListener('click', sendMessage);

// Enviar mensagem ao pressionar a tecla "Enter"
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Função para adicionar a mensagem ao chat
function addMessageToChat(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message.text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Rolagem automática para a última mensagem
}

// Carregar mensagens do Firebase
function loadMessages() {
    const messagesRef = ref(db, 'messages');
    onChildAdded(messagesRef, (data) => {
        const message = data.val();
        addMessageToChat(message);
    });
}
