const { response } = require('express');
const { JWTGenerator } = require('../helpers/JWTGenerator');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');

const signin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: 'User or password incorrect.',
      });
    }

    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) {
      return res.status(400).json({
        error: 'User or password incorrect.',
      });
    }

    console.log('==> signin', user._id);

    const token = await JWTGenerator(user._id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const signup = async (req, res = response) => {
  const { name, lastName, email, password } = req.body;
  const user = { name, lastName, email, password };
  const newUser = new Usuario(user);

  // Verificar que el correo no exista
  const isEmail = await Usuario.findOne({ email });
  if (isEmail) {
    return res.status(400).json({
      error: 'Email already exist.',
    });
  }

  // Encriptar pass
  const salt = bcrypt.genSaltSync();
  newUser.password = bcrypt.hashSync(password, salt);

  // Save user
  await newUser.save();

  const token = await JWTGenerator(newUser._id);

  res.json({ user: newUser, token });
};

const logout = (req, res = response) => {
  res.send('logout');
};

module.exports = {
  signin,
  signup,
  logout,
};
