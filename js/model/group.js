(function(angular) {
	'use strict';

	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria um service chamado 'Group'
	app.factory('Group', [function(User) {  

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

			delete: function() {
				Group.delete(this);
			}

		};

		// Métodos estáticos
		// Retorna todas as grupos
		Group.all = function() {
			var json = localStorage.getItem('groups') || '[]';
			return JSON.parse(json);
		}

		// Procura por grupos do usuário
		Group.findMyGroups = function(user) {
			var groups = Group.all();
			var found = [];
			var equals = false;

			for (var i in groups) {
				if (groups[i].owner.email == user.email) {
					equals = true;
				} else {
					for (var j in groups[i].users) {
						if (groups[i].users[j].email == user.email) {
							equals = true;
							break;
						}
					}
				}

				if (equals) found.push(groups[i]);
			}

			return found;
		}


		Group.addUser = function(user, group) {
			var json = localStorage.getItem('groups') || '[]';
			var groups = [];
			group.users.push(user);
			json = JSON.parse(json);

			for (var i in json) {
				if (json[i].id == group.id) groups.push(group);
				else groups.push(new Group(json[i]));
			}

			localStorage.setItem('groups', angular.toJson(groups));
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

		Group.removeUser = function(user, group) {
			var newData = {
				id 		 : group.id,
				name	 : group.name,
				users 	 : [],
				owner    : group.owner
			};
			for(var i in group.users) {
				if(group.users[i].id != user.id)
					newData.users.push(group.users[i]);
			}
			var newRemovedGroup = new Group(newData)

			var json = localStorage.getItem('groups') || '[]';
			var groups = [];
			json = JSON.parse(json);

			for (var i in json) {
				if (json[i].id == group.id) groups.push(newRemovedGroup);
				else groups.push(json[i]);
			}

			localStorage.setItem('groups', angular.toJson(groups));
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

		// Remove um grupo
		Group.delete = function(group) {
			var json = localStorage.getItem('groups') || '[]';
			var groups = [];
			json = JSON.parse(json);

			for (var i in json) {
				if (json[i].id == group.id) continue;
				groups.push(new Group(json[i]));
			}

			localStorage.setItem('groups', JSON.stringify(groups));
		}

		return Group;

	}]);

})(window.angular);
