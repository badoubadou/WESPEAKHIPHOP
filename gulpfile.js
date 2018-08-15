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
var replace = require('gulp-replace');

var tap = require('gulp-tap');

var data = require('gulp-data');
fs = require('fs'),
path = require('path'),
merge = require('gulp-merge-json');

var gutil        = require('gulp-util');
var coffee       = require('gulp-coffee');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var del = require('del');
var gutil = require('gulp-util');

var config = {
    accessKeyId: "AKIAJUYRDM6H3KW3O5FQ",
    secretAccessKey: "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"
}

var gulp = require('gulp');
var s3 = require('gulp-s3-upload')(config);

var pugfile = ['assets/pug/*.pug', '!assets/pug/layout.pug'];
var stylfile = ['assets/style/**/*.styl', 'assets/module/**/*.styl'];
var jsfile = ['assets/coffee/module.coffee', 'assets/module/**/*.coffee', 'assets/coffee/base.coffee'];
var misc = ['assets/image/**'];
var imageminussvg = ['assets/image/**', '!assets/image/*.svg'];
var dest = 'public/';
var toUpload = ['public/image/**', 'public/css/style.css', 'public/js/**', 'public/font/**'];

var watch_coffee = jsfile;
var src_coffee = jsfile;
var vendor = [
    'assets/coffee/vendor/jquery.min.js',
    'assets/coffee/vendor/TweenMax.min.js',
    'assets/coffee/vendor/Draggable.min.js',
    'assets/coffee/vendor/DrawSVGPlugin.min.js',
    'assets/coffee/vendor/ThrowPropsPlugin.min.js',
    'assets/coffee/vendor/modernizr-objectfit.js',
    'assets/coffee/vendor/howler.core.min.js',
    'public/js/base.js',
    // 'assets/coffee/vendor/wad.min.js'
];

gulp.task('makecoffee', function() {
    return gulp.src(src_coffee)
        .pipe(coffee())
        .pipe(concat('base.js'))
        .pipe(gulp.dest(dest+'js/'));
});

gulp.task('concatjs', function() {
    gulp.src(vendor)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(dest+'js/vendor/'));
});

gulp.task('clean:js', function () {
  return del([
    'public/js/**/*.js'
  ]);
});


gulp.task('clean:css', function () {
  return del([
    'public/css/*.css'
  ]);
});

// gulp.task('coffee', ['clean:js', 'makecoffee'], function (cb) {
//     runSequence([ 'concatjs', 'uploadjs'], cb);
// });

gulp.task('coffee', function(done) {
    runSequence('clean:js', 'makecoffee', function() {
        gutil.log('clean:js & makecoffee finished ');
        done();
        // runSequence([ 'concatjs', 'uploadjs']);
        runSequence('concatjs', function() {
            console.log('concatjs finished');
            runSequence(['uploadjs']);
        });
    });
});

gulp.task('stylus', function() {
    return gulp.src('assets/style/*.styl')
        .pipe(stylus({
            use: nib(),
            compress: false
        }))
        .pipe(gulp.dest(dest+'css'))
        .pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('css', ['stylus'], function (cb) {
    runSequence(['uploadcss'], cb);
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
    return gulp.src(pugfile)
        .pipe(data(function() {
            return JSON.parse(fs.readFileSync('assets/temp/data.json'))
        }))
        .pipe(pug({
            pretty: false,
            basedir: './'
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('misc', ['cleansvgclass'], function () {
    gulp.src(imageminussvg)
    .pipe(gulp.dest(dest+'image/'));
});

gulp.task('default', ['misc'], function (cb) {
    runSequence(['pug', 'css', 'coffee', 'watch'], cb);
});

gulp.task('watch', function() {
    gulp.watch(misc, ['misc']);
    gulp.watch(jsfile, ['coffee']);
    gulp.watch(stylfile, ['css']);
    gulp.watch(['assets/pug/*.pug', 'assets/module/**/*.pug', 'assets/image/*.svg', 'assets/json/*.json'], ['pug']);
    gulp.watch(['assets/image/*.svg'], ['cleansvgclass']);
    gulp.watch(['assets/image/**', 'public/image/**'], ['uploadimage']);
});

gulp.task("uploadcss", function() {
    gulp.src('public/css/style.css')
        .pipe(s3({
            Bucket: 'wespeakhiphop-assets', //  Required
            ACL:    'public-read'       //  Needs to be user-defined
        }, {
            // S3 Constructor Options, ie:
            maxRetries: 5
        }))
    ;
});

gulp.task('cleansvgclass', function() {
  return gulp.src(['assets/image/*.svg', '!assets/image/lign.svg'])
    .pipe(tap(function(file) {
      var fileName = path.basename(file.path, '.svg');
      var st0 = fileName+'-st0';
      var st1 = fileName+'-st1';
      var st2 = fileName+'-st2';
      var st3 = fileName+'-st3';
      var st4 = fileName+'-st4';
      var st5 = fileName+'-st5';
      var st6 = fileName+'-st6';
      var st7 = fileName+'-st7';
      var st8 = fileName+'-st8';
      var st9 = fileName+'-st9';
      gutil.log('file name :', gutil.colors.magenta(fileName));
      return gulp.src('assets/image/' + fileName+'.svg')
        .pipe(replace(/st0/g, st0))
        .pipe(replace(/st1/g, st1))
        .pipe(replace(/st2/g, st2))
        .pipe(replace(/st3/g, st3))
        .pipe(replace(/st4/g, st4))
        .pipe(replace(/st5/g, st5))
        .pipe(replace(/st6/g, st6))
        .pipe(replace(/st7/g, st7))
        .pipe(replace(/st8/g, st8))
        .pipe(replace(/st9/g, st9))
        .pipe(gulp.dest('public/image/'));
    }));
});

gulp.task("uploadjs", function() {
    gulp.src(['public/js/vendor/all.js'])
        .pipe(s3({
            Bucket: 'wespeakhiphop-assets', //  Required
            ACL:    'public-read'       //  Needs to be user-defined
        }, {
            // S3 Constructor Options, ie:
            maxRetries: 5
        }))
    ;
});


gulp.task("uploadimage", function() {
    gulp.src(['public/image/**/*'])
        .pipe(s3({
            Bucket: 'wespeakhiphop-assets', //  Required
            ACL:    'public-read'       //  Needs to be user-defined
        }, {
            // S3 Constructor Options, ie:
            maxRetries: 5
        }))
    ;
});


gulp.task("uploadcleansvg", function() {
    gulp.src('public/cleansvg/*')
        .pipe(s3({
            Bucket: 'wespeakhiphop-assets', //  Required
            ACL:    'public-read'       //  Needs to be user-defined
        }, {
            // S3 Constructor Options, ie:
            maxRetries: 5
        }))
    ;
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

