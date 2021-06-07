const { response } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');

const signin = (req, res = response) => {
  res.send('Login');
};

const signup = async (req, res = response) => {
  const { name, lastName, email, password } = req.body;
  const user = { name, lastName, email, password };
  const newUser = new Usuario(user);

  // TODO: verificar que el correo no exista

  // Encriptar pass
  const salt = bcrypt.genSaltSync();
  newUser.password = bcrypt.hashSync(password, salt);

  // Save user
  await newUser.save();

  res.json(newUser);
};

const logout = (req, res = response) => {
  res.send('logout');
};

module.exports = {
  signin,
  signup,
  logout,
};
