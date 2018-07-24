var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var wrap   = require('gulp-wrap');
var nib    = require('nib');
var stylus = require('gulp-stylus');
var pug    = require('gulp-pug');

gulp.task('javascript', function() {
	return gulp.src('assets/javascript/*.js')
		.pipe(wrap('(function($, window){<%= contents %>}(jQuery, window));'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('public/javascripts'))
		.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('css', function() {
	return gulp.src('assets/style/*.styl')
		.pipe(stylus({
			use: nib(),
			compress: true
		}))
		.pipe(gulp.dest('public/stylesheets'))
		.pipe(notify({ message: 'CSS task complete' }));
});
 
gulp.task('pug', function buildHTML() {
	return gulp.src('assets/pug/*.pug')
		.pipe(pug({
		// Your options in here.
		}))
		.pipe(gulp.dest('public/'))
});

gulp.task('default', function() {
  	gulp.start('javascript');
  	gulp.start('pug');
	gulp.start('css');
	gulp.start('watch');
});

gulp.task('watch', function() {
	gulp.watch('assets/javascript/*.js', ['javascript']);
	gulp.watch('assets/style/*.styl', ['css']);
	gulp.watch('assets/pug/*.pug', ['pug']);
});