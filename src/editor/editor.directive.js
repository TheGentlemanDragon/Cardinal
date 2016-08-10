module.exports = Editor;

function Editor () {
  var directive = {
    controller: EditorController,
    controllerAs: 'editor',
    restrict: 'E',
    scope: false,
    templateUrl: './editor/editor.html'
  };

  return directive;
}

EditorController.$inject = [ ];

function EditorController () {
  const vm = this;
}
