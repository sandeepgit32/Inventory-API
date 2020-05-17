exports.successResponse200 = (res, data) => {
	var content = {
		status: 1,
		count: data.length,
		data: data
	};
	return res.status(200).json(content);
};

exports.createdResponse201 = (res, msg, data) => {
	var content = {
		status: 1,
		message: msg,
		data: data
	};
	return res.status(201).json(content);
};

exports.ErrorResponse500 = (res, msg) => {
	var content = {
		status: 0,
		message: msg,
	};
	return res.status(500).json(content);
};

exports.notFoundResponse404 = (res, msg) => {
	var content = {
		status: 0,
		message: msg,
	};
	return res.status(404).json(content);
};

exports.validationError400 = (res, msg) => {
	var content = {
		status: 0,
		message: msg,
	};
	return res.status(400).json(content);
};

exports.unauthorizedResponse401 = (res, msg) => {
	var content = {
		status: 0,
		message: msg,
	};
	return res.status(401).json(content);
};