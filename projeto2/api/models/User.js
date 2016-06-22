/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		name: {
			type: 'string',
			required: true,
			notNull: true
		},
		username: {
			type: 'string',
			required: true,
			unique: true
		},
		email: {
			type: 'string',
			unique: true
		},
		description: {
			type: 'string'
		},
		birthday: {
			type: 'string'
		},
		password: {
			type: 'string',
		},
		picture: {
			type: 'string'
		},
		posts: {
			collection: 'Post',
			via: 'owner'
		},
		followers: {
			collection: 'User',
			via: 'following'
		},
		following: {
			collection: 'User',
			via: 'followers'
		},
		groups: {
			collection: 'Group',
			via: 'users'
		},
		mygroups: {
			collection: 'Group',
			via: 'owner'
		}
	},

	autoPK: true
};

