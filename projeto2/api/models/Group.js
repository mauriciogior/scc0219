/**
 * Group.js
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
		users: {
			collection: 'User',
			via: 'groups'
		},
		owner: {
			model: 'User'
		}
  },
  
	autoPK: true
};

