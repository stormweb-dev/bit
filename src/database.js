const db = require(`quick.db`);

db.eco = {
	get: (guild, user, account) => {
		return db.get(`economy.${guild}.${user}.${account}`) || 0;
	},
	add: (guild, user, amount, account = "wallet") => {
		return db.add(`economy.${guild}.${user}.${account}`, amount);
	},
	remove: (guild, user, amount, account = "wallet") => {
		return db.subtract(`economy.${guild}.${user}.${account}`, amount);
	},
	reset: (guild, user) => {
		return db.delete(`economy.${guild}${user ? `.${user}` : ``}`);
	},
};

module.exports = db;
