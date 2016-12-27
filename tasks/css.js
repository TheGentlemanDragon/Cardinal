var stylus = require('stylus');

stylus.render(str, { filename: 'app.css' }, function (err, css) {
  if (err) throw err;
  console.log(css);
});
