const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	// mongoose automatically adds the `_id` field
	name: { type: String, required: true, trim: true, },
	username: { type: String, required: true, trim: true, unique: true }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = {
	addUser,
	getUsers,
	getUserById,
	updateUser,
};

/**
 * Takes `user` object, adds to DB, and returns promise.
 * @param {Object} userObject - user object with `name` and `username` properties
 */
function addUser(userObject) {
	return User.create(userObject)
		.then(newUser => {
			return newUser;
		});
};

function getUsers() {
  return User.find();
  	// .select('favoriteList username _id name');
};

function getUserById(id) {
	return User.findById(id);
};

function updateUser(id, changes) {
	return getUserById(id)
		.then(doc => {
			if (!doc) return null;
			for (let [key, value] of Object.entries(changes)) {
				doc[key] = value;
			}
			return doc.save();
		})
};
