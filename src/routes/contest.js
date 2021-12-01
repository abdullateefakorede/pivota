const ContestController = require('../controllers/contest');
const authMiddleware = require('../middlewares/auth');
const validatorMiddleware = require('../middlewares/validator');

const router = require('express').Router();

router.get('/host/:userId', ContestController.getContestsByUserId);
router.get('/', ContestController.getAllContests);
router.get('/:id/candidates', ContestController.getAllContestCandidates);
router.get('/:id', ContestController.getContestById);

router.put('/:id/vote', authMiddleware.authenticateUser, ContestController.castVote);
router.put('/:id/join', authMiddleware.authenticateUser, ContestController.joinContest);

router.post('/', authMiddleware.authenticateUser, validatorMiddleware.createContest, ContestController.createContest);

router.delete('/:id', authMiddleware.authenticateUser, ContestController.deleteContest);

module.exports = router;