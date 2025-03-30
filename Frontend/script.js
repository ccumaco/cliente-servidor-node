const socket = io('http://localhost:3000');

socket.on('mensaje', (data) => {
  const chat = document.getElementById('chat');
  const mensajeElemento = document.createElement('li');

  if (data.startsWith('🤖 Bot:')) {
    mensajeElemento.classList.add('bot-message');
  } else {
    mensajeElemento.classList.add('user-message');
  }

  mensajeElemento.textContent = data;
  chat.appendChild(mensajeElemento);
  chat.scrollTop = chat.scrollHeight; // Hacer scroll automático hacia abajo
});

function enviarMensaje() {
  const input = document.getElementById('mensaje');
  const mensaje = input.value;

  if (mensaje.trim() !== '') {
    socket.emit('mensaje', mensaje);
    input.value = ''; // Limpiar input
  }
}
