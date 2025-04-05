const express =require ('express');
const http = require('http');
const { Server }= require('socket.io');
const cors = require ('cors');
const mongoDbConnection = require('./database/db');
const pingRoute = require("././routes/ping");


require('dotenv').config()

const app = express();

mongoDbConnection();
const server = http.createServer(app);

const io = new Server( server,{
    cors :{ origin : "https://localhost:3000", methods :['POST', 'GET']}
})

app.use(cors());
app.use(express.json());

const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'Pong from backend' });
});
  


io.on("connection", (socket)=>{
    console.log("new User is Connected", socket.id)
    socket.emit("welcome", "Connected to socket server");

    socket.on("joinRoom", ({roomId})=>{
        socket.join(roomId)
    });

    socket.on("sendingmessage",(data)=>{
        io.to(data.roomId).emit("recieved message", data)
    });

    socket.on("disconnect", ()=>{
        console.log('user connected.')
    })
});

server.listen(process.env.PORT , ()=>{
    console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
})

 