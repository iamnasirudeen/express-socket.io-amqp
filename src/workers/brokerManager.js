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
    this.connectionInstance.createChannel((error, channel) => (this.producerChannel = channel));
  }

  getProducerChannel() {
    return this.producerChannel;
  }

  setPublisherConnectionInstance(connectionInstance) {
    this.connectionInstance = connectionInstance;
  }

  getPublisherConnectionInstance() {
    return this.connectionInstance;
  }

  setConsumerConnectionInstance(connectionInstance) {
    this.connectionInstance = connectionInstance;
  }

  getConsumerConnectionInstance() {
    return this.connectionInstance;
  }

  initInstance(connectionInstance) {
    super.initInstance(connectionInstance);
    this.connectionInstance = connectionInstance;
  }
}

module.exports = new BrokerManager();
