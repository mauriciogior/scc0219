(function(angular) {
	'use strict';
	
	// Referencia para o nosso app
	var app = angular.module('app');

	app.factory('User', [function() {  

		// Modelo do usuário
		function User(data) {
			if (data) this.setData(data);
		};

		// Métodos do usuário
		User.prototype = {

			setData: function(data) {
				angular.extend(this, data);
			},

			save: function() {
				var users = User.all();
				var user = User.findById(this.id);

				if (user) {
					users.splice(users.indexOf(user), 1);
				}
				
				users.push(this);
				localStorage.setItem('users', JSON.stringify(users));
			}
		};

		// Métodos estáticos
		// Retorna todos os usuários
		User.all = function() {
			var json = localStorage.getItem('users') || '[]';
			var users = [];
			json = JSON.parse(json);

			for (var i in json) {
				users.push(new User(json[i]));
			}

			return users;
		}

		// Procura por um determinado usuário
		// Ex: User.find({name : 'Mauricio'})
		User.find = function(user) {
			var users = User.all();
			var equals = false;

			for (var i in users) {
				equals = false;

				for (var key in user) {
					if (!user.hasOwnProperty(key)) continue;
					if (!users[i].hasOwnProperty(key)) continue;

					if (users[i][key] != user[key]) {
						equals = false;
						break;
					} else {
						equals = true;
					}
				}

				if (equals) return users[i];
			}

			return null;
		}

		// Procura por todos usuarios que contem as chave
		// Ex: User.find({name : 'Mauricio'})
		User.findAll = function(user) {
			var users = User.all();
			var equals = false;
			var usersFound = [];

			for (var i in users) {
				equals = false;

				for (var key in user) {
					if (!user.hasOwnProperty(key)) continue;
					if (!users[i].hasOwnProperty(key)) continue;

					if (users[i][key].toLowerCase() != user[key].toLowerCase()) {
						equals = false;
					} else {
						equals = true;
					}
				}

				if (equals) usersFound.push(users[i]);;
			}

			return usersFound;
		}

		// Procura por um determinado usuário via id
		User.findById = function(id) {
			var users = User.all();

			for (var i in users) {
				if (users[i].id == id) return users[i];
			}

			return null;
		}

		User.addGroup = function(user, groupId) {
			var json = localStorage.getItem('users') || '[]';
			var users = [];
			json = JSON.parse(json);

			for (var i in json) {
				if (json[i].id == user.id) {
					json[i].groups.push(groupId);
				}
				users.push(new User(json[i]));
			}

			localStorage.setItem('users', JSON.stringify(users));
		}

		// Remove um usuário
		User.delete = function(user) {
			var json = localStorage.getItem('users') || '[]';
			var users = [];
			json = JSON.parse(json);

			for (var i in json) {
				if (json[i].email == user.email) continue;
				users.push(new User(json[i]));
			}

			localStorage.setItem('users', JSON.stringify(users));
		}

		// Define o usuário autenticado na sessão
		User.setAuthenticated = function(user) {
			localStorage.setItem('userId', user ? user.id : '');
		}

		// Retorna o usuário autenticado na sessão
		User.getAuthenticated = function() {
			var userId = localStorage.getItem('userId');

			if (userId && userId != '') return new User(User.findById(userId));
			return null;
		}

		return User;

	}]);

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
