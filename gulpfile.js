/**
 * Created by tomi on 10/04/16.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var useref = require('gulp-useref');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('gulp-run-sequence');
var connect = require('gulp-connect');
var template = require('gulp-template-html');

var paths = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
};

gulp.task('sass', function () {
    return gulp.src(['./src/sass/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('move-images', function() {
    return gulp.src(['src/images/*'])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('move-misc', function() {
    return gulp.src(['src/manifest.json'])
        .pipe(gulp.dest('dist'));
});

gulp.task('move-html', function() {
    return gulp.src(['src/*.html', 'src/templates/**/*.*'], {base: './src/'})
        .pipe(useref({searchPath: [paths.app]}))
        .pipe(gulp.dest('dist'));
});

gulp.task('move-icons', function() {
    return gulp.src(['src/icons/*'])
        .pipe(gulp.dest('dist/icons'));
});

//gulp.task('move-js', ['js'], function() {
//    return gulp.src(['/src/scripts'])
//        .pipe(gulp.dest('dist/scripts'));
//});

gulp.task('watch:sass', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('js', function() {
    gulp.src(['src/scripts/ng.js','src/scripts/**/*.js', '!src/scripts/app.js'])
        //.pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('src/scripts'))
});

//gulp.task('watch:js', ['js'], function () {
//    gulp.watch('src/angular/**/*js', ['js']);
//    gulp.watch('src/angular/*js', ['js']);
//});

gulp.task('move', ['move-images', 'move-misc', 'move-icons', 'move-html'],  function () {
});

gulp.task('build', ['sass', 'js'],  function () {
    runSequence('buildContentPages','move');
    connect.reload();
});

gulp.task('watch:all', ['build'], function () {
    gulp.watch('src/**/*.*', ['build']);
    gulp.watch('src/*.*', ['build']);
});

gulp.task('buildContentPages', function () {
    return gulp.src(['src/pages/*.html'], {base: './src/pages/'})
      .pipe(template('src/templates/template.html'))
      .pipe(gulp.dest('src/'));
});

gulp.task('serve', function() {
  runSequence('build');
  connect.server({
      root: 'dist/',
      port: 8080,
      livereload: true
  });
});
