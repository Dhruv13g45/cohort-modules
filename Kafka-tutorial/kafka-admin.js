import { kafkaClient } from "./kafka-client.js";

async function setup(){
    const admin = kafkaClient.admin()

    await admin.connect()

    console.log("Success connection")

    await admin.createTopics({
        topics:[
            {
                topic: "location-update", numPartitions: 2
            }
        ]
    })

    await admin.disconnect()
}

setup()