(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de navegação
	app.controller('NavbarController', ['$scope', 'User', function($scope, User) {

		$scope.user = User.getAuthenticated();

		// Redireciona para a página de autenticação
		if (!$scope.user) {
			window.location = '/login';
		}

		// Faz o logout
		this.logout = function() {
			User.setAuthenticated(null);
			window.location = '/login';
		}
		
	}]);

})(window.angular);
