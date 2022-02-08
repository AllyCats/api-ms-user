const usersModel = require("../models/users");

exports.getUsers = async function(req, res) {
	const users = await usersModel.getUsers(req.queryParams).catch((error) => {
		console.error(error);
		res.status(500).json(error);
	});

	if(users){
		res.json(users);
	}
}