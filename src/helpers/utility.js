const { Contest } = require('../../database/models');

exports.isOpenContest = async (contestId) => {
    const contest = await Contest.findByPk(contestId);
    return !contest.completed
}