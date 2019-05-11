//Required Packages for Gulp environment setup
const { src, dest, series, parallel, watch } = require("gulp");
const imagemin = require("gulp-imagemin");
const imageminPngQuant = require("imagemin-pngquant");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const lineEnd = require("gulp-line-ending-corrector");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const del = require("del");

//HTML Path
const htmlSrc = "src/**/*.html";
const htmlDist = "dist/";
const htmlWatch = "dist/**/*.html";

//Fonts Path
const fontSrc = "src/fonts/*";
const fontDist = "dist/fonts/";
const fontWatch = "dist/fonts/**/*";

//Image Path
const imgSrc = "src/img/*";
const imgDist = "dist/img/";
const imgWatch = "dist/img/**/*";

//SASS Path
const sassSrc = "src/scss/style.scss";
const sassDist = "dist/css/";
const sassSrcWatch = "src/scss/**/*";
const sassWatch = "dist/css/**/*";

//JS Path
const jsSrc = "src/js/**/*.js";
const jsDist = "dist/js/";
const jsWatch = "dist/js/**/*";

//Vendor JS
const vendorJsSrc = [];

//HTML
function html() {
  return src(htmlSrc).pipe(dest(htmlDist));
}

//Fonts
function fonts() {
  return src(fontSrc).pipe(dest(fontDist));
}

//Images
function img() {
  return src(imgSrc)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        }),
        imageminPngQuant(),
        imageminJpegRecompress()
      ])
    )
    .pipe(dest(imgDist));
}

//SASS
function style() {
  return src(sassSrc, { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(lineEnd())
    .pipe(dest(sassDist, { sourcemaps: true }))
    .pipe(browserSync.stream());
}

//JS
function js() {
  return src(jsSrc, { sourcemaps: true })
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(lineEnd())
    .pipe(dest(jsDist, { sourcemaps: true }));
}

//Vendor JS
function vendorJs() {
  return src(vendorJsSrc, { sourcemaps: true })
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(concat("vendor.js"))
    .pipe(uglify())
    .pipe(lineEnd())
    .pipe(dest(jsDist, { sourcemaps: true }));
}

//Clean distribution Folder before watch
function clean(done) {
  del.sync(["./dist"]);
  done();
}

//Browser Sync Server
function serv() {
  return (
    browserSync.init({
      server: {
        baseDir: "./dist/"
      },
      notify: false
    }),
    watch(htmlSrc, html),
    watch(fontSrc, fonts),
    watch(imgSrc, img),
    watch(sassSrcWatch, style),
    watch(jsSrc, js),
    watch(vendorJsSrc, vendorJs),
    watch([htmlWatch, jsWatch, fontWatch, imgWatch, sassWatch]).on(
      "change",
      browserSync.reload
    )
  );
}

//Exports
exports.html = html;
exports.fonts = fonts;
exports.img = img;
exports.style = style;
exports.js = js;
exports.clean = clean;
exports.serv = serv;
//Exports Default
exports.default = series(clean, parallel(html, fonts, img, style, js), serv);
