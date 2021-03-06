(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de postagem
	app.controller('FeedController', ['$http', '$scope', '$location', 'User', 'Post',
	function($http, $scope, $location, User, Post) {

		$scope.authUser = User.getAuthenticated();
		$scope.Post = Post;

		// Redireciona para a página de autenticação
		if (!$scope.authUser) {
			window.location = '/login';
			return;
		}

		if(window.location.pathname == '/feed') {
			User.all(function sucess(user) {
				var users = [];
				for(var i in user) {
					for(var j in user[i].followers) {
						if(user[i].followers[j].id == $scope.authUser.id)
							users.push(user[i]);
					}
				}
				$scope.users = users;

				var allPosts = [];
				for(var i in $scope.users) {
					Post.findByUserId($scope.users[i].id, function success(posts) {
						for(var j in posts) {
							allPosts.push(posts[j]);
						}
					}, function failure() { });
				}
				$scope.posts = allPosts;

			}, function failure() {
				window.location = '/profile';
			});

		} else {
			// Verifica o hash
			var location = $location.url() || '/me';
			$location.url(location);

			// Usuario atual
			if (location == '/me') {
				$scope.user = $scope.authUser;

				Post.findByUserId($scope.user.id, function success(posts) {
					$scope.posts = posts;
				}, function failure() { });

			// Algum outro usuario
			} else {
				var userId = location.slice(1, location.length);
				User.findById(userId, function success(user) {
					$scope.user = user;
				}, function failure() {
					window.location = '/feed';
				});
				
				Post.findByUserId(userId, function success(posts) {
					$scope.posts = posts;
				}, function failure() { });
			}
		}

		$scope.create = function() {

			if ($scope.create.text == '' || !$scope.create.text || $scope.create.title == '' || !$scope.create.title) return;

			// Dados necessários
			var data = {
				title: $scope.create.title,
				text : $scope.create.text
			};

			Post.create(data, $scope.user, function success(post) {
				console.log(post);
				$scope.posts.push(post);
				$scope.create.text = '';
				$scope.create.title = '';
			}, function failure() {
				$scope.create.text = '';
				$scope.create.title = '';
			});

		}

		$scope.delete = function(post) {
			var _post = new Post(post);
			_post.delete(function success() {
				var _old = $scope.posts;
				$scope.posts = [];

				for (var i in _old) {
					if (_old[i].id != _post.id) $scope.posts.push(_old[i]);
				}
			}, function failure() {

			});
		}

		$scope.openEdit = function(post) {
			$scope.vOpenEdit = post.id;
		}

		$scope.cancelEdit = function(post) {
			$scope.vOpenEdit = null;
		}

		$scope.like = function(post) {
			var _post = new Post(post);
			_post.like($scope.authUser, function success(p) {
				window.location = '/feed';
			});
		}

		$scope.dislike = function(post) {
			var _post = new Post(post);
			_post.dislike($scope.authUser, function success(p) {
				window.location = '/feed';
			});
		}

		$scope.share = function(post) {
			var _post = new Post(post);
			_post.share($scope.authUser, function success(p) {
				window.location = '/feed';
			});
		}

		$scope.edit = function(post) {
			var newTitle = document.getElementById("title-" + post.id);
			var newText = document.getElementById("text-" + post.id);
			if (newText.value=='' || newTitle.value=='') { 
				var r = confirm("Essa ação irá deletar seu post. Aperte OK para prosseguir.");
				if (r) $scope.delete(post);
				else {
					$scope.cancelEdit(post);
					window.location = '/feed';
					return;
				}
			}

			post.title = newTitle.value;
			post.text = newText.value;
			
			var _post = new Post(post);
			_post.save(function success(post) {
				$scope.cancelEdit(post);
			}, function failure(res) {
				$scope.cancelEdit(post);
			});
		}

	}]);

})(window.angular);
