const { response } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const signin = (req, res = response) => {
  res.send('Login');
};

const signup = async (req, res = response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

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
