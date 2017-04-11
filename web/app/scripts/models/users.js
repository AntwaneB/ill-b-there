'use strict';

var Api = require('./api');

var Users = {};

// The secret key used to authenticate a user signing in
Users.secretKey = 'j9Y6iEbYDBCZjebCGd1Q4NvZop1ugLBLf1l5xEqE';

Users.signIn = function (args) {
  Api.post({
    path: '/oauth/token',
    data: {
      grant_type: 'password',
      client_id: 2,
      client_secret: Users.secretKey,
      scope: '',
      username: args.email,
      password: args.password
    },
    onsuccess: function (data) {
      Api.authenticate(data.access_token);
      args.onsuccess();
    },
    onerror: function (error) {
      args.onerror(error);
    }
  });
};

// Get the profile information of the currently-signed-in user
Users.getCurrentUser = function (args) {
  Api.get({
    path: '/api/users/profile',
    onsuccess: function (data) {
      if (args.onsuccess) {
        args.onsuccess(data);
      }
    },
    onerror: function (error) {
      if (args.onerror) {
        args.onerror(error);
      }
    }
  });
};

module.exports = Users;