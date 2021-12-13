exports.getContestsFilter = (requestQuery) => {
	const { category_id, user_id, page, size } = requestQuery;
	const filter = {};
	const limit = size ? +size : 10;
	const offset = page ? page * limit : 0;

	if (category_id) { 
		filter.category_id = category_id;
	}
	if (user_id) {
		filter.user_id = user_id;
	}

	return { filter, limit, offset };
};

exports.getPaginationData = (totalItems, data, page, limit) => {
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);
	return { totalItems, totalPages, currentPage, limit, data };
};

exports.hidePassword = (data) => {
	const user = {...data};
	delete user.password;
	return user;
};
