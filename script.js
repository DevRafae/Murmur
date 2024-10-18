// Defina a senha correta aqui
const correctPassword = '123'; // Alterar para sua senha

// Elementos de senha e chat
const passwordScreen = document.getElementById('password-screen');
const chatContainer = document.getElementById('chat-container');
const passwordInput = document.getElementById('password-input');
const passwordBtn = document.getElementById('password-btn');
const errorMessage = document.getElementById('error-message');

// Função para verificar a senha ao clicar no botão "Entrar"
passwordBtn.addEventListener('click', () => {
  const enteredPassword = passwordInput.value.trim();
  
  if (enteredPassword === correctPassword) {
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
  loadMessages(); // Carregar mensagens ao desbloquear o chat
}

// Chat funcionalidade
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Função para enviar a mensagem
function sendMessage() {
  const message = messageInput.value.trim();
  if (message !== '') {
    addMessageToChat(message, 'self');
    storeMessage(message, 'self');
    messageInput.value = ''; // Limpa o campo de entrada após enviar
  }
}

// Adicionando evento de clique ao botão Enviar
sendBtn.addEventListener('click', sendMessage);

// Adicionando evento para enviar com a tecla "Enter"
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();  // Impede a ação padrão de "Enter"
    sendMessage();  // Chama a função de enviar
  }
});

// Função para adicionar a mensagem ao chat
function addMessageToChat(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (sender === 'self') {
    messageElement.classList.add('self');
  } else {
    messageElement.classList.add('other');
  }
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Rolagem automática para a última mensagem
}

// Função para armazenar a mensagem no localStorage
function storeMessage(message, sender) {
  let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
  chatHistory.push({ message, sender });
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Carrega mensagens armazenadas localmente ao iniciar
function loadMessages() {
  const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
  chatHistory.forEach((msgObj) => {
    addMessageToChat(msgObj.message, msgObj.sender);
  });
}

// Remover o chat armazenado ao fechar a janela
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('chatHistory');
});
