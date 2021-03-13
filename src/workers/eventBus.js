const amqp = require("amqplib/callback_api");
const { promisify } = require("util");
const eventBus = promisify(amqp.connect).bind(amqp);
const rabbitUrl = "amqp://localhost";
const BrokerManager = require("./brokerManager");

async function init() {
  try {
    const publisherConnection = await eventBus(rabbitUrl);
    const consumerConnection = await eventBus(rabbitUrl);
    BrokerManager.setPublisherConnectionInstance(publisherConnection);
    BrokerManager.setConsumerConnectionInstance(consumerConnection);

    BrokerManager.createProducerChannel();
  } catch (error) {
    console.log(error);
  }
}

module.exports = init;
