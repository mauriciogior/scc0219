(function(angular) {
	'use strict';

	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria um service chamado 'User'
	app.factory('User', ['$http', 'Post', 'Group', function($http, Post, Group) {  

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

				$http({
					method: 'PUT',
					url: '/user',
					data: this
				}).then(function successCallback(response) {
					// Salva usuario
					User.setAuthenticated(response.data);

				}, function errorCallback(response) {
					// logout
					User.setAuthenticated(null);

					window.location = '/login';
				});

			},

			delete: function() {

				$http({
					method: 'DELETE',
					url: '/user',
					data: this
				}).then(function successCallback(response) {
					// logout
					User.setAuthenticated(null);

					window.location = '/login';
				}, function errorCallback(response) {
					// logout
					User.setAuthenticated(null);

					window.location = '/login';
				});

			},

			belongsTo: function(group) {
				return Group.isInGroup(this, group);
			},

			addGroup: function(groupId) {
				alert(groupId);
				alert(this.name);
				User.addGroup(this, groupId);
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

		// Autentica um usuario
		User.login = function(user, success, failure) {
			$http({
				method: 'POST',
				url: '/user/login',
				data: user
			}).then(function successCallback(response) {
				success(response);
			}, function errorCallback(response) {
				failure(response);
			});
		}

		// Cria um usuario
		User.create = function(user, success, failure) {
			$http({
				method: 'POST',
				url: '/user',
				data: user
			}).then(function successCallback(response) {
				success(response);
			}, function errorCallback(response) {
				failure(response);
			});
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

		// Define o usuário autenticado na sessão
		User.setAuthenticated = function(user) {
			localStorage.setItem('user', JSON.stringify(user));
		}

		// Retorna o usuário autenticado na sessão
		User.getAuthenticated = function() {
			return new User(JSON.parse(localStorage.getItem('user')));
		}

		return User;

	}]);

})(window.angular);
