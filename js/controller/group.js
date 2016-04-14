(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de grupo
	app.controller('GroupController', ['$scope', 'User', 'Group', function($scope, User, Group) {

		$scope.user = User.getAuthenticated();
		$scope.groups = Group.all();

		// Redireciona para a página de autenticação
		if (!$scope.user) {
			window.location = 'index.html';
		}

		this.group = Group.findMyGroups($scope.user);

		// Salva novo grupo do usuario
		$scope.save = function() {

			// Dados necessários
			var data = {
				name	 : $scope.create.name,
				users 	 : [],
				owner    : $scope.user
			};

			var group = new Group(data);
				group.save();

				window.location = 'groups.html';
		}
	}]);

})(window.angular);
