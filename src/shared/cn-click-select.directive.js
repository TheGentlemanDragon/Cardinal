module.exports = cnClickSelect;

function cnClickSelect () {
  const directive = {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs) {
    element.bind('click', clickSelect);
  }

  function clickSelect(event) {
    event.target.select();
  }

  return directive;
}
