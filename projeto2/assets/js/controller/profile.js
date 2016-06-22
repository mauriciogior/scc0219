(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de autenticação
	app.controller('ProfileController', ['$scope', '$location', 'User', function($scope, $location, User) {

		$scope.authUser = User.getAuthenticated();

		// Redireciona para a página de autenticação
		if (!$scope.authUser) {
			window.location = '/login';
		}

		// Verifica o hash
		var location = $location.url() || '/me';
		$location.url(location);

		// Usuario atual
		if (location == '/me') {
			$scope.user = $scope.authUser;

			// Salva perfil do usuario
			$scope.save = function() {
				var user = User.getAuthenticated();

				user.id        = $scope.user.id;
				user.name      = $scope.user.name;
				user.email     = $scope.user.email;
				user.bio       = $scope.user.bio;
				user.birthDate = $scope.user.birthDate;
				user.password  = $scope.user.password;
				user.picture   = 'image_u' + user.id;

				if ($scope.user.picture)
					user.storeImage($scope.user.picture);
				
				user.save();
			}

			// Salva perfil do usuario
			$scope.delete = function() {
				var user = User.getAuthenticated();
				user.delete();

				User.setAuthenticated(null);

				window.location = '/login';
			}

		} else {
			var userId = location.slice(1, location.length);
			
			User.findById(userId,
				function success(user) {
					$scope.user = new User(user);
				},
				function failure(user) {
					window.location = '/';
				}
			);
		}
	}]);

})(window.angular);
