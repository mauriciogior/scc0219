(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de grupo
	app.controller('GroupController', ['$http', '$scope', 'User', 'Group',
	  function($http, $scope, User, Group) {

		$scope.user = User.getAuthenticated();
		
		// Group.findMyGroups($scope.user, function success(groups) {
		// 	$scope.groups = groups;
		// });

		Group.all(function success(groups) {
			var allGroups = []
			for(var i in groups) {
				if(groups[i].owner.id == $scope.user.id) {
					allGroups.push(groups[i]);
					continue;
				}
				for(var j in groups[i].users) {
					if(groups[i].users[j].id == $scope.user.id)
						allGroups.push(groups[i]);
				}
			}
			$scope.groups = allGroups;
		});

		User.all(function success(users) {
			$scope.users = users;
		});

		// Redireciona para a página de autenticação
		if (!$scope.user) {
			window.location = '/login';
		}

		// Salva novo grupo do usuario
		$scope.save = function() {
			var newUsers = [];

			for(var i in $scope.addUsers) {
				newUsers.push($scope.addUsers[i]);
			}

			// Dados necessários
			var data = {
				name	 : $scope.create.name,
				users  : newUsers,
				owner  : $scope.user
			};

			Group.create(data, function success(group) {
				window.location = '/groups';
			});
		}

		$scope.addUser = function(group) {
			var selectId = "s-" + group.id;
			var mySelect = document.getElementById(selectId);

			if (mySelect.selectedIndex == -1) return;

			var userId = mySelect.options[mySelect.selectedIndex].value;
			group = new Group(group);
			
			group.addUser({ id : userId }, function success(group) {
				Group.findMyGroups($scope.user, function success(groups) {
					$scope.groups = groups;
				});
			});
			window.location = '/groups';
		}

		$scope.allUsersInGroup = function(g) {
			return g.users.length + 1 == $scope.users.length;
		}

		$scope.removeUser = function(user, group) {
			group = new Group(group);

			group.removeUser(user, function success(group) {
				Group.findMyGroups($scope.user, function success(groups) {
					$scope.groups = groups;
				});
			});
			window.location = '/groups';
		}

		//Deleta grupo
		$scope.delete = function(group) {
			group = new Group(group);
			group.delete(function success(groups) {
				Group.findMyGroups($scope.user, function success(groups) {
					$scope.groups = groups;
				});
			});
			window.location = '/groups';
		}

	}]);

	app.controller('addUsersController', ['$scope', 'User', 'Group', function($scope, User, Group) {

	}]);

})(window.angular);
