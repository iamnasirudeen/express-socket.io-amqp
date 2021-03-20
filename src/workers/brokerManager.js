//const ManagerBase = require("../socket/userManager");

class ManagerBase {
  constructor() {
    return this.createInstance.call(this, arguments);
  }

  getInstance() {
    return this.instance;
  }

  initInstance(constructorArgs) {}

  createInstance() {
    if (this.instance && this.instance instanceof this) {
      return this.getInstance();
    } else {
      this.initInstance.call(this, arguments);
      this.instance = this;
    }
  }
}

class BrokerManager extends ManagerBase {
  constructor(connectionInstance) {
    return super(connectionInstance);
  }

  createProducerChannel() {
    this.publisherConnectionInstance.createChannel(
      (error, channel) => (this.producerChannel = channel)
    );
  }

  getProducerChannel() {
    return this.producerChannel;
  }

  setPublisherConnectionInstance(connectionInstance) {
    this.publisherConnectionInstance = connectionInstance;
  }

  getPublisherConnectionInstance() {
    return this.publisherConnectionInstance;
  }

  setConsumerConnectionInstance(connectionInstance) {
    this.consumerConnectionInstance = connectionInstance;
  }

  getConsumerConnectionInstance() {
    return this.consumerConnectionInstance;
  }

  initInstance(connectionInstance) {
    super.initInstance(connectionInstance);
    this.publisherConnectionInstance = connectionInstance;
    this.consumerConnectionInstance = connectionInstance;
  }
}

module.exports = new BrokerManager();
