const { src, dest, watch } = require("gulp")

// HTML
const pug = require("gulp-pug")
function html() {
  return src("./src/pug/*.pug")
    .pipe(pug({pretty: true,}))
    .pipe(dest("./public/compiled/"))
}
exports.html = html

// CSS
const sass = require("gulp-sass")(require("sass"))
function css() {
    return src("./src/scss/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(dest("./public/compiled/"))
}
exports.css = css

// JS
const concat = require("gulp-concat")
function js() {
  return src("./src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(dest("./public/compiled/"))
}
exports.js = js

exports.watch = function () {
    watch("./src/scss/*.scss", css)
    watch("./src/pug/**/*.pug", html)
    watch("./src/js/*.js", js)
}