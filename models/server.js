const express = require('express');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Database
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/user', require('../routes/user'));
  }

  start() {
    console.log(`=> Inicializando server`);

    this.app.listen(this.port, () => {
      console.log(`=> Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
