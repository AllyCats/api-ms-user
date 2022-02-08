'use strict';
module.exports = function(app) {
  const usersController = require('./controllers/users');

   /* Update the entire workout */
   app.route('/users')
    .get(usersController.getUsers);
}