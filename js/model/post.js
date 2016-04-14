(function(angular) {
	'use strict';

	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria um service chamado 'Post'
	app.factory('Post', [function() {  

		// Modelo da postagem
		function Post(data) {
			if (data) this.setData(data);
		};

		// Métodos da postagem
		Post.prototype = {

			setData: function(data) {
				angular.extend(this, data);
			},

			save: function() {
				var posts = Post.all();
				posts.push(this);
				localStorage.setItem('posts', JSON.stringify(posts));
			},

			delete: function() {
				Post.delete(this);
			}

		};

		// Métodos estáticos
		// Retorna todas as postagens
		Post.all = function() {
			var json = localStorage.getItem('posts') || '[]';
			var posts = [];
			json = JSON.parse(json);

			for (var i in json) {
				posts.push(new Post(json[i]));
			}

			return posts;
		}

		// Procura por uma determinada postagem
		// Ex: Post.findOne({id : 15})
		Post.findOne = function(post) {
			var posts = Post.all();
			var equals = false;

			for (var i in posts) {
				equals = false;

				for (var key in post) {
					if (!post.hasOwnProperty(key)) continue;
					if (!posts[i].hasOwnProperty(key)) continue;

					if (posts[i][key] != post[key]) {
						equals = false;
						break;
					} else {
						equals = true;
					}
				}

				if (equals) return posts[i];
			}

			return null;
		}

		// Procura por postagens de usuarios
		Post.findByEmail = function(email) {
			var posts = Post.all();
			var found = [];
			var equals = false;

			for (var i in posts) {
				if (posts[i].user.email == email) found.push(posts[i]);
			}

			return found;
		}

		// Procura por postagens
		// Ex: Post.find({userEmail : 'mcgiordalp@gmail.com'})
		Post.find = function(post) {
			var posts = Post.all();
			var found = [];
			var equals = false;

			for (var i in posts) {
				equals = false;

				for (var key in post) {
					if (!post.hasOwnProperty(key)) continue;
					if (!posts[i].hasOwnProperty(key)) continue;

					if (posts[i][key] != post[key]) {
						equals = false;
						break;
					} else {
						equals = true;
					}
				}

				if (equals) found.push(posts[i]);
			}

			return found;
		}

		// Remove um post
		Post.delete = function(post) {
			var json = localStorage.getItem('posts') || '[]';
			var posts = [];
			json = JSON.parse(json);

			for (var i in json) {
				if (json[i].id == post.id) continue;
				posts.push(new Post(json[i]));
			}

			localStorage.setItem('posts', JSON.stringify(posts));
		}

		return Post;

	}]);

})(window.angular);
