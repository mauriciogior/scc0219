(function(angular) {
	'use strict';

	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria um service chamado 'User'
	app.factory('User', ['Post', 'Group', function(Post, Group) {  

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
			},

			delete: function() {
				var posts  = Post.findByEmail(this.email);
				var groups = [];//Group.findByEmail(this.email);

				for (var i in posts) posts[i].delete();
				for (var i in groups) groups[i].delete();

				User.delete(this);
			},

			belongsTo: function(group) {
				return Group.isInGroup(this, group);
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

		// Procura por um determinado usuário via id
		User.findById = function(id) {
			var users = User.all();

			for (var i in users) {
				if (users[i].id == id) return users[i];
			}

			return null;
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

})(window.angular);
