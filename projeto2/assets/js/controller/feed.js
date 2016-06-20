(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de postagem
	app.controller('FeedController', ['$scope', '$location', 'User', 'Post',
	function($scope, $location, User, Post) {

		$scope.authUser = User.getAuthenticated();

		// Redireciona para a página de autenticação
		if (!$scope.authUser) {
			window.location = 'index.html';
			return;
		}

		// Verifica o hash
		var location = $location.url() || '/me';
		$location.url(location);

		// Usuario atual
		if (location == '/me') {
			$scope.user = $scope.authUser;
			$scope.posts = Post.findByEmail($scope.user.email);

		// Algum outro usuario
		} else {
			var userId = location.slice(1, location.length);
			$scope.user = User.findById(userId);

			if (!$scope.user) {
				window.location = 'index.html';
				return;
			}

			$scope.posts = Post.findByEmail($scope.user.email);
		}

		$scope.create = function() {

			if ($scope.create.text == '' || !$scope.create.text) return;

			// Dados necessários
			var data = {
				id   : 'p_' + Math.floor(Date.now() / 1000),
				text : $scope.create.text,
				user : $scope.user
			};

			var post = new Post(data);
			post.save();

			$scope.posts = Post.findByEmail($scope.user.email);
			$scope.create.text = '';
		}

		$scope.delete = function(post) {
			post.delete();

			$scope.posts = Post.findByEmail($scope.user.email);
		}

		$scope.openEdit = function(post) {
			$scope.vOpenEdit = post.id;
		}

		$scope.cancelEdit = function(post) {
			$scope.vOpenEdit = null;
		}

		$scope.edit = function(post) {
			var newText = document.getElementById(post.id);
			if(newText.value=='') { 
				var r = confirm("Essa ação irá deletar seu post. Aperte OK para prosseguir.");
				if(r) $scope.delete(post);
				else {
					$scope.cancelEdit(post);
					window.location = 'feed.html';
					return;
				}
			}

			Post.edit(post, newText.value);
			$scope.cancelEdit(post);
			window.location = 'feed.html';
		}

	}]);

})(window.angular);
