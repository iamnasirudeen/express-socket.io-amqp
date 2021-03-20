const EventEmitter = require("events");

function net() {
  this.emitEvent = this.emitEvent.bind(this);
  this.onConnection = this.onConnection.bind(this);
}

net.prototype = EventEmitter.prototype;

net.prototype.createServer = function(cb) {
  if (typeof cb === "function") process.nextTick(cb);
  return this;
};

net.prototype.emitEvent = function() {
  this.emit("listening", { port: this.port });
};

net.prototype.onConnection = function() {
  this.emit("connection");
};

net.prototype.listen = function(port) {
  this.port = port;
  process.nextTick(this.onConnection);
  process.nextTick(this.emitEvent);
  return this;
};

const netServer = new net();

netServer.on("connection", (conn) => {
  console.log("server connected successfuly");
});

netServer.createServer();

netServer.listen(8080);

netServer.on("listening", ({ port }) => console.log("Listening on port %s", port));
