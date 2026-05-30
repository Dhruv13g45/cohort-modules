import express from "express"
import http from "node:http"
import {Server} from "socket.io"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket)=>{
    console.log("socket connected successfully", socket.id)

    socket.on("client:message", (data)=>{
        console.log("message from client", data)

        socket.broadcast.emit("server:message", data)
    })
})

server.listen(8000, ()=>{
    console.log("Server running successfully!")
})