(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria o controlador de autenticação
	app.controller('ProfileController', ['$scope', 'User', function($scope, User) {

		$scope.user = User.getAuthenticated();

		// Redireciona para a página de autenticação
		if (!$scope.user) {
			window.location = 'index.html';
		}

		// Salva perfil do usuario
		this.save = function() {

			// Dados necessários
			var data = {
				name		 : $scope.create.name,
				email    : $scope.create.email,
				password : $scope.create.password
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
