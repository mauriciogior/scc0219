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

	// Cria um novo usuario
	user_create: function(req, res) {

		var user = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		};

		User
		.create(user)
		.exec(function(err, user) {
			if (err || !user) {
				console.log(err);
				return res.status(400).json({});
			}

			return res.json(user)
		});

	},

	// Altera um usuario
	user_edit: function(req, res) {
		var _user;

		User
		.findOne({ email : req.body.email, password : req.body.password })
		.then(function(user) {
			if (!user) {
				return res.status(401).json({});
			} else {
				if (req.body.name)  user.name  = req.body.name;
				if (req.body.email) user.email = req.body.email;
				if (req.body.bio)   user.bio   = req.body.bio;
				if (req.body.birthDate) user.birthDate = req.body.birthDate;
				if (req.body.password)  user.password  = req.body.password;

				_user = user;

				return user.save();
			}
		})
		.then(function() {
			return res.json(_user);
		})
		.catch(function(err) {
			console.log(err);

			return res.status(401).json({});
		});
	},

	// Remove um usuario
	user_delete: function(req, res) {
		var _user;

		User
		.destroy({ email : req.body.email, password : req.body.password })
		.then(function() {
			return res.json({});
		})
		.catch(function(err) {
			console.log(err);

			return res.status(401).json({});
		});
	},

	// Faz login do usuario
  user_login: function(req, res) {

  	User
  	.findOne({ email : req.body.email, password : req.body.password })
  	.exec(function(err, user) {
  		if (err || !user) {
  			console.log(err);
  			return res.status(401).json({});
  		}

			return res.json(user);
  	});

  }

};

