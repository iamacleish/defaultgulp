var gulp = require("gulp")
const { src, dest, watch} = require('gulp');
var sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");

var browserSync = require("browser-sync").create();

var index = {
  src: "./project/**/*.html",
  dest: "./build"
}

var styles = {
  src: "./project/sass/**/*.scss",
  dest: "./build/css"
}
// Define tasks after requiring dependencies
function style() {
  return (
               src(styles.src)
              .pipe(sourcemaps.init())
              .pipe(sass())
              .on("error", sass.logError)
              .pipe(postcss([autoprefixer(), cssnano()]))
              .pipe(sourcemaps.write())
              .pipe(gulp.dest(styles.dest))
              .pipe(browserSync.stream())
          );
}


function html() {
  return (
            src(index.src)
            .pipe(dest(index.dest))
            .pipe(browserSync.stream())
         );
}

function reload() {
    browserSync.reload();

}

function serve(){
    browserSync.init({
        notify: false,
        server: {
            baseDir: "build"
        },
        port:3000
    });
    style();
    html();
    watch(styles.src, style);
    watch(index.src, html);

}

exports.serve = serve;
exports.style = style;
exports.html = html;
