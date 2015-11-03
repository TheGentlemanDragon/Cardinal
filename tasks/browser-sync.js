'use strict';

var bs = require('browser-sync').create();
var fs = require('fs');
var stylus = require('stylus');

function restyle (event, file) {
    var str = fs.readFileSync(file, 'utf8');
    stylus(str).render((err, css) => {
        var newFile = file.replace('.styl', '.css');
        fs.writeFileSync(newFile, css);
        bs.reload(newFile);
    });
}

bs.watch(['./src/**/*.html', './src/**/*.js'], bs.reload);
bs.watch('./src/**/*.styl', restyle);

bs.init({
    server: './src',
    socket: {
        namespace: '/browser-sync'
    }
});
