const { postWorker } = require("./controller");
const { authenticate, authorize } = require("../../middlewares");

const { Router } = require("express");

const router = Router();

router.post("", authenticate(false), authorize(), postWorker);

module.exports = router;
