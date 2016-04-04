(function(angular) {
    'use strict';

    var app = angular.module('app');

    app.factory('User', [function() {  

        function User(data) {
            if (data) this.setData(data);
        };

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

        User.all = function() {
            var json = localStorage.getItem('users') || '[]';
            return JSON.parse(json);
        }

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

        User.setAuthenticated = function(user) {
            localStorage.setItem('user', user ? JSON.stringify(user) : null);
        }

        User.getAuthenticated = function() {
            var user = localStorage.getItem('user');

            if (user) return JSON.parse(user);
            return null;
        }

        return User;

    }]);

})(window.angular);
