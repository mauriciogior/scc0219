(function(angular) {
	'use strict';

	// Referencia para o nosso app
	var app = angular.module('app');

	// Cria um service chamado 'Group'
	app.factory('Group', [function() {  

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
				if (groups.onwer.email == user.email) {
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

		return Group;

	}]);

})(window.angular);