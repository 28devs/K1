const {
  dest, lastRun, parallel, series, src, task, watch
} = require('gulp');

const args        = require('yargs').argv;
const babel       = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cache       = require('gulp-cache');
const cached      = require('gulp-cached');
const concat      = require('gulp-concat');
const cssbeautify = require('gulp-cssbeautify');
const cssnano     = require('gulp-cssnano');
const del         = require('del');
const eslint      = require('gulp-eslint');
const gulpif      = require('gulp-if');
const imagemin    = require('gulp-imagemin');
const mergeStream = require('merge-stream');
const notify      = require('gulp-notify');
const postcss     = require('gulp-postcss');
const pug         = require('gulp-pug');
const pump        = require('pump');
const rename      = require('gulp-rename');
const rev         = require('gulp-rev-append');
const sugarss     = require('sugarss');
const terser      = require('gulp-terser');
const yaml        = require('yamljs');

const config = yaml.load('config.yml');

const processors = Object.keys(config.processors).map(key => {
  return config.processors[key] === null
    ? require(key)
    : require(key)(config.processors[key]);
});

task('clean', () => {
  return del('public');
});

task('eslint', (cb) => {
  pump([
    src(config.src.js),
    eslint(),
    eslint.format(),
    eslint.failAfterError(),
  ], cb);
});

task('fonts', (cb) => {
  pump([
    src(config.src.fonts, {
      since: lastRun('fonts'),
    }),
    cached('fonts'),
    dest(config.dest.fonts),
  ], cb);
});

task('hash', (cb) => {
  pump([
    src(config.src.html),
    rev(),
    dest(config.dest.html),
  ], cb);
});

task('images', (cb) => {
  pump([
    src(config.watch.images, {
      since: lastRun('images'),
    }),
    cache(imagemin([
      imagemin.gifsicle(),
      imagemin.jpegtran(),
      imagemin.optipng(),
      imagemin.svgo(),
    ])),
    dest(config.dest.images),
  ], cb);
});

task('postcss', (cb) => {
  pump([
    src(config.src.css),
    postcss(processors, {
      parser: sugarss,
    }).on('error', notify.onError()),
    cssbeautify({
      autosemicolon: true,
      indent: '  ',
    }),
    gulpif(args.production, cssnano({
      minifyFontValues: false,
      discardComments: {removeAll: true},
      zindex: false,
    })),
    rename({
      extname: '.css',
    }),
    dest(config.dest.css),
    browserSync.stream(),
  ], cb);
});

task('scripts', (cb) => {
  var streams = mergeStream();
  for(var key in config.scripts) {
    if(!config.scripts.hasOwnProperty(key))continue;
    streams.add(src(config.scripts[key]).pipe(concat(key)));
  }
  pump([
    streams,
    babel({
      presets: ['@babel/env'],
      sourceType: 'unambiguous',
    }),
    gulpif(args.production, terser()),
    dest(config.dest.js),
    browserSync.stream(),
  ], cb);
});

task('shared', (cb) => {
  pump([
    src(config.src.shared, {
      since: lastRun('shared'),
    }),
    cached('shared'),
    dest(config.dest.shared),
  ], cb);
});

task('styles', (cb) => {
  var streams = mergeStream();
  for(var key in config.styles) {
    if(!config.styles.hasOwnProperty(key))continue;
    streams.add(src(config.styles[key]).pipe(concat(key)));
  }
  pump([
    streams,
    gulpif(args.production, cssnano({
      minifyFontValues: false,
      discardComments: {removeAll: true},
      zindex: false,
    })),
    dest(config.dest.css),
    browserSync.stream(),
  ], cb);
});

task('views', (cb) => {
  pump([
    src(config.src.views),
    pug({
      pretty: true,
    }),
    dest(config.dest.views),
    browserSync.stream(),
  ], cb);
});

task('watch', () => {
  browserSync.init({
    notify: config.browsersync.notify,
    server: config.browsersync.server,
    // proxy: config.browsersync.proxy,
  });
  watch(config.watch.css, parallel('postcss'));
  watch(config.watch.fonts, parallel('fonts'));
  watch(config.watch.images, parallel('images'));
  watch(config.watch.js, parallel('eslint', 'scripts'));
  watch(config.watch.public).on('change', browserSync.reload);
  watch(config.watch.views, parallel('views'));
});

task('default', series(parallel('eslint', 'fonts', 'images', 'postcss', 'scripts', 'shared', 'styles', 'views'), 'hash'));
task('build', series('clean', 'default'));
task('dev', series('build', 'watch'));
