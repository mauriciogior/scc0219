(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de autenticação
	app.controller('AuthController', ['$scope', 'User', function($scope, User) {

		// Redireciona para a página autenticada
		var user = User.getAuthenticated();

		if (user && user.id) {
			window.location = '/';
		}

		// Faz login do usuário
		this.verify = function() {
			// Login via email e senha
			var data = {
				email    : $scope.login.email,
				password : $scope.login.password
			};

			// Procura usuário no banco de dados
			User.login(data,
				function success(user) {
					// Se o usuário existir, autentica
					if (user) {
						User.setAuthenticated(user.data);

						window.location = '/';
					}
				},
				function failure(err) {
					console.log('err');
					console.log(err);
					alert('Email ou senha incorretos!');
				}
			);
		}

		// Faz cadastro do usuário
		this.create = function() {

			// Dados necessários
			var data = {
				name		 : $scope.create.name,
				email    : $scope.create.email,
				password : $scope.create.password
			};

			// Tenta criar um novo usuario na API
			User.create(data,
				function success(user) {
					if (user) {
						User.setAuthenticated(user.data);

						window.location = '/';
					}
				},
				function failure(err) {
					alert('Email já existe!');
				}
			);
		}

	}]);

})(window.angular);
