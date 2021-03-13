const sendMessagaToQueue = require("./producer");
const consumer = require("./consumer");

const queue = process.argv[2];
const data = process.argv[3];

sendMessagaToQueue(queue, JSON.stringify(data));
consumer(queue);
