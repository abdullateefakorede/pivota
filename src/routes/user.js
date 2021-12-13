const router = require('express').Router();
const UserController = require('../controllers/user');
const validatorMiddleware = require('../middlewares/validator');
const AuthService = require('../services/auth');

router.get('/signout', AuthService.signOut);

router.post('/signin', validatorMiddleware.signin, UserController.userSignIn);
router.post('/signup', validatorMiddleware.userSignUp, UserController.userSignUp);

module.exports = router;