import amqp from 'amqplib'
import express from 'express'

const app = express()
var connection, channel;
const qName = "File-Attente1"

const connectRabbitMQ = async () => {
    const ch = process.env.url_rabbit
    connection = await amqp.connect(ch)
    channel = await connection.createChannel()
    channel.assertQueue(qName)
}

connectRabbitMQ().then(() => {
    console.log('Connected to RabbitMq')

    channel.consume(qName, (data) => {
        console.log(`Mon Message ${data.content.toString()}`)
        channel.ack(data)
    })
})



app.listen(process.env.port)