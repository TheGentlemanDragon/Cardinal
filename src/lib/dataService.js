'use strict';

angular
  .module('cardinal')
  .factory(
    'DataService',
    [ '$resource', DataService ]);

function DataService ($resource) {

  // Cached resources for use as singletons
  var resources = {};

  // Return the resource requested by name
  return function (resource) {

    // If this resource hasn't been cached, create and cache it
    if (!(resource in resources)) {
      resources[resource] = $resource(
        'http://localhost:8888/' + resource + '/:id',
        { id: '@_id' },
        {
          search: { method: 'POST', params: { id: 'search' }, isArray: true }
        }
      );
    }

    return resources[resource];
  };
}
