module.exports = DataService;

DataService.$inject = ['$resource', 'AuthService'];

function DataService ($resource, AuthService) {

  // Cached resources for use as singletons
  var resources = {};

  // Return the resource requested by name
  return Service;

  ////////////

  function Service (resource) {

    // If this resource hasn't been cached, create and cache it
    if (!(resource in resources)) {
      resources[resource] = $resource(
        'http://localhost:8888/' + resource + '/:id',
        { id: '@_id', userId: AuthService.user.id },
        {
          search: { method: 'POST', params: { id: 'search' }, isArray: true }
        }
      );
    }

    return resources[resource];
  };
}
