const gulp = require("gulp");

const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev");
// import rev from "gulp-rev";

gulp.task("css", (done) => {
  console.log("minifying css ..");
  gulp
    .src("./assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets.css"));

  gulp
    .src("./assets/**/*.css")
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
    done();
});

// todo: gulp task for js, images, cleanassets, build
