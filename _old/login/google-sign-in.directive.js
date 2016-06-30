module.exports = GoogleSignIn;

GoogleSignIn.$inject = [];

function GoogleSignIn () {
  return {
    scope: {
      buttonId: '@',
      options: '&'
    },

    link: function(scope, element, attrs) {
      // Add Google Platform JS to page
      var script = document.createElement('script');
      script.src = 'vendor/platform.js';

      script.onload = function () {
        // Render a google button
        gapi.signin2.render('googleSignIn', scope.options());
      };

      document.head.appendChild(script);
    }
  };
}
