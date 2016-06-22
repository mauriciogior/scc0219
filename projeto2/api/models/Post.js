/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

 	attributes: {
		originalId: {
			model: 'Post'
		},
		title: {
			type: 'string',
			required: true,
			notNull: true
		},
		text: {
			type: 'string',
			required: true,
			notNull: true
		},
		owner: {
			model: 'User'
		},
		likes: {
			collection: 'User',
			via: 'likes'
		},
		dislikes: {
			collection: 'User',
			via: 'dislikes'
		},
		shares: {
			collection: 'User',
			via: 'shares'
		}
  },
  
	autoPK: true
};

