(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de autenticação
	app.controller('AuthController', ['$scope', 'User', function($scope, User) {

		// Redireciona para a página autenticada
		if (User.getAuthenticated()) {
			window.location = 'profile.html';
		}

		// Faz login do usuário
		this.verify = function() {

			// Login via email e senha
			var data = {
				email    : $scope.login.email,
				password : $scope.login.password
			};

			// Procura usuário no banco de dados
			var user = User.find(data) || false;

			// Se o usuário existir, autentica
			if (user) {
				User.setAuthenticated(user);

				window.location = 'profile.html';
			}

			// Caso o contrário, exibe mensagem de erro
			else {
				// TODO
				alert('Email ou senha incorretos!');
			}
		}

		// Faz cadastro do usuário
		this.create = function() {

			// Dados necessários
			var data = {
				id       : 'u_' + Math.floor(Date.now() / 1000),
				name		 : $scope.create.name,
				email    : $scope.create.email,
				password : $scope.create.password,
				followers: [],
				following: [], 
				groups: []
			};

			// Verifica se o email existe
			var exists = User.find({ email : $scope.create.email }) || false;
			
			// Caso já exista, exibe mensagem de erro
			if (exists) {
				// TODO
				alert('Email já existe!');

			}

			// Cria o usuário e autentica
			else {
				var user = new User(data);
				user.save();

				User.setAuthenticated(user);

				window.location = 'profile.html';
			}
		}

	}]);

})(window.angular);
