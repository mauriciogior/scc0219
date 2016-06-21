/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	// Carrega a view de feed do usuario
	view_feed: function(req, res) {
		return res.view('post/feed');
	},

	// Cria um novo post
	api_create: function(req, res) {
		req.body.owner = req.params.uid;

		Post
		.create(req.body)
		.exec(function(err, post) {
			if (err || !post) {
				console.log(err);
				return res.status(400).json({});
			}

			return res.json(post)
		});

	},

	// Altera um post
	api_edit: function(req, res) {
		var _post;

		Post
		.findOne({ id : req.params.id })
		.then(function(post) {
			if (!post) {
				return res.status(401).json({});
			} else {
				if (req.body.title) post.title  = req.body.title;
				if (req.body.text) post.text  = req.body.text;

				_post = post;

				return post.save();
			}
		})
		.then(function() {
			return res.json(_post);
		})
		.catch(function(err) {
			console.log(err);

			return res.status(401).json({});
		});
	},

	// Remove um post
	api_delete: function(req, res) {
		Post
		.destroy({ id : req.params.id })
		.then(function() {
			return res.json({});
		})
		.catch(function(err) {
			console.log(err);

			return res.status(401).json({});
		});
	},

	// Carrega os posts do usuario
	api_feed: function(req, res) {
		Post
		.find({ owner : req.params.uid })
		.populate('owner')
		.exec(function(err, posts) {
			if (err || !posts) {
				console.log(err);
				return res.status(400).json({});
			}
			return res.json(posts)
		});

	}

};

