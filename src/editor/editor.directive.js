module.exports = Editor;

function Editor () {
  var directive = {
    controller:  require('./editor.controller.js'),
    controllerAs: 'editor',
    restrict: 'E',
    scope: {
      element: '=',
      scale: '=',
      template: '='
    },
    templateUrl: './editor/editor.html'
  };

  return directive;
}
