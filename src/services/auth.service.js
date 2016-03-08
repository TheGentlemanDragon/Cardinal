module.exports = AuthService;

AuthService.$inject = [];

function AuthService () {
  this.isAuthenticated = false;
  this.user = null;
}
