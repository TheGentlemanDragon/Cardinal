module.exports = EditorController;

EditorController.$inject = ['$scope', '$state', '$mdDialog', '$mdToast', 'DataService'];

function EditorController ($scope, $state, $mdDialog, $mdToast, DataService) {
  var templateHash;

  $scope.go = $state.go;
  $scope.selectedFields = [];

  $scope.controls = [
    {
      state: 'editor.settings',
      label: 'Settings',
      icon: 'mdi-settings'
    },
    {
      state: 'editor.data',
      label: 'Data',
      icon: 'mdi-database-outline'
    },
    {
      state: 'editor.layout',
      label: 'Layout',
      icon: 'mdi-crop-portrait'
    },
    {
      state: 'editor.preview',
      label: 'Preview',
      icon: 'mdi-eye'
    }
  ];

  DataService('templates')
    .get({ id: $state.params.templateId })
    .$promise
    .then(function (temp) {
      $scope.template = temp;
      temp.fields.forEach(function () {
        $scope.selectedFields.push(false);
      })
      $scope.deckId = temp.deckId;
      templateHash = getTemplateHash(temp);
    });

  DataService('cards')
    .search({ templateId: $state.params.templateId })
    .$promise
    .then(function (cards) {
      $scope.cards = cards;
    });

  $scope.$on('$stateChangeSuccess', function updatePage() {
    $scope.state = $state.current.name;
  });

  function getTemplateHash (obj) {
    return obj.name + '|'
      + obj.fields
        .reduce(function (prev, item) {
          return prev + item.name + '|' + item.type + '|';
        }, '');
  };

  $scope.fieldsSelected = function () {
    return $scope.selectedFields.some(function (item) { return item; });
  };

  $scope.addField = function () {
    $scope.template.fields.push({ name: 'Field Name', type: 'text' });
    $scope.template.$save();
  };

  $scope.deleteField = function (index) {
    $scope.template.fields.splice(index, 1);
    $scope.template.$save();
  }

  $scope.moveFieldUp = function (index) {
    if (index <= 0) {
      return;
    }

    var temp = $scope.template.fields[index - 1];
    $scope.template.fields[index - 1] = $scope.template.fields[index];
    $scope.template.fields[index] = temp;
    $scope.template.$save();
  }

  $scope.moveFieldDown = function (index) {
    if (index - 1 >= $scope.template.fields.length) {
      return;
    }

    var temp = $scope.template.fields[index + 1];
    $scope.template.fields[index + 1] = $scope.template.fields[index];
    $scope.template.fields[index] = temp;
    $scope.template.$save();
  }

  $scope.saveTemplate = function () {
    var newHash = getTemplateHash($scope.template);

    if (templateHash !== newHash) {
      templateHash = newHash;
      $scope.template.$save();
    }
  };
}
