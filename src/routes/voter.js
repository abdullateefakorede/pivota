const router = require('express').Router();
const VoterController = require('../controllers/voter');
const validatorMiddleware = require('../middlewares/validator');
const AuthService = require('../services/auth');

router.get('/signout', AuthService.signOut);

router.post('/signin', validatorMiddleware.signin, VoterController.voterSignIn);
router.post('/signup', validatorMiddleware.voterSignUp, VoterController.voterSignUp);

module.exports = router;