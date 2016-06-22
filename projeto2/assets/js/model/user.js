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
					url: '/api/user',
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

			loadImage: function() {
				return localStorage.getItem('image_u' + this.id);
			},

			storeImage: function(image) {
				localStorage.setItem('image_u' + this.id, image);
			},

			delete: function() {

				$http({
					method: 'DELETE',
					url: '/api/user',
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

			followUser: function(user, success, failure) {
				$http({
					method: 'PUT',
					url: '/api/user/' + this.id + '/follow/' + user.id
				}).then(function successCallback(response) {
					if (success) success(response.data);
				}, function errorCallback(response) {
					if (failure) failure(response);
				});

			},

			unfollowUser: function(user, success, failure) {
				$http({
					method: 'PUT',
					url: '/api/user/' + this.id + '/unfollow/' + user.id
				}).then(function successCallback(response) {
					if (success) success(response.data);
				}, function errorCallback(response) {
					if (failure) failure(response);
				});

			},

			isFollowing: function(user) {
				if (user.followers) {
					for (var i in user.followers) {
						if (user.followers[i].id == this.id) return true;
					}
				} else {
					for (var i in this.following) {
						if (this.following[i].id == user.id) return true;
					}
				}

				return false;
			},

			belongsTo: function(group) {
				return Group.isInGroup(this, group);
			}
		};

		User.isFollowing = function(from, to) {
			from = new User(from);
			return from.isFollowing(to);
		}

		// Métodos estáticos
		// Retorna todos os usuários
		User.all = function(success, failure) {
			$http({
				method: 'GET',
				url: '/api/user'
			}).then(function successCallback(response) {
				if (success) success(response.data);
			}, function errorCallback(response) {
				if (failure) failure(response);
			});
		}

		// Autentica um usuario
		User.login = function(user, success, failure) {
			$http({
				method: 'POST',
				url: '/api/user/login',
				data: user
			}).then(function successCallback(response) {
				if (success) success(response);
			}, function errorCallback(response) {
				if (failure) failure(response);
			});
		}

		// Cria um usuario
		User.create = function(user, success, failure) {
			$http({
				method: 'POST',
				url: '/api/user',
				data: user
			}).then(function successCallback(response) {
				if (success) success(response);
			}, function errorCallback(response) {
				if (failure) failure(response);
			});
		}

		// Procura por um determinado usuário
		// Ex: User.find({name : 'Mauricio'})
		User.find = function(query, success, failure) {
			$http({
				method: 'GET',
				url: '/api/user?query=' + query
			}).then(function successCallback(response) {
				if (success) success(response.data);
			}, function errorCallback(response) {
				if (failure) failure(response);
			});
		}

		// Procura por todos usuarios que contem as chave
		// Ex: User.find({name : 'Mauricio'})
		User.findAll = function(user, users) {
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
		User.findById = function(id, success, failure) {
			$http({
				method: 'GET',
				url: '/api/user/' + id
			}).then(function successCallback(response) {
				if (success) success(response.data);
			}, function errorCallback(response) {
				if (failure) failure(response);
			});
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
