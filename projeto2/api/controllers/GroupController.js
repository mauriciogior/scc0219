/**
 * GroupController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	// Carrega a view de grupos
	view_groups: function(req, res) {
		return res.view('user/groups');
	},

	// Cria um novo grupo
	api_create: function(req, res) {
		Group
		.create(req.body)
		.exec(function(err, group) {
			if (err || !group) {
				console.log(err);
				return res.status(400).json({});
			}

			return res.json(group)
		});

	},

	// Pega todos os grupos
	api_get: function(req, res) {

		Group
		.find()
		.populate('owner')
		.populate('users')
		.exec(function(err, groups) {
			if (err || !groups) {
				console.log(err);
				return res.status(400).json({});
			}

			return res.json(groups)
		});

	},

	// Adiciona usuario no grupo
	api_add_user: function(req, res) {
		var _group;

		Group
		.findOne({ id : req.params.gid })
		.then(function(group) {
			if (!group) {
				return res.status(400).json({});
			}

			group.users.add(req.params.uid);
			_group = group;

			return group.save();
		})
		.then(function() {
			return res.json(_group);
		})
		.catch(function(err) {
			console.log(err);

			return res.status(401).json({});
		});

	},

	// Remove usuario do grupo
	api_remove_user: function(req, res) {
		var _group;

		Group
		.findOne({ id : req.params.gid })
		.then(function(group) {
			if (!group) {
				return res.status(400).json({});
			}

			group.users.remove(req.params.uid);
			_group = group;

			return group.save();
		})
		.then(function() {
			return res.json(_group);
		})
		.catch(function(err) {
			console.log(err);

			return res.status(401).json({});
		});

	},

	// Remove grupo
	api_remove_group: function(req, res) {
		var _group;

		Group
		.destroy({ id : req.params.gid })
		.then(function() {
			return Group
				.find({ owner : req.params.uid })
				.populate('owner')
				.populate('users')
		})
		.then(function(groups) {
			return res.json(groups);
		})
		.catch(function(err) {
			console.log(err);

			return res.status(401).json({});
		});

	},

	// Pega todos os grupos do usuario
	api_user_groups: function(req, res) {

		Group
		.find({ owner : req.params.uid })
		.populate('owner')
		.populate('users')
		.exec(function(err, groups) {
			if (err || !groups) {
				console.log(err);
				return res.status(400).json({});
			}

			return res.json(groups)
		});

	}

};

