(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de autenticação
	app.controller('ProfileController', ['$scope', 'User', function($scope, User) {

		$scope.user = User.getAuthenticated();

		// Redireciona para a página de autenticação
		if (!$scope.user) {
			window.location = 'index.html';
		}

		// Salva perfil do usuario
		$scope.save = function() {
			var user = User.getAuthenticated();

			user.name      = $scope.user.name;
			user.email     = $scope.user.email;
			user.bio       = $scope.user.bio;
			user.birthDate = $scope.user.birthDate;
			user.password  = $scope.user.password;
			user.picture   = $scope.user.picture;

			user.save();

			User.setAuthenticated(user);

			window.location = 'profile.html';
		}

		// Salva perfil do usuario
		$scope.delete = function() {
			var user = User.getAuthenticated();
			user.delete();

			User.setAuthenticated(null);

			window.location = 'index.html';
		}

	}]);

})(window.angular);
