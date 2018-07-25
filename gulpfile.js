var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var wrap   = require('gulp-wrap');
var nib    = require('nib');
var stylus = require('gulp-stylus');
var pug    = require('gulp-pug');
var runSequence = require('run-sequence');

var gutil        = require('gulp-util');
var coffee       = require('gulp-coffee');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var del = require('del');

var pugfile = ['assets/pug/*.pug'];
var stylfile = ['assets/style/style.styl'];
var jsfile = ['assets/coffee/module.coffee', 'assets/module/**/*.coffee', 'assets/coffee/base.coffee'];
var misk = ['assets/image'];
var dest = 'public/';

var watch_coffee = jsfile;
var src_coffee = jsfile;
var vendor = [
	'assets/coffee/vendor/jquery.min.js',
	'assets/coffee/vendor/modernizr-objectfit.js'
];

gulp.task('makecoffee', function() {
	gulp.src(src_coffee)
		.pipe(coffee())
		.pipe(concat('base.js'))
		.pipe(gulp.dest(dest+'js/'));
});

gulp.task('concatjs', function() {
    gulp.src(vendor)
	    .pipe(concat('vendor.js'))
	    .pipe(gulp.dest(dest+'js/vendor/'));
});

gulp.task('clean:js', function () {
  return del([
    'public/js/**/*.js'
  ]);
});

gulp.task('coffee', ['clean:js'], function (cb) {
    runSequence(['makecoffee', 'concatjs'], cb);
});

gulp.task('css', function() {
	return gulp.src(stylfile)
		.pipe(stylus({
			use: nib(),
			compress: true
		}))
		.pipe(gulp.dest(dest+'css'))
		.pipe(notify({ message: 'CSS task complete' }));
});
 
gulp.task('pug', function buildHTML() {
	return gulp.src(pugfile)
		.pipe(pug({
		// Your options in here.
		}))
		.pipe(gulp.dest(dest))
});

gulp.task('misc', function () {
	gulp.src(misk)
	.pipe(gulp.dest(dest));
});


gulp.task('default', ['misc'], function (cb) {
    runSequence(['pug', 'css', 'coffee', 'watch'], cb);
});

// gulp.task('default', function() {
//   	gulp.start('javascript');
//   	gulp.start('pug');
// 	gulp.start('css');
// 	gulp.start('watch');
// });

gulp.task('watch', function() {
	gulp.watch(jsfile, ['coffee']);
	gulp.watch(stylfile, ['css']);
	gulp.watch(pugfile, ['pug']);
});