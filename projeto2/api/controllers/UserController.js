/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	login : function(req, res) {
		return res.view();
	},

	profile : function(req, res) {
		return res.view();

		/*return res.view('backOffice/profile', {
			user: theUser,
			corndogs: theUser.corndogCollection
		});*/
	},

	create_users : function(req, res) {
		var users = [
			{ name : 'John', age : 23 },
			{ name : 'Mary', age : 22 },
			{ name : 'Gary', age : 30 },
			{ name : 'Char', age : 28 },
		]

		User.create(users).exec(function(err, users) {
			if (err) console.log(err)

			return res.json(users)
		})
	}

};

