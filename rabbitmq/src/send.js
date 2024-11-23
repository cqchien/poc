import * as amqp from "amqplib";
import * as fs from "fs";

ssl();

async function ssl() {
  try {
    // Load SSL certificates
    const sslOptions = {
      cert: fs.readFileSync("./ssl/client_cert.pem"),
      key: fs.readFileSync("./ssl/client_key.pem"),
      ca: [fs.readFileSync("./ssl/ca_cert.pem")],
      rejectUnauthorized: true, // Ensure this is true for production
    };

    // Connection URL with SSL
    const connectionURL = "amqps://admin:admin@localhost:5671/";

    // Connect to RabbitMQ
    const connection = await amqp.connect(connectionURL, sslOptions);
    console.log("Connected to RabbitMQ with SSL");

    // Create a channel
    const channel = await connection.createChannel();
    console.log("Channel created");

    var queue = "hello";
    var msg = "Hello World!";
    channel.assertQueue(queue, {
      durable: false,
      arguments: { "x-message-ttl": 5000000 },
    });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(" [x] Sent %s", msg);
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
    console.log("Connection closed");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}
