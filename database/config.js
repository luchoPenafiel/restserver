require('dotenv').config();
const mogoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mogoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('=> Base de datos online');
  } catch (error) {
    console.log('=> Error al conectarse a la base de datos');
    console.log(error);
    throw new Error('Error al conectarse a la base de datos.');
  }
};

module.exports = { dbConnection };
