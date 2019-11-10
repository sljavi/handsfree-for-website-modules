function getDefaultDistance($el) {
  return $el.height() * 0.9;
}

function getDuration(distance) {
  if (distance > 1000) {
    return 1000;
  }
  return distance;
}

function getAnimationConfig(op, distance) {
  return [{
    scrollTop: op + distance,
  }, {
    duration: getDuration(distance),
    easing: 'swing',
  }];
}

function down($el, distance) {
  const newDistance = distance || getDefaultDistance($el);
  $el.stop();
  $el.animate(...getAnimationConfig('+=', newDistance));
}

function up($el, distance) {
  const newDistance = distance || getDefaultDistance($el);
  $el.stop();
  $el.animate(...getAnimationConfig('-=', newDistance));
}

function bottom($el, distance) {
  $el.stop();
  $el.animate({
    scrollTop: distance,
  }, {
    duration: 'fast',
    easing: 'swing',
  });
}

function top($el) {
  $el.stop();
  $el.animate({
    scrollTop: 0,
  }, {
    duration: 'fast',
    easing: 'swing',
  });
}

export default {
  up,
  down,
  bottom,
  top,
};
