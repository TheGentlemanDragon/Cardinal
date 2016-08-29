module.exports = Editor;

function Editor () {
  var directive = {
    controller:  require('./editor.controller.js'),
    controllerAs: 'editor',
    restrict: 'E',
    scope: {
      template: '=',
      scale: '='
    },
    templateUrl: './editor/editor.html'
  };

  return directive;
}
