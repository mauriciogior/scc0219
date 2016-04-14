(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de grupo
	app.controller('GroupController', ['$scope', 'User', 'Group', function($scope, User, Group) {

		$scope.user = User.getAuthenticated();
		$scope.groups = Group.findMyGroups($scope.user);
		$scope.users = User.all();
		// $scope.groups = Group.all();

		// Redireciona para a página de autenticação
		if (!$scope.user) {
			window.location = 'index.html';
		}

		$scope.addUser = function(groupId) {
			var user = document.getElementById(groupId);
		}

		$scope.changeSelected = function(mySelect) {
		    alert(mySelect);
		}
		//Verifica se usuarios esta no grupo
		// $scope.isInGroup = function(user) {
		// 	return true;
		// }

		// Salva novo grupo do usuario
		$scope.save = function() {

			// Dados necessários
			var data = {
				id 		 : 'g_' + Math.floor(Date.now() / 1000),
				name	 : $scope.create.name,
				users 	 : [],
				owner    : $scope.user
			};

			var group = new Group(data);
				group.save();

				window.location = 'groups.html';
		}

		//Deleta grupo
		$scope.delete = function(group) {
			group.save();

			$scope.groups = Group.findMyGroups($scope.user);
		}

	}]);

})(window.angular);
