const sendMessagaToQueue = require("../../../workers/producer");
const consumer = require("../../../workers/consumer");
const { success, error } = require("../../libs/response");

const postWorker = async (req, res, next) => {
  await sendMessagaToQueue("workerQueue", JSON.stringify(req.body));
  // Register consumer
  consumer("workerQueue");

  return res.status(201).json(success({ message: "Queue published successfuly" }, 201));
};

module.exports = { postWorker };
