const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const chatRoutes = require('./routes/chatRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.use('/mentors', mentorRoutes);
app.use('/api', chatRoutes);
app.use('/users', userRoutes);

io.on('connection', (socket) => {
  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
  });

  socket.on('sendMessage', async ({ conversationId, sender, text }) => {
    const Message = require('./models/Message');
    const msg = await Message.create({ conversationId, sender, text });
    io.to(conversationId).emit('newMessage', msg);
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connection established!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Kodmentor API working! 🚀");
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀  Server running on port ${PORT}`);
});
