import * as net from 'net';

const connect = () => {
  var client = new net.Socket();
  client.connect(4053, '127.0.0.1', function () {
    console.log('Connected');

    setInterval(() => {
      client.write('Hello, server! Love, Client.');
    }, 1000);
  });

  client.on('data', function (data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
  });

  client.on('close', function () {
    console.log('Connection closed');
  });

}

export { connect };