const { Router } = require('express');
const { check } = require('express-validator');
const { signin, signup, logout } = require('../controllers/user');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post(
  '/signin',
  [
    check('email', 'email is required.').not().isEmpty(),
    check('email', 'Email not valid.').isEmail(),
    check('email', 'email is required.').not().isEmpty(),
    validateFields,
  ],
  signin
);
router.post(
  '/signup',
  [
    check('name', 'name is required.').not().isEmpty(),
    check('lastName', 'lastName is required.').not().isEmpty(),
    check('password', 'password is required.').not().isEmpty(),
    check('email', 'email is required.').not().isEmpty(),
    check('email', 'Email not valid.').isEmail(),
    validateFields,
  ],
  signup
);
router.get('/logout', logout);

module.exports = router;
