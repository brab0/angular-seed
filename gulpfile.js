const fs = require('fs');
const gulp = require('gulp');
const replace = require('gulp-replace');
const mainBowerFiles = require('main-bower-files');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const ngEmbedTemplates = require('gulp-angular-embed-templates');
const flatten = require('gulp-flatten');
const runSequence = require('run-sequence');

const config = require('./env');

gulp.task('default', function() {
   return runSequence('fonts',
      'imgs',
      'vendor-styles',
      'modules-styles',
      'vendor-scripts',
      'modules-scripts',
      'directives-scripts',
      'generate-index');
});

gulp.task('modules-styles', function() {
   return gulp.src('assets/css/**/*.css')
      .pipe(csso())
      .pipe(concat(config.modules.name + '.concat.js'))
      .pipe(rename(config.modules.name + '.min.css'))
      .pipe(gulp.dest(config.modules.dest));
});

gulp.task('modules-scripts', function() {
   return gulp.src(config.modules.src+'/*.js')
      .pipe(babel({
         presets: ['es2015']
      }))
      .pipe(ngEmbedTemplates({ basePath: './' }))
      .pipe(concat(config.modules.name + '.concat.js'))
      .pipe(rename(config.modules.name + '.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(config.modules.dest));
});

gulp.task('directives-scripts', function() {
   return gulp.src(config.directives.src + '/*.js')
      .pipe(babel({
         presets: ['es2015']
      }))
      .pipe(ngEmbedTemplates({ basePath: './' }))
      .pipe(replace(/<link?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/, function(s, link) {
         let embed = link.match(/([^"\.]+\.css)/)[0];
         return '<style>' + fs.readFileSync(embed, 'utf8') + '</style>';
      }))
      .pipe(replace(/\n/g, ''))
      .pipe(concat(config.directives.name+'.concat.js'))
      .pipe(rename(config.directives.name + '.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(config.directives.dest));
});

gulp.task("vendor-scripts", function() {
   return gulp.src(mainBowerFiles({
         filter: /(.*)\.js$/
      }, {
         base: config.vendor.src
      }))
      .pipe(babel({
         presets: ['es2015']
      }))
      .pipe(concat(config.vendor.name +'.concat.js'))
      .pipe(rename(config.vendor.name + '.min.js'))
      .pipe(gulp.dest(config.vendor.dest));
});

gulp.task('vendor-styles', function() {
   return gulp.src(config.vendor.src + '/*.min.css')
      .pipe(concat(config.vendor.name + '.concat.css'))
      .pipe(rename(config.vendor.name + '.min.css'))
      .pipe(gulp.dest(config.vendor.dest));
});

gulp.task('fonts', function () {
  return gulp.src('assets/bower_components/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(flatten())
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('imgs', function () {
  return gulp.src('assets/imgs/**/*')
    .pipe(flatten())
    .pipe(gulp.dest('dist/assets/imgs/'));
});

gulp.task("generate-index", function() {
   return gulp.src('./index.html')
      .pipe(
         inject(
            gulp.src(config.vendor.dest + config.vendor.name + '.min.css', {
               read: false
            }), {
               name: 'vendor-styles',
               transform: function (filepath, file, i, length) {
                  let newPath = filepath.split('/');
                  return '<link rel="stylesheet" type="text/css" href="' + config.vendor.name + '/' + newPath[newPath.length - 1] + '?v=' + config.vendor.version + '">';
               }
            }
         )
      )
      .pipe(
         inject(
            gulp.src(config.modules.dest + config.modules.name + '.min.css', {
               read: false
            }), {
               name: 'modules-styles',
               transform: function (filepath, file, i, length) {
                  let newPath = filepath.split('/');
                  return '<link rel="stylesheet" type="text/css" href="' + config.modules.name + '/' + newPath[newPath.length - 1] + '?v=' + config.modules.version + '">';
               }
            }
         )
      )
      .pipe(
         inject(
            gulp.src(config.vendor.dest + config.vendor.name + '.min.js', {
               read: false
            }), {
               name: 'vendor-scripts',
               transform: function (filepath, file, i, length) {
                  let newPath = filepath.split('/');
                  return '<script type="text/javascript" src="' + config.vendor.name + '/' + newPath[newPath.length - 1] + '?v=' + config.vendor.version + '"></script>';
               }
            }
         )
      )
      .pipe(
         inject(
            gulp.src(config.modules.dest + config.modules.name + '.min.js', {
               read: false
            }), {
               name: 'modules-scripts',
               transform: function (filepath, file, i, length) {
                  let newPath = filepath.split('/');
                  return '<script type="text/javascript" src="' + config.modules.name + '/' + newPath[newPath.length - 1]  + '?v=' + config.modules.version + '"></script>';
               }
            }
         )
      )
      .pipe(
         inject(
            gulp.src(config.directives.dest + config.directives.name + '.min.js', {
               read: false
            }), {
               name: 'directives-scripts',
               transform: function (filepath, file, i, length) {
                  let newPath = filepath.split('/');
                  return '<script type="text/javascript" src="' + config.directives.name + '/' + newPath[newPath.length - 1] + '?v=' + config.directives.version + '"></script>';
               }
            }
         )
      )
      .pipe(rename('index.html'))
      .pipe(gulp.dest('dist'));
   }
);
