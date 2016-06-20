/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoincrement: true,
			unique: true
		},
		name: {
			type: 'string',
			required: true,
			notNull: true
		},
		email: {
			type: 'string',
			unique: true
		},
		bio: {
			type: 'string'
		},
		birthDate: {
			type: 'string'
		},
		password: {
			type: 'string',
		},
		picture: {
			type: 'string'
		},
		posts: {
			colletion: 'Post',
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
	}
};

