module.exports = cnSignIn;

cnSignIn.$inject = [];

function cnSignIn () {
  return {
    scope: {
      buttonId: '@',
      options: '&'
    },
    template: '<div></div>',
    link: function(scope, element, attrs) {
      // Add Google Platform JS to page
      var script = document.createElement('script');
      script.src = 'vendor/platform.js';

      script.onload = function () {
        // Render a google button
        var div = element.find('div')[0];
        div.id = attrs.buttonId;

        // First argument is an id, second options
        gapi.signin2.render(div.id, scope.options());
      };

      document.head.appendChild(script);
    }
  };
}
