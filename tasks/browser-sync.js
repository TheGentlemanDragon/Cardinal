'use strict';

const bs = require('browser-sync').create(),
      fs = require('fs'),
      stylus = require('stylus'),
      styleMap = {};

function rewriteUrl (req, res, next) {
  let fileName = require('url').parse(req.url);
  fileName = fileName.href.split(fileName.search).join('');

  // If not loading an asset file, load index so Angular HTML5 mode works
  if (!fileName.includes('.')) {
    req.url = '/index.html';
  }

  return next();
}

function writeToStyleMap (file, callback) {
  return (err, data) => {
    styleMap[file.replace('./', '')] = data;
    callback && callback();
  };
}

function buildStyleMap (err, files) {
  const spawn = require('child_process').spawn,
        find = spawn('find', ['./src', '-name', '*.styl']);
  find.stdout.setEncoding('utf8');
  find.stdout.on('data', files => {
    files
      .trim()
      .split('\n')
      .forEach(
        file => fs.readFile(file, 'utf8', writeToStyleMap(file))
      );
  });
}

function restyle (event, file) {
  function renderStyles () {
    const styleStr = Object.keys(styleMap)
      .reduce((prev, style) => prev + styleMap[style] + '\n', '');

    stylus(styleStr).render((err, css) => {
      var newFile = 'src/app.css';
      fs.writeFileSync(newFile, css);
      bs.reload(newFile);
    });
  }

  fs.readFile(file, 'utf8', writeToStyleMap(file, renderStyles));
}

buildStyleMap();

bs.watch(['./src/**/*.html', './src/**/*.js'], bs.reload);
bs.watch('./src/**/*.styl', restyle);

bs.init({
  server: './src',
  middleware: rewriteUrl,
  socket: {
    namespace: '/browser-sync'
  }
});
