var gulp   = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var wrap   = require('gulp-wrap');
var nib    = require('nib');
var stylus = require('gulp-stylus');
var sass = require('gulp-sass');
var pug    = require('gulp-pug');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');

var cleanCSS = require('gulp-clean-css');

var tap = require('gulp-tap');

var data = require('gulp-data');
fs = require('fs'),
path = require('path'),
merge = require('gulp-merge-json');

var gutil        = require('gulp-util');
var coffee       = require('gulp-coffee');
var del = require('del');
var gutil = require('gulp-util');

var rename = require("gulp-rename");
var uglify = require('gulp-uglify-es').default;

var gzip = require("gulp-gzip");

var config = {
    accessKeyId: "AKIAJUYRDM6H3KW3O5FQ",
    secretAccessKey: "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"
}

var s3 = require('gulp-s3-upload')(config);

const stripDebug = require('gulp-strip-debug');

const htmlmin = require('gulp-htmlmin');
var ext_replace = require('gulp-ext-replace');

var pugfile = ['assets/pug/*.pug', '!assets/pug/layout.pug'];
var stylfile = ['assets/style/**/*.styl', 'assets/module/**/*.styl'];
var cssfile = ['assets/vendor/*.css', 'public/css/style.css'];
var cssinlignfile = ['assets/style/base/*.styl', 'assets/style/first/*.styl', 'assets/module/block_popin/*.styl', 'assets/module/block_spiner/*.styl'];
var jsfile = ['assets/coffee/module.coffee', 'assets/module/**/*.coffee', 'assets/coffee/base.coffee'];
var misc = ['assets/image/**'];
var imageminussvg = ['assets/image/**', '!assets/image/*.svg'];
var dest = 'public/';
var toUpload = ['public/image/**', 'public/css/style.css', 'public/js/**', 'public/font/**'];

var watch_coffee = jsfile;
var src_coffee = jsfile;
var vendor = [
    'assets/coffee/vendor/jquery-3.3.1.min.js',
    'assets/coffee/vendor/TweenMax.min.js',
    'assets/coffee/vendor/Draggable.min.js',
    'assets/coffee/vendor/DrawSVGPlugin.min.js',
    'assets/coffee/vendor/MorphSVGPlugin.min.js',
    'assets/coffee/vendor/ThrowPropsPlugin.min.js',
    'assets/coffee/vendor/howler.core.min.js',
    'assets/coffee/vendor/vimeo.js',
    'public/js/myscript/base.min.js',
    // 'assets/coffee/vendor/wad.min.js'
];

var inlinesource = require('gulp-inline-source');

gulp.task('makecoffee', function() {
    return gulp.src(src_coffee)
        .pipe(coffee())
        .pipe(concat('base.js'))
        .pipe(gulp.dest(dest+'js/myscript/'));
});

gulp.task('uglifymyjs', function () {
    return gulp.src('public/js/myscript/base.js')
        .pipe(stripDebug())
        .pipe(rename('base.min.js'))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest(dest+'js/myscript/'));
});

gulp.task('concatalljs', function() {
    return gulp.src(vendor)
        .pipe(concat('script-v7.min.js'))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest(dest+'js/'));
});

gulp.task('clean:js', function () {
  return del([
    'public/js/**/*.js'
  ]);
});

gulp.task('gzipjs', function() {
    return gulp.src('public/js/script-v7.min.js')
    .pipe(gzip({append: false}))
    .pipe(gulp.dest('public/js/comp/'));
});

gulp.task('uploadjs', function() {
    gulp.src(['public/js/comp/script-v7.min.js'])
        .pipe(s3({
            Bucket: 'wespeakhiphop-assets', //  Required
            ACL:    'public-read',       //  Needs to be user-defined
            manualContentEncoding: 'gzip'
        }, {
            // S3 Constructor Options, ie:
            maxRetries: 5
        }))
    ;
});

gulp.task('coffee', function(done) {
    gutil.log('update coffee');
    done();
    runSequence('clean:js', 'makecoffee', 'uglifymyjs','concatalljs', 'gzipjs', 'uploadjs', function() {
        gutil.log('clean:js, makecoffee, uglifymyjs, concatalljs & gzipjs finished ');
    });
});

/*------------------ CSS ----------------*/
gulp.task('minifyinlinecss', function () {
    return gulp.src('public/css/inlinestyle.css')
        .pipe(rename('inlinestyle.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css/'))
        .pipe(notify({ message: 'minifycss  complete' }));
});

gulp.task('minifycss', function () {
    return gulp.src('public/css/all.css')
        .pipe(rename('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css/'))
        .pipe(notify({ message: 'minifycss  complete' }));
});

gulp.task('minifyinlinecss', function () {
    return gulp.src('public/css/inlinestyle.css')
        .pipe(rename('inlinestyle.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css/'))
        .pipe(notify({ message: 'minifycss  complete' }));
});

gulp.task('concatcss', function() {
    return gulp.src(cssfile)
        .pipe(concat('all.css'))
        .pipe(gulp.dest(dest+'css/'))
        .pipe(notify({ message: 'concatcss  complete' }));
});

gulp.task('clean:css', function () {
  return del([
    'public/css/*',
    'public/css/comp/*'
  ]);
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

/******** GZIP CSS *******/
gulp.task('gzipcss', function() {
    return gulp.src('public/css/*.css')
    .pipe(gzip({append: false}))
    .pipe(gulp.dest('public/css/comp/'));
});

gulp.task('css', function (done) {
    gutil.log('start css ');
    done();
    runSequence(['clean:css', 'stylus'], function() {
        console.log('clean:css & stylus finished');
        runSequence('concatcss','minifycss','gzipcss', 'uploadcsscomp' );
    });
});

gulp.task('inlinesource', function () {
    return gulp.src('public/*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('public/'));
});

gulp.task('cssinline', function (done) {
    gutil.log('start css inline');
    done();
    runSequence(['clean:css', 'stylus'], function() {
        runSequence('concatcss', 'inlinesource', 'pug' );
    });
});

gulp.task('uploadcsscomp', function() {
    gulp.src('public/css/comp/*.css')
    .pipe(s3({
        Bucket: 'wespeakhiphop-assets',
        ACL: 'public-read',
        manualContentEncoding: 'gzip',
        uploadNewFilesOnly: false,
        Metadata: {
           'Cache-Control': 'max-age=31536000, no-transform, public',
        }
    }));
});
/*------------------------ PUG ----------------------------*/
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

gulp.task('complilpug', function() {
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

gulp.task('minify', () => {
  return gulp.src('public/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public/'));
});


gulp.task('changesitemapext', function() {
  return gulp.src(['public/sitemap.html', 'public/sitemap-en.html'])
      .pipe(ext_replace('.xml'))
      .pipe(gulp.dest('public/'))
      del(['public/sitemap.html', 'public/sitemap-en.html']);
});

gulp.task('pug', function() {
    gutil.log('update pug');
    runSequence('pug:data','complilpug','inlinesource','minify' , 'changesitemapext');
});

/*------------------------ MUSK ----------------------------*/
gulp.task('misc', ['cleansvgclass'], function () {
    gulp.src(imageminussvg)
    .pipe(gulp.dest(dest+'image/'));
});

gulp.task('default', ['misc'], function (cb) {
    runSequence([ 'css', 'pug', 'coffee', 'watch'], cb);
});

gulp.task('watch', function() {
    gulp.watch(misc, ['misc']);
    gulp.watch(jsfile, ['coffee']);
    gulp.watch(stylfile, ['css']);
    gulp.watch(['assets/pug/*.pug', 'assets/module/**/*.pug', 'assets/image/*.svg', 'assets/json/*.json'], ['pug']);
    gulp.watch(['assets/image/*.svg'], ['cleansvgclass']);
    gulp.watch(['assets/image/**', 'public/image/**']);
    // gulp.watch(['assets/image/**', 'public/image/**'], ['uploadimage']);
    gulp.watch(cssinlignfile, ['cssinline']);
});

gulp.task('cleansvgclass', function() {
  return gulp.src(['assets/image/*.svg', '!assets/image/logo-white.svg', '!assets/image/logo.svg', '!assets/image/logo-en.svg'])
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


var expires = new Date();
expires.setUTCFullYear(2020);

gulp.task("uploadimage", function() {
    gulp.src(['public/image/**/*'])
        .pipe(s3({
            Bucket: 'wespeakhiphop-assets', //  Required
            ACL:    'public-read'       //  Needs to be user-defined
            // Expires: expires
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
            // Expires: expires
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

gulp.task('gzipimg', function() {
    return gulp.src(['public/image/*', '!public/image/smallmap-en.svg', '!public/image/smallmap-fr.svg'])
    .pipe(gzip({append: false}))
    .pipe(gulp.dest('public/image/comp/'));
});

gulp.task('uploadimgcomp', function() {
    gulp.src('public/image/comp/*')
    .pipe(s3({
        Bucket: 'wespeakhiphop-assets',
        ACL: 'public-read',
        manualContentEncoding: 'gzip'
    }));
});
gulp.task('rename-comp-img', function() {
    return gulp.src('public/image/comp/*')
      .pipe(rename(function (path) {
        path.basename += "-comp";
      }))
  .pipe(gulp.dest('public/image/comp/rename/')); 
});