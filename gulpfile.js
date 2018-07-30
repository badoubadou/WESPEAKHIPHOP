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

var data = require('gulp-data');
fs = require('fs'),
path = require('path'),
merge = require('gulp-merge-json');

var gutil        = require('gulp-util');
var coffee       = require('gulp-coffee');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var del = require('del');

var config = {
    accessKeyId: "AKIAJUYRDM6H3KW3O5FQ",
    secretAccessKey: "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"
}

var gulp = require('gulp');
var s3 = require('gulp-s3-upload')(config);

var pugfile = ['assets/pug/*.pug'];
var stylfile = ['assets/style/**/*.styl', 'assets/module/**/*.styl'];
var jsfile = ['assets/coffee/module.coffee', 'assets/module/**/*.coffee', 'assets/coffee/base.coffee'];
var misc = ['assets/image/**'];
var dest = 'public/';
var toUpload = ['public/image/**', 'public/css/style.css', 'public/js/**'];

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
	return gulp.src('assets/style/style.styl')
		.pipe(stylus({
			use: nib(),
			compress: true
		}))
		.pipe(gulp.dest(dest+'css'))
		.pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('pug:data', function() {
    return gulp.src('assets/json/**/*.json')
        .pipe(merge({
            fileName: 'data.json',
            edit: (json, file) => {
                // Extract the filename and strip the extension
                var filename = path.basename(file.path),
                    primaryKey = filename.replace(path.extname(filename), '');

                // Set the filename as the primary key for our JSON data
                var data = {};
                data[primaryKey.toUpperCase()] = json;

                return data;
            }
        }))
        .pipe(gulp.dest('assets/temp'));
});

gulp.task('pug', ['pug:data'], function() {
    return gulp.src('assets/pug/index.pug')
        .pipe(data(function() {
            return JSON.parse(fs.readFileSync('assets/temp/data.json'))
        }))
        .pipe(pug({
            pretty: false,
            basedir: './'
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('misc', function () {
	gulp.src(misc)
	.pipe(gulp.dest(dest+'image/'));
});

gulp.task('default', ['misc'], function (cb) {
    runSequence(['pug', 'css', 'coffee', 'watch'], cb);
});

gulp.task('watch', function() {
	gulp.watch(misc, ['misc']);
	gulp.watch(jsfile, ['coffee']);
	gulp.watch(stylfile, ['css']);
	gulp.watch(['assets/pug/*.pug', 'assets/module/**/*.pug', 'assets/image/*.svg'], ['pug']);
});

gulp.task("upload", function() {
    gulp.src(toUpload)
        .pipe(s3({
            Bucket: 'wespeakhiphop-assets', //  Required
            ACL:    'public-read'       //  Needs to be user-defined
        }, {
            // S3 Constructor Options, ie:
            maxRetries: 5
        }))
    ;
});

