const { response } = require('express');
const Usuario = require('../models/user');

const signin = (req, res = response) => {
  res.send('Login');
};

const signup = async (req, res = response) => {
  const { name, lastName, email, password } = req.body;

  const user = { name, lastName, email, password };

  const newUser = new Usuario(user);

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
