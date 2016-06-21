/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /** Views **/
  'get /':        'UserController.view_profile',
  'get /profile': 'UserController.view_profile',
  'get /login':   'UserController.view_login',
  'get /feed':    'PostController.view_feed',
  'get /people':  'UserController.view_people',
  'get /groups':  'GroupController.view_groups',

  /** APIs **/
  'get /api/user':                  'UserController.api_get',
  'post /api/user':                 'UserController.api_create',
  'get /api/user/:id':              'UserController.api_find_by_id',
  'put /api/user':                  'UserController.api_edit',
  'delete /api/user':               'UserController.api_delete',
  'post /api/user/login':           'UserController.api_login',
  'put /api/user/:uid/follow/:fid': 'UserController.api_follow',
  'put /api/user/:uid/unfollow/:fid': 'UserController.api_unfollow',

  'get /api/user/:uid/feed':  'PostController.api_feed',
  'post /api/user/:uid/post': 'PostController.api_create',
  'put /api/post/:id':        'PostController.api_edit',
  'delete /api/post/:id':     'PostController.api_delete',

  'get /api/groups':                   'GroupController.api_get',
  'post /api/group':                   'GroupController.api_create',
  'get /api/user/:uid/groups':         'GroupController.api_user_groups',
  'put /api/group/:gid/users/:uid':    'GroupController.api_add_user',
  'delete /api/group/:gid/users/:uid': 'GroupController.api_remove_user',
  'delete /api/group/:gid':            'GroupController.api_remove_group'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
