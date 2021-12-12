const { User, Contest, Candidate, Voter } = require('../../database/models');
const responseHelper = require('../helpers/response');
const errorHelper = require('../helpers/error');
const queryHelper = require('../helpers/query');
const { isOpenContest } = require('../helpers/utility');

class ContestController {

	static async getContestById(req, res) {
		try {
			const contest = await Contest.findByPk(req.params.id);
			if (!contest) {
				return errorHelper.handleError('NO_CONTEST_FOUND', res);
			}
			return responseHelper.sendSuccessResponse(res, { contest }, 'CONTEST_FOUND');
		} catch (error) {
			return errorHelper.handleError(error, res);
		}
	}

	static async getContestsByUserId(req, res) {
		try {
			const contests = await Contest.findAll({ where: { user_id: req.params.userId } });
			if (!contests.length) {
				return errorHelper.handleError('NO_CONTEST_AVAILABLE', res);
			}
			return responseHelper.sendSuccessResponse(res, { contests }, 'CONTESTS_FOUND');
		} catch (error) {
			return errorHelper.handleError(error, res);
		}
	}

	static async getAllContests(req, res) {
		try {
			const { filter, limit, offset } = queryHelper.getContestsFilter(req.query);
			const { count, rows } = await Contest.findAndCountAll({ where: filter, offset, limit });
			const contests = queryHelper.getPaginationData(count, rows, req.query.page, limit);
			if (!contests) {
				return errorHelper.handleError('NO_CONTEST_AVAILABLE', res);
			}
			return responseHelper.sendSuccessResponse(res, { contests }, 'SUCCESS');
		} catch (error) {
			return errorHelper.handleError(error, res);
		}
	}

	static async getAllContestCandidates(req, res) {
		try {
			const candidates = await Candidate.findAll({ where: { contest_id: req.params.id }, attributes: { exclude: ['password'] } });
			if (!candidates.length) {
				return errorHelper.handleError('NO_CONTESTANT_FOUND_FOR_THIS_CONTEST', res);
			}
			return responseHelper.sendSuccessResponse(res, { candidates }, 'SUCCESS');
		} catch (error) {
			return errorHelper.handleError(error, res);
		}
	}

	static async joinContest(req, res) {
		try {
			const contest = await Contest.findByPk(req.params.id);
			if (!contest) {
				return errorHelper.handleError('NO_CONTEST_FOUND', res);
			}
			if (!isOpenContest(req.params.id)) {
				return errorHelper.handleError('CONTEST_HAS_ENDED', res);
			}
			const candidate = await Candidate.findOne({ where: { email: req.user.email }, attributes: { exclude: ['password'] } });
			if (!candidate) {
				return errorHelper.handleError('NOT_AUTHORIZED', res);
			}
			if (candidate.contest_id && await isOpenContest(candidate.contest_id)) {
				return errorHelper.handleError('USER_ALREADY_IN_AN_ONGOING_CONTEST', res);
			}
			await contest.increment('totalContestant');
			await candidate.update({ contest_id: req.params.id });
			return responseHelper.sendSuccessResponse(res, { candidate }, 'SUCCESS');
		} catch (error) {
			return errorHelper.handleError(error, res);
		}
	}

	static async castVote(req, res) {
		try {
			const contest = await Contest.findByPk(req.params.id);
			if (!contest) {
				return errorHelper.handleError('NO_CONTEST_FOUND', res);
			}
			if (!isOpenContest(req.params.id)) {
				return errorHelper.handleError('CONTEST_HAS_ENDED', res);
			}
			const candidate = await Candidate.findOne({ where: { email: req.body.email } });
			const voter = await Voter.findOne({ where: { email: req.user.email } });
			if (!voter) {
				return errorHelper.handleError('NO_ACCOUNT_FOUND', res);
			}
			if (candidate.contest_id !== contest.id) {
				return errorHelper.handleError('CANDIDATE_NOT_IN_FOR_THIS_CONTEST', res);
			}
			if (voter.voted && isOpenContest(candidate.contest_id)) {
				return errorHelper.handleError('ALREADY_VOTED', res);
			}
			await candidate.increment('vote');
			await voter.update({ voted: true });
			await contest.increment('totalVote');
			await contest.reload();
			return responseHelper.sendSuccessResponse(res, { contest }, 'SUCCESS');
		} catch (error) {
			return errorHelper.handleError(error, res);
		}
	}

	static async createContest(req, res) {
		try {
			const user = await User.findOne({ where: { email: req.user.email } });
			if (!user) {
				return errorHelper.handleError('NOT_AUTHORIZED', res);
			}
			const newContest = {
				contestName: req.body.contestName,
				user_id: req.user.id
			};
			const contest = await Contest.create(newContest);
			return responseHelper.sendSuccessResponse(res, { contest }, 'SUCCESS');
		} catch (error) {
			return errorHelper.handleError(error, res);
		}
	}

	static async deleteContest(req, res) {
		try {
			const contest = await Contest.findByPk(req.params.id);
			if (!contest) {
				return errorHelper.handleError('INVALID_CONTEST_ID', res);
			}
			if (contest.user_id !== req.user.id) {
				return errorHelper.handleError('NOT_AUTHORIZED', res);
			}
			await contest.destroy();
			return responseHelper.sendSuccessResponse(res, {}, 'DATA_SUCCESSFULLY_DELETED');
		} catch (error) {
			return errorHelper.handleError(error, res);
		}
	}
}

module.exports = ContestController;