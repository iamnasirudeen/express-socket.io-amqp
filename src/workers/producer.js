const BrokerManager = require("./brokerManager");

const sendRabbitMQ = async function sendRabbitMQ(queueName, data) {
  const channel = BrokerManager.getProducerChannel();

  const queue = queueName;

  await channel.assertExchange(queue, "fanout", { durable: false, confirm: true });
  await channel.publish(queue, "", Buffer.from(data), { persistent: false });

  await channel.assertQueue(queue, {
    durable: true
  });

  await channel.sendToQueue(queue, Buffer.from(data), { persistent: true });

  console.log(" [x] Sent %s", data);
};

module.exports = sendRabbitMQ;
