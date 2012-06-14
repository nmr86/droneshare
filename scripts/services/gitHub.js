// Generated by CoffeeScript 1.3.3
/*global define
*/

define(['libs/angular', 'services/services', 'services/message'], function(angular, services) {
  'use strict';
  return services.factory('gitHub', [
    '$resource', 'message', function($resource, message) {
      var activity, get, repos;
      repos = {
        result: {}
      };
      activity = $resource('https://api.github.com/users/:user/repos', {
        callback: 'JSON_CALLBACK'
      }, {
        get: {
          method: 'JSONP'
        }
      });
      get = function(criteria, success, failure) {
        return repos.result = activity.get({
          user: criteria
        }, function(Resource, getResponseHeaders) {
          message.publish('search', {
            source: 'GitHub',
            criteria: criteria
          });
          if (angular.isFunction(success)) {
            return success.apply(this, arguments);
          }
        }, failure);
      };
      return {
        get: get,
        repos: repos
      };
    }
  ]);
});
