exports.getContestsFilter = (requestQuery) => {
	const { partner_id, country, source, page, size } = requestQuery;
	const filter = {};
	const limit = size ? +size : 10;
	const offset = page ? page * limit : 0;

	if (partner_id) { 
		filter.partner_id = partner_id;
	}
	if (country) {
		filter.country = country;
	}
	if (source) {
		filter.source = source;
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
