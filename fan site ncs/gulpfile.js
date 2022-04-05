const {src, dest, series} = require('gulp');
// const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const sync = require('browser-sync').create();

function html() {
    return src('app/**.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}

function css() {
    return src('app/css/**.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(dest('dist/css'))
}

function js() {
    return src('app/js/**.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest('dist/js'))
}

function serve() {
    sync.init({
        server: './app'
    })
}

exports.build = series(html, css, js)
exports.serve = series(html, css, js, serve);