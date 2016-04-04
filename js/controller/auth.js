(function(angular) {
	'use strict';
	
	var app = angular.module('app');

	app.controller('AuthController', ['$scope', 'User', function($scope, User) {

		if (User.getAuthenticated()) {
			alert('Você já está autenticado!');
		}

		this.verify = function() {
			var data = {
				email    : $scope.login.email,
				password : $scope.login.password
			};

			var user = User.find(data) || false;

			if (user) {
				User.setAuthenticated(user);

				// TODO
				alert('Autenticado!');

			} else {
				// TODO
				alert('Email ou senha incorretos!');
			}
		}

		this.create = function() {
			var data = {
				name		 : $scope.create.name,
				email    : $scope.create.email,
				password : $scope.create.password
			};

			var exists = User.find({ email : $scope.create.email }) || false;
			
			if (exists) {
				// TODO
				alert('Email já existe!');

			} else {
				var user = new User(data);
				user.save();

				User.setAuthenticated(user);

				// TODO
				alert('Criado e autenticado!');
			}
		}

	}]);

})(window.angular);
