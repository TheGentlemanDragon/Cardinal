module.exports = HoverScroll;

function HoverScroll () {
  const directive = {
    link: link,
    restrict: 'A'
  };
  const offset = 162;
  const offset2 = offset * 2
  let animating = false;
  let prevScroll;

  function link(scope, element, attrs) {
    element.parent().bind('mousemove', scrollTo);
  }

  function scrollTo(event) {
    if (animating) {
      return;
    }
    const el = event.currentTarget.getElementsByClassName('list')[0];
    const transformedX = (event.clientX - offset) / (1 - offset2 / el.clientWidth);
    const target = Math.max(0, Math.floor(transformedX * (el.scrollWidth / el.clientWidth - 1)));
    const dist = Math.abs(el.scrollLeft - target);
    const dir = (el.scrollLeft < target ? 1 : -1);
    let step;

    if (dist <= 5) {
      el.scrollLeft = target;
    } else {
      animating = true;
      step = Math.max(1, dist / (0.2 * 60));
      window.requestAnimationFrame(scrollToTarget);
    }

    function scrollToTarget() {
      el.scrollLeft += dir * Math.min(step, Math.abs(el.scrollLeft - target));

      if (el.scrollLeft !== target && el.scrollLeft !== prevScroll) {
        // Prevent infinite loop
        prevScroll = el.scrollLeft;
        window.requestAnimationFrame(scrollToTarget);
      } else {
        animating = false;
      }
    }
  }

  return directive;
}
