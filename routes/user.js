const { Router } = require('express');
const { signin, signup, logout } = require('../controllers/user');

const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/logout', logout);

module.exports = router;
