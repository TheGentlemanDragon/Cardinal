module.exports = LoginController;

LoginController.$inject = ['$state'];

function LoginController ($state) {
  var vm = this;

  vm.onSignIn = onSignIn;
  vm.signOut = signOut;

  function onSignIn (googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
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
