module.exports = LoginController;

LoginController.$inject = ['$state', '$stateParams', 'AuthService'];

function LoginController ($state, $stateParams, AuthService) {
  var vm = this;

  vm.onSignIn = onSignIn;
  vm.signOut = signOut;

  function onSignIn (googleUser) {
    AuthService.authenticate(googleUser.getBasicProfile());
    var goTo = $stateParams.reroute.state;
    delete $stateParams.state;
    $state.go(goTo, $stateParams.reroute);
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      $state.go('login');
    });
  }

  // var localVar = {};
  //
  // vm.scopeFunction = localFuntion;
  // vm.scopeVar = [];
  //
  // activate()
  //
  // function activate() {
  //   if ($state.params.msg) {
  //     $mdToast.notify($state.params.msg);
  //   }
  // }

}
