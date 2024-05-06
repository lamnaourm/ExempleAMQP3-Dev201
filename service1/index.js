import amqp from 'amqplib'
import express from 'express'

const app = express()
app.use(express.text())
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
})

app.get('/test', (req, res) => {

    channel.sendToQueue(qName, Buffer.from(req.body.toString()))
    res.end()
})

app.listen(process.env.port)