import http from "node:http"
import express from "express"
import { Server } from "socket.io"
import path from "node:path"
import { kafkaClient } from "./kafka-client.js"

async function main(){

    const app = express()
    const server = http.createServer(app)
    const io = new Server(server)

    const kafkaProducer = kafkaClient.producer()
    await kafkaProducer.connect()


    const kafkaConsumer = kafkaClient.consumer({groupId: "socket-server-3000"})
    await kafkaConsumer.connect()

    await kafkaConsumer.subscribe({topics: ["location-update"], fromBeginning: true})

    kafkaConsumer.run({
        eachMessage: async({topic, partition, message, heartbeat}) =>{
            const data = JSON.parse(message.value.toString())

            console.log("KafkaConsumer data recieved", {data})
            io.emit("client:location:update", {id: data.id, latitude: data.latitude, longitude:data.longitude})

            await heartbeat()
        }
    })

    io.attach(server)
    app.use(express.static(path.resolve("./public")))

    app.get("/health", (req, res) =>{
        return res.json({status: "ok"})
    })

    io.on("connection", (socket)=>{
        console.log(socket.id, "connected success")

        socket.on("client:location:update", (locationData) =>{
            console.log(locationData?.latitude)
            console.log(locationData?.longitude)


            kafkaProducer.send({topic: "location-update", messages:[{
                key: socket.id, 
                value: JSON.stringify({id: socket.id, longitude:locationData.longitude, latitude:locationData.latitude})
            }]})
        })
    })


    server.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}

main()