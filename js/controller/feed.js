(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de postagem
	app.controller('FeedController', ['$scope', 'User', 'Post', function($scope, User, Post) {

		$scope.user = User.getAuthenticated();

		// Redireciona para a página de autenticação
		if (!$scope.user) {
			window.location = 'index.html';
		}

		this.posts = Post.findByEmail($scope.user.email);
	}]);

})(window.angular);
