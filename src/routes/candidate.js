const router = require('express').Router();
const validatorMiddleware = require('../middlewares/validator');
const CandidateController = require('../controllers/candidate');
const AuthService = require('../services/auth');

router.get('/signout', AuthService.signOut);

router.post('/signin', validatorMiddleware.signin, CandidateController.candidateSignIn);
router.post('/signup', validatorMiddleware.candidateSignUp, CandidateController.candidateSignUp);

module.exports = router;