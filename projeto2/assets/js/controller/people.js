(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de pessoas
	app.controller('PeopleController', ['$scope', 'User', function($scope, User) {

		$scope.authUser = User.getAuthenticated();

		// Redireciona para a página de autenticação
		if (!$scope.authUser) {
			window.location = '/';
			return;
		}

		User.all(function success(users) {
			$scope.users = users;
		});

		this.searchPeople = function() {
			$scope.key_aux = $scope.key;
			$scope.peoplefound = User.findAll({name : $scope.key});
		}

		this.follow = function(user) {
			alert(user.name);
		}

	}]);

})(window.angular);
