const express = require('express');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.connectDB();
    this.routes();
  }

  async connectDB() {
    
    await dbConnection();
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('Hello World');
    });
  }

  start() {
    console.log(`=> Inicializando server`);

    this.app.listen(this.port, () => {
      console.log(`=> Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
