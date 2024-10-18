// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, push } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDFhgQe2FpCg96kKlbOVF42M2uGq9hxBOs",
    authDomain: "murmur-716ee.firebaseapp.com",
    databaseURL: "https://murmur-716ee-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "murmur-716ee",
    storageBucket: "murmur-716ee.appspot.com",
    messagingSenderId: "486719637452",
    appId: "1:486719637452:web:7ad9c90834969ced90ff69"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elementos da tela
const userSelectionScreen = document.getElementById('user-selection-screen');
const passwordScreen = document.getElementById('password-screen');
const chatContainer = document.getElementById('chat-container');
const passwordInput = document.getElementById('password-input');
const passwordBtn = document.getElementById('password-btn');
const errorMessage = document.getElementById('error-message');

// Elementos do chat
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Variável para armazenar o usuário escolhido
let currentUser = '';

// Função para escolher o usuário
document.getElementById('JB-btn').addEventListener('click', () => {
    currentUser = 'JB';
    showPasswordScreen();
});
document.getElementById('Sable-btn').addEventListener('click', () => {
    currentUser = 'Sable';
    showPasswordScreen();
});

// Mostra a tela de senha
function showPasswordScreen() {
    userSelectionScreen.style.display = 'none';
    passwordScreen.style.display = 'flex'; // Exibe a tela de senha
}

// Verificar a senha ao clicar no botão "Entrar"
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
    chatContainer.style.display = 'flex'; // Exibe a tela de chat
    loadMessages();
}

// Função para enviar a mensagem com o nome do usuário e horário
function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Obtém o horário atual
        const messageObj = { text: `${currentUser}: ${message}`, sender: currentUser, time: timestamp }; // Adiciona o timestamp
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

    // Adiciona o horário da mensagem abaixo do texto
    const timeElement = document.createElement('div');
    timeElement.classList.add('message-time'); // Classe para estilização
    timeElement.textContent = message.time; // Define o horário da mensagem
    messageElement.appendChild(timeElement); // Adiciona o horário ao elemento da mensagem

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Rolagem automática para a última mensagem
}

// Função para carregar mensagens do Firebase
function loadMessages() {
    const messagesRef = ref(db, 'messages');
    onChildAdded(messagesRef, (data) => {
        const message = data.val();
        addMessageToChat(message);
    });
}
