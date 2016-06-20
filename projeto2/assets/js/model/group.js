(function(angular) {
	'use strict';

	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria um service chamado 'Group'
	app.factory('Group', ['$http', function($http, User) {  

		// Modelo do grupo
		function Group(data) {
			if (data) this.setData(data);
		};

		// Métodos do grupo
		Group.prototype = {

			setData: function(data) {
				angular.extend(this, data);
			},

			save: function() {
				var groups = Group.all();
				groups.push(this);
				localStorage.setItem('groups', JSON.stringify(groups));
			},

			delete: function(success, failure) {
				$http({
					method: 'DELETE',
					url: '/api/group/' + this.id
				}).then(function successCallback(response) {
					if (success) success(response.data);
				}, function errorCallback(response) {
					if (failure) failure(response);
				});
			},

			addUser: function(user, success, failure) {
				$http({
					method: 'PUT',
					url: '/api/group/' + this.id + '/users/' + user.id
				}).then(function successCallback(response) {
					if (success) success(response.data);
				}, function errorCallback(response) {
					if (failure) failure(response);
				});
			},

			removeUser: function(user, success, failure) {
				$http({
					method: 'DELETE',
					url: '/api/group/' + this.id + '/users/' + user.id
				}).then(function successCallback(response) {
					if (success) success(response.data);
				}, function errorCallback(response) {
					if (failure) failure(response);
				});
			}

		};

		// Métodos estáticos
		// Retorna todas as grupos
		Group.all = function(success, failure) {
			$http({
				method: 'GET',
				url: '/api/groups'
			}).then(function successCallback(response) {
				if (success) success(response.data);
			}, function errorCallback(response) {
				if (failure) failure(response);
			});
		}

		// Procura por grupos do usuário
		Group.findMyGroups = function(user, success, failure) {
			$http({
				method: 'GET',
				url: '/api/user/' + user.id + '/groups'
			}).then(function successCallback(response) {
				if (success) success(response.data);
			}, function errorCallback(response) {
				if (failure) failure(response);
			});
		}

		// Cria um grupo novo
		Group.create = function(group, success, failure) {
			$http({
				method: 'POST',
				url: '/api/group',
				data: group
			}).then(function successCallback(response) {
				if (success) success(response.data);
			}, function errorCallback(response) {
				if (failure) failure(response);
			});
		}

		Group.isInGroup = function(user, group) {
			if(group.owner.id == user.id)
				return true
			for(var i in group.users) {
					if(group.users[i].id == user.id)
						return true;
			}
			return false;
		}

		Group.findOwnerByEmail = function(email) {
			var groups = Group.all();
			var found = [];
			var equals = false;

			for (var i in groups) {
				if (groups[i].owner.email == email) found.push(posts[i]);
			}

			return found;
		}

		return Group;

	}]);

})(window.angular);
