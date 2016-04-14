(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de grupo
	app.controller('GroupController', ['$scope', 'User', 'Group', function($scope, User, Group) {

		$scope.user = User.getAuthenticated();
		$scope.groups = Group.findMyGroups($scope.user);
		$scope.users = User.all();

		// Redireciona para a página de autenticação
		if (!$scope.user) {
			window.location = 'index.html';
		}

		// Salva novo grupo do usuario
		$scope.save = function() {
			var newUsers = [];
			for(var i in $scope.addUsers) {
				newUsers.push(User.findById($scope.addUsers[i]));
			}
			// Dados necessários
			var data = {
				id 		 : 'g_' + Math.floor(Date.now() / 1000),
				name	 : $scope.create.name,
				users 	 : newUsers,
				owner    : $scope.user
			};

			var group = new Group(data);
				group.save();

				window.location = 'groups.html';
		}

		$scope.addUser = function(g) {
			var selectId = "s-" + g.id;
			var mySelect = document.getElementById(selectId);

			if(mySelect.selectedIndex == -1) return;

			var userId = mySelect.options[mySelect.selectedIndex].value;
			var user = User.findById(userId);

			if(!Group.isInGroup(user, g))
				Group.addUser(user, g);
			else alert("Este usuário já pertence ao grupo");
		}

		$scope.allUsersInGroup = function(g) {
			return(g.users.length + 1 == $scope.users.length);
		}

		$scope.removeUser = function(user, group) {
			Group.removeUser(user, group);

			$scope.groups = Group.findMyGroups($scope.user);
		}

		//Deleta grupo
		$scope.delete = function(group) {
			Group.delete(group);

			$scope.groups = Group.findMyGroups($scope.user);
		}

	}]);

	app.controller('addUsersController', ['$scope', 'User', 'Group', function($scope, User, Group) {

	}]);

})(window.angular);
