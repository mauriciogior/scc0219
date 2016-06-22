(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de pessoas
	app.controller('PeopleController', ['$scope', 'User', function($scope, User) {

		$scope.authUser = User.getAuthenticated();
		$scope.User = User;

		// Redireciona para a página de autenticação
		if (!$scope.authUser) {
			window.location = '/';
			return;
		}

		$scope.refresh = function() {
			User.all(function success(users) {
				$scope.users = users;
			});
		}

		this.searchPeople = function() {
			$scope.key_aux = $scope.key;
			var usersFound;
			User.all(function sucess(user) {
				$scope.peoplefound = User.findAll({name : $scope.key}, user);
			}, function failure() {
				window.location = '/people';
			});
			
		}

		this.follow = function(user) {
			$scope.authUser.followUser(user, function success() {
				$scope.refresh();
			})
		}

		this.unfollow = function(user) {
			$scope.authUser.unfollowUser(user, function success() {
				$scope.refresh();
			})
		}

		$scope.refresh();

	}]);

})(window.angular);
