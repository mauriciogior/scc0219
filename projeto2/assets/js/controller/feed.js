(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de postagem
	app.controller('FeedController', ['$http', '$scope', '$location', 'User', 'Post',
	function($http, $scope, $location, User, Post) {

		$scope.authUser = User.getAuthenticated();

		// Redireciona para a página de autenticação
		if (!$scope.authUser) {
			window.location = '/login';
			return;
		}

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

		$scope.create = function() {

			if ($scope.create.text == '' || !$scope.create.text) return;

			// Dados necessários
			var data = {
				text : $scope.create.text
			};

			Post.create(data, $scope.user, function success(post) {
				console.log(post);
				$scope.posts.push(post);
				$scope.create.text = '';
			}, function failure() {
				$scope.create.text = '';
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

		$scope.edit = function(post) {
			var newText = document.getElementById(post.id);
			if (newText.value=='') { 
				var r = confirm("Essa ação irá deletar seu post. Aperte OK para prosseguir.");
				if (r) $scope.delete(post);
				else {
					$scope.cancelEdit(post);
					window.location = '/feed';
					return;
				}
			}

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
