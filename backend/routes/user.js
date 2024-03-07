const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users')
const auth = require('../middlewares/auth')


router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;