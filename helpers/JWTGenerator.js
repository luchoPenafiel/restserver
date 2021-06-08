const jwt = require('jsonwebtoken');

const JWTGenerator = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.PRIVETE_KEY,
      {
        expiresIn: '1h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Token not generated');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { JWTGenerator };
