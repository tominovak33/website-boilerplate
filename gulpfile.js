/**
 * Created by tomi on 10/04/16.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('gulp-run-sequence');
var connect = require('gulp-connect');

var paths = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
};

gulp.task('sass', function () {
    return gulp.src(['./app/sass/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('move-images', function() {
    return gulp.src(['app/images/*'])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('move-misc', function() {
    return gulp.src(['app/manifest.json'])
        .pipe(gulp.dest('dist'));
});

gulp.task('move-html', function() {
    return gulp.src(['app/*.html', 'app/templates/*.html'], {base: './app/'})
        .pipe(useref({searchPath: [paths.app]}))
        .pipe(gulp.dest('dist'));
});

gulp.task('move-icons', function() {
    return gulp.src(['app/icons/*'])
        .pipe(gulp.dest('dist/icons'));
});

//gulp.task('move-js', ['js'], function() {
//    return gulp.src(['/app/scripts'])
//        .pipe(gulp.dest('dist/scripts'));
//});

gulp.task('watch:sass', function () {
    gulp.watch('./app/sass/**/*.scss', ['sass']);
});

gulp.task('js', function() {
    gulp.src(['app/scripts/ng.js','app/scripts/**/*.js', '!app/scripts/app.js'])
        //.pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('app/scripts'))
});

//gulp.task('watch:js', ['js'], function () {
//    gulp.watch('src/angular/**/*js', ['js']);
//    gulp.watch('src/angular/*js', ['js']);
//});

gulp.task('move', ['move-images', 'move-misc', 'move-icons', 'move-html'],  function () {
});

gulp.task('build', ['sass', 'js'],  function () {
    runSequence('move');
    connect.reload();
});

gulp.task('watch:all', ['build'], function () {
    gulp.watch('app/**/*.*', ['build']);
    gulp.watch('app/*.*', ['build']);
});

gulp.task('serve', function() {
    connect.server({
        root: 'dist/',
        port: 8080,
        livereload: true
    });
});

gulp.task('live', ['serve', 'watch:all']);
