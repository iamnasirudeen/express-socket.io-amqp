const BrokerManager = require("./brokerManager");

const receiver = function(queueName) {
  const connection = BrokerManager.getConsumerConnectionInstance();

  connection.createChannel(async (error, channel) => {
    if (error) console.log(error);

    const queue = queueName;

    await channel.assertExchange(queue, "fanout", { durable: false, confirm: true });
    channel.assertQueue("", { exclusive: true }, async function(err, q) {
      if (err) {
        throw new Error(err);
      }

      await channel.bindQueue(q.queue, queue, "");

      console.log(" [*] Waiting for stockData messages in %s. To exit press CTRL+C", queue);

      try {
        async function handleConsumer(data) {
          let response = JSON.parse(data.content.toString());

          if (Object.keys(response).length !== 0) {
            console.log(" [x] Received Stock:", response);

            // positively acknowledge all deliveries up to
            // this delivery tag

            await channel.ack(data, true);

            // await channel.close();
            //await connection.close();
            return null;
          } else {
            // you can requeue the delivery by changing false to true
            channel.reject(data, false);
          }
        }

        channel.consume(queue, handleConsumer, {
          noAck: false
        });
      } catch (error) {
        // requeue all unacknowledged deliveries up to
        // this delivery tag
        channel.nack(error, true, true);
        await channel.close();
      }
    });
  });
};

module.exports = receiver;
