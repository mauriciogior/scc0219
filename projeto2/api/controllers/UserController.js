/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	view_login : function(req, res) {
		return res.view('user/login');
	},

	view_profile : function(req, res) {
		return res.view('user/profile');
	},

	view_people : function(req, res) {
		return res.view('user/people');
	},

	// Pega todos os usuarios
	api_get: function(req, res) {

		User
		.find()
		.populate('following')
		.populate('followers')
		.exec(function(err, users) {
			if (err || !users) {
				console.log(err);
				return res.status(400).json({});
			}

			return res.json(users)
		});

	},

	// Cria um novo usuario
	api_create: function(req, res) {

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

	// Procura por um usuario
	api_find_by_id: function(req, res) {

		User
		.findOne({ id : req.params.id })
		.exec(function(err, user) {
			if (err || !user) {
				console.log(err);
				return res.status(404).json({});
			}

			return res.json(user)
		});

	},

	// Altera um usuario
	api_edit: function(req, res) {
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

	// Segue um usuario
	api_follow: function(req, res) {
		var _user;

		User
		.findOne({ id : req.params.uid })
		.then(function(user) {
			if (!user) {
				return res.status(401).json({});
			} else {
				user.following.add(req.params.fid);
				_user = user;

				return user.save();
			}
		})
		.then(function() {
			return res.json(_user);
		})
		.catch(function(err) {
			return res.status(401).json({});
		});
	},

	// Segue um usuario
	api_unfollow: function(req, res) {
		var _user;

		User
		.findOne({ id : req.params.uid })
		.then(function(user) {
			if (!user) {
				return res.status(401).json({});
			} else {
				user.following.remove(req.params.fid);
				_user = user;

				return user.save();
			}
		})
		.then(function() {
			return res.json(_user);
		})
		.catch(function(err) {
			return res.status(401).json({});
		});
	},

	// Remove um usuario
	api_delete: function(req, res) {
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
  api_login: function(req, res) {

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

