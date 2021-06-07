const { Router } = require('express');
const { check } = require('express-validator');
const { signin, signup, logout } = require('../controllers/user');

const router = Router();

router.post('/signin', signin);
router.post('/signup', [check('email', 'Email not valid.').isEmail()], signup);
router.get('/logout', logout);

module.exports = router;
