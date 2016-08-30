module.exports = TemplateService;

TemplateService.$inject = [ 'DataService' ];

function TemplateService (DataService) {
  var vm = this;

  vm.get = get;

  function get(id) {
    return DataService('templates')
      .search({ _id: id})
      .$promise;
  }

  return vm;
}
