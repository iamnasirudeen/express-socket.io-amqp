const disconnect = require("./disconnect");

module.exports = (io, socket) => {
  const listeners = [disconnect];

  listeners.forEach((listener) => {
    listener(io, socket);
  });
};
