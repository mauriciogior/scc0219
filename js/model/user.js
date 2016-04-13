(function(angular) {
	'use strict';

	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria um service chamado 'User'
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

		// Define o usuário autenticado na sessão
		User.setAuthenticated = function(user) {
			localStorage.setItem('user', user ? JSON.stringify(user) : null);
		}

		// Retorna o usuário autenticado na sessão
		User.getAuthenticated = function() {
			var user = localStorage.getItem('user');

			if (user) return new User(JSON.parse(user));
			return null;
		}

		return User;

	}]);

})(window.angular);
