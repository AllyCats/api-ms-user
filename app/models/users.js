'use strict';

const db = require("../helpers/db");
const mysql = require("mysql");

let user = function(user){
	//this.id = user.id;
	this.created = user.created;
	this.updated = user.updated;
	this.uuid = user.uuid;
	this.avatar = user.avatar;
	this.nickName = user.nickName;
	//this.firstName = user.firstName;
	//this.lastName = user.lastName
	//this.email = user.email;
}

module.exports = user;

let select = `
SELECT
	id,
	created,
	updated,
	uuid,
	avatar,
	firstName,
	lastName,
	email,
	nickName
FROM users`

user.getUsers = async function (queryParams) {
	let where = ``;
	if(queryParams){
		where += ` WHERE id IS NOT NULL`;
		where += queryParams.email ? ` AND email = ${mysql.escape(queryParams.email)}` : ``;
		where += queryParams.password ? ` AND password = ${mysql.escape(queryParams.password)}` : ``;
		where += queryParams.uuid ? ` AND uuid = ${mysql.escape(queryParams.uuid)}` : ``;
	}

	let limit = ` LIMIT ` + (queryParams.limit ? mysql.escape(queryParams.limit) : `100`);
	
	return new Promise((resolve, reject) => {
			db.query(select + where + limit ,
					[],
					(err, results) => {
						if(err){
							console.error(err);
							reject({ message: 'Failed to get users: Unexpected database error' });
						}else{
							let users = [];
							for(let u of results){
								users.push(new user(u));
							}
							resolve(users);
						}
					}
			);
	});
}