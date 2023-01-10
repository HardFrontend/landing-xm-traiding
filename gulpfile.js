const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const scss = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();
const concat = require('gulp-concat');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

// Styles

const styles = () => {
  return gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(scss(
      {"bundleExec": true}
    ))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(rename("style.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const stylesmin = () => {
  return gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(scss())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.stylesmin = stylesmin;

// HTML

const html = () => {
  return gulp.src("src/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
}

// Scripts

const scripts = () => {
  return gulp.src(['src/js/*.js', 'src/js/blocks/*.js', 'src/js/helpers/*.js'])
    .pipe(rollup({plugins: [babel(), resolve(), commonjs()]}, 'umd'))
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('build/js/'));
}

exports.scripts = scripts;

// Images

const images = () => {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

// WebP

const createWebp = () => {
  return gulp.src("src/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("src/img/icons/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp.src([
    "src/fonts/*.{woff2,woff}",
    "src/*.ico",
    "src/img/**/*.{jpg,png,svg}",
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("src/scss/**/*.scss", gulp.series(styles));
  gulp.watch("src/scss/**/*.scss", gulp.series(stylesmin));
  gulp.watch("src/js/**/*.js", gulp.series(scripts));
  gulp.watch("src/*.html", gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    stylesmin,
    html,
    scripts,
    sprite,
    copy,
    images,
    createWebp
  ));

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    stylesmin,
    html,
    scripts,
    sprite,
    copy,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
