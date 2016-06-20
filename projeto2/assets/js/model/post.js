(function(angular) {
	'use strict';

	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria um service chamado 'Post'
	app.factory('Post', ['$http', function($http) {  

		// Modelo da postagem
		function Post(data) {
			if (data) this.setData(data);
		};

		// Métodos da postagem
		Post.prototype = {

			setData: function(data) {
				angular.extend(this, data);
			},

			save: function(success, failure) {

				$http({
					method: 'PUT',
					url: '/api/post/' + this.id,
					data: this
				}).then(function successCallback(response) {
					success(response.data);
				}, function errorCallback(response) {
					failure(response);
				});

			},

			delete: function(success, failure) {

				$http({
					method: 'DELETE',
					url: '/api/post/' + this.id
				}).then(function successCallback(response) {
					success(response.data);
				}, function errorCallback(response) {
					failure(response);
				});

			}

		};

		// Cria um post
		Post.create = function(post, user, success, failure) {
			$http({
				method: 'POST',
				url: '/api/user/' + user.id + '/post',
				data: post
			}).then(function successCallback(response) {
				success(response.data);
			}, function errorCallback(response) {
				failure(response);
			});
		}

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
		Post.findByUserId = function(uid, success, failure) {
			$http({
				method: 'GET',
				url: '/api/user/' + uid + '/feed'
			}).then(function successCallback(response) {
				success(response.data);
			}, function errorCallback(response) {
				failure(response);
			});
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

		Post.edit = function(post, newText) {
			var json = localStorage.getItem('posts') || '[]';
			var posts = [];
			json = JSON.parse(json);

			for (var i in json) {
				if (json[i].id == post.id) { 
					json[i].text = newText;
				}
				posts.push(new Post(json[i]));
			}

			localStorage.setItem('posts', JSON.stringify(posts));
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
