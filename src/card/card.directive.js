module.exports = Card;

function Card () {
  const directive = {
    controller: require('./card.controller.js'),
    controllerAs: 'card',
    restrict: 'E',
    scope: {
      instance: '=',
      isEmpty: '='

    },
    templateUrl: './card/card.html'
  };

  return directive;
}
