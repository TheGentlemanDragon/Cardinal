module.exports = AuthService;

AuthService.$inject = [];

function AuthService () {
  var vm = this;
  vm.authenticate = authenticate;

  activate();

  function activate () {
    vm.user = JSON.parse(localStorage.getItem('user'));
    vm.isAuthenticated = !!vm.user;
  }

  function authenticate (profile) {
    vm.isAuthenticated = true;
    vm.user = {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl()
    };
    localStorage.setItem('user', JSON.stringify(vm.user));
  }

  return vm;
}
