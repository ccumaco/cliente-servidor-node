const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;

app.use(cors());
app.use(express.json());

const respuestasBot = {
  hola: '¡Hola! ¿Cómo estás?',
  'como estas': 'Estoy bien, gracias por preguntar 😊',
  'que haces': 'Estoy aquí para ayudarte a chatear en tiempo real.',
  adios: '¡Hasta luego! 👋',
  gracias: '¡De nada! 😃',
};

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado:', socket.id);

  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);
    io.emit('mensaje', data);

    // Respuesta automática del bot si detecta una palabra clave
    const mensajeMinusculas = data.toLowerCase();
    for (let clave in respuestasBot) {
      if (mensajeMinusculas.includes(clave)) {
        setTimeout(() => {
          io.emit('mensaje', `🤖 Bot: ${respuestasBot[clave]}`);
        }, 1000);
        break;
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor WebSocket corriendo en http://localhost:${PORT}`);
});
